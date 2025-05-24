from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse 
from pydantic import BaseModel
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM, WhisperProcessor, WhisperForConditionalGeneration
import torch
import tempfile
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You should restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load sentiment model
sentiment_model = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# Load chatbot model
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-small")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-small")
chatbot_model = pipeline("text-generation", model=model, tokenizer=tokenizer, max_new_tokens=100)

# Load Whisper for speech-to-text
asr_processor = WhisperProcessor.from_pretrained("openai/whisper-base")
asr_model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-base")

device = "cuda" if torch.cuda.is_available() else "cpu"
asr_model.to(device)

chat_history = []

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    user_input = request.message
    sentiment = sentiment_model(user_input)[0]
    full_context = " ".join([msg for pair in chat_history for msg in pair])
    prompt = full_context + " " + user_input
    response = chatbot_model(prompt)[0]['generated_text'].replace(prompt, '').strip()
    chat_history.append((user_input, response))
    return {
        "response": response,
        "sentiment": sentiment['label'],
        "confidence": sentiment['score']
    }

@app.post("/voice-chat")
async def voice_chat(file: UploadFile = File(...)):
    # Save temp audio file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    # Load audio and convert to input features
    import torchaudio
    speech_array, sampling_rate = torchaudio.load(tmp_path)
    input_features = asr_processor(speech_array[0], sampling_rate=sampling_rate, return_tensors="pt").input_features.to(device)

    # Generate transcription
    predicted_ids = asr_model.generate(input_features)
    transcription = asr_processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]

    # Continue with chatbot
    sentiment = sentiment_model(transcription)[0]
    full_context = " ".join([msg for pair in chat_history for msg in pair])
    prompt = full_context + " " + transcription
    response = chatbot_model(prompt)[0]['generated_text'].replace(prompt, '').strip()
    chat_history.append((transcription, response))

    # Clean up temp file
    os.remove(tmp_path)

    return {
        "transcription": transcription,
        "response": response,
        "sentiment": sentiment['label'],
        "confidence": sentiment['score']
    }

@app.get("/")
def root():
    return {"message": "Mental Health Chatbot Backend is running."}
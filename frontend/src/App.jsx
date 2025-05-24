import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    const userMessage = message;
    setMessage('');
    setChat([...chat, { type: 'user', text: userMessage }]);

    try {
      const response = await axios.post('http://localhost:8000/chat', { message: userMessage });
      const { response: botReply, sentiment, confidence } = response.data;

      setChat(prev => [
        ...prev,
        { type: 'bot', text: botReply },
        { type: 'sentiment', text: `Sentiment: ${sentiment} (${(confidence * 100).toFixed(1)}%)` }
      ]);
    } catch (err) {
      setChat(prev => [...prev, { type: 'bot', text: '⚠️ Error connecting to chatbot' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setMessage(voiceText);
      setListening(false);
    };

    recognition.onerror = () => {
      alert('Voice input failed. Try again.');
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">🧠 Mental Health Chatbot</h1>
        
        <div className="space-y-2 max-h-96 overflow-y-auto mb-4">
          {chat.map((msg, idx) => (
            <div key={idx} className={`p-3 rounded-lg ${
              msg.type === 'user' ? 'bg-blue-100 self-end text-right' :
              msg.type === 'bot' ? 'bg-green-100' : 'bg-yellow-100'
            } text-sm`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 p-2 rounded-xl focus:outline-none"
            placeholder="How are you feeling?"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 disabled:opacity-50"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? '...' : 'Send'}
          </button>
          <button
            className={`px-4 py-2 rounded-xl text-white ${listening ? 'bg-red-600' : 'bg-green-600'} hover:opacity-90`}
            onClick={handleVoiceInput}
            title="Use voice input"
          >
            🎤
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

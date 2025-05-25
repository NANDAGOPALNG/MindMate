# MindMate 

An emotionally intelligent chatbot that offers dynamic, responsive mental health support by combining sentiment analysis, natural language processing, and mental health models.

## Overview

MindMate has been developed to recognize and respond to user emotions with sophisticated natural language processing and sentiment analysis. Integrating state-of-the-art AI models with an easy-to-use interface, MindMate makes sense of conversations that adjust to user behavior patterns and sentiment.

## Features

✨ **Intelligent Sentiment Analysis** - Real-time emotion detection using DistilBERT  
🗣️ **Speech-to-Text Support** - Voice input capabilities with OpenAI Whisper  
💬 **Dynamic Conversations** - Context-aware responses using DialoGPT  
🎨 **Intuitive Interface** - Clean, responsive React.js frontend  
⚡ **High Performance** - FastAPI backend for optimal speed  
🔒 **Privacy-Focused** - User data protection and confidentiality  
📱 **Cross-Platform** - Works seamlessly across devices  

## Tech Stack

### Frontend
- **React.js** - Modern, component-based UI framework
- **Responsive Design** - Mobile-first approach for accessibility

### Backend
- **FastAPI** - High-performance Python web framework
- **RESTful APIs** - Clean, scalable API architecture

### AI & NLP Models
- **Sentiment Analysis**: `distilbert-base-uncased-finetuned-sst-2-english`
- **Text Generation**: `microsoft/DialoGPT-small`
- **Speech Recognition**: `openai/whisper-base`

### Infrastructure
- **Firebase** - Real-time database and authentication
- **GPT APIs** - Enhanced conversational capabilities
- **Cloud Deployment** - Scalable hosting solutions

## Installation

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- pip package manager

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/MindMate.git
cd MindMate

# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

## Usage

1. **Text Chat**: Send messages directly through the chat interface
2. **Voice Input**: Use the microphone icon to voice your thoughts
3. **Sentiment Tracking**: Track your emotional trends over time
4. **Personalized Responses**: Get personalized support based on your interactions

## Market Applications

### 🎓 Educational Institutions
- Campus well-being program integration
- Student mental health counseling
- Exam stress management

### 🚀 Startups & NGOs
- Affordable mental health access for underprivileged groups
- Inexpensive wellness solutions
- Community outreach programs

### 🏢 Corporate Wellness
- Employee wellbeing initiatives
- Workplace stress management
- Anonymous mental health assistance

### 🏥 Healthcare Integration
- Preventive mental health care
- Monitoring of patients between sessions
- Early intervention assistance

## Why MindMate?

**Scalable & Affordable** - Constructed with cost-effective technologies that scale up with your needs

**Privacy-Centric** - User confidentiality and data protection as core

**Lightweight Architecture** - Limited resource requirements for simple deployment

**Real-World Ready** - Configured for instant deployment in a range of environments

## Contributing

We welcome contributions to make MindMate even better! Please feel free to:

- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Hugging Face for providing pre-trained models
- OpenAI for Whisper speech recognition
- The open-source community for invaluable tools and libraries

## Contact

For questions, suggestions, or collaboration opportunities, please open an issue or reach out to the maintainers.

---

**MindMate** - Where technology meets empathy 💙

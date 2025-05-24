import React, { useState } from 'react';

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [listening, setListening] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const response = await fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    setChatLog([...chatLog, { user: input, bot: data.response, sentiment: data.sentiment }]);
    setInput('');
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setInput(voiceText);
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
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">🧠 Mental Health Chatbot</h1>
      
      <div className="space-y-2">
        {chatLog.map((entry, idx) => (
          <div key={idx} className="bg-gray-100 p-2 rounded">
            <p><strong>You:</strong> {entry.user}</p>
            <p><strong>Bot:</strong> {entry.bot}</p>
            <p className="text-sm text-gray-500">Sentiment: {entry.sentiment}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded"
          placeholder="Type or use mic..."
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        <button onClick={handleVoiceInput} className="bg-green-600 text-white px-4 py-2 rounded">
          {listening ? 'Listening...' : '🎤'}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import stationsData from '../../utils/Stations.json';
import { FaRobot, FaMicrophone, FaTimes } from 'react-icons/fa';
import { BsSendFill } from 'react-icons/bs';

const Bot = ({ setSource, setDestination, triggerSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [greeted, setGreeted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const API_URL = "http://localhost:8080";
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [botResponse, message]);

  // Toggle Bot open/close
  const handleBotClick = () => {
    setIsOpen(!isOpen);

    if (!isOpen && !greeted) {
      const greetText = "नमस्कार, Patna Metro में आपका स्वागत है। मैं बोधि हूँ। कृपया बताएं, आपको कहाँ से कहाँ जाना है?";
      speak(greetText);
      setBotResponse(greetText);
      setGreeted(true);
    }
  };

  // Handle Mic Input
  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    setIsListening(true);
    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setIsListening(false);
      const foundStations = findStationsInTranscript(transcript);
      processRouteRequest(foundStations);
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      showError("माइक से इनपुट लेने में समस्या हुई। कृपया दोबारा प्रयास करें।");
      setIsListening(false);
    };
  };

  // Find Stations from speech using aliases
  const findStationsInTranscript = (transcript) => {
    const found = [];
    stationsData.stations.forEach(station => {
      station.synonyms.forEach(synonym => {
        if (transcript.toLowerCase().includes(synonym.toLowerCase())) {
          found.push(station.name);
        }
      });
    });
    return [...new Set(found)]; // Remove duplicates
  };

  // Send stations to backend and trigger RouteFinder
  const processRouteRequest = async (matchedStations) => {
    if (matchedStations.length >= 2) {
      const [source, destination] = matchedStations;
      
      try {
        const res = await axios.post(`${API_URL}/api/bot/voice-route`, {
          source,
          destination
        });

        const data = res.data;
        setBotResponse(data.voiceResponse);
        speak(data.voiceResponse);

        setSource(source);
        setDestination(destination);
        navigate("/routefinder");

        setTimeout(() => {
          if (typeof triggerSearch === 'function') {
            triggerSearch();
          }
        }, 500);

      } catch (err) {
        console.error("API Error:", err);
        showError("माफ़ कीजिए, रूट निकालने में समस्या आ रही है।");
      }
    } else {
      showError("कृपया फिर से बताएं: 'पटना जंक्शन से पीएमसीएच जाना है'");
    }
  };

  // Speak Bot response
  const speak = (text) => {
    setIsSpeaking(true);
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "hi-IN";
    
    msg.onend = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(msg);
  };

  // Show error response
  const showError = (errorText) => {
    setBotResponse(errorText);
    speak(errorText);
  };

  // Handle text input submission
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const foundStations = findStationsInTranscript(message);
    processRouteRequest(foundStations);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Bot Button with pulse animation */}
      <button
        onClick={handleBotClick}
        className={`relative rounded-full p-4 shadow-xl ${isOpen ? 'bg-red-500' : 'bg-gradient-to-b from-blue-700 to-red-700'}`}
        style={{
          animation: isOpen ? 'none' : 'pulse 1.5s infinite'
        }}
      >
        {isOpen ? (
          <FaTimes className="text-white text-xl" />
        ) : (
          <FaRobot className="text-white text-xl" />
        )}
        {isSpeaking && (
          <div className="absolute -top-1 -right-1 flex space-x-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1 h-1 bg-white rounded-full"
                style={{
                  animation: `wave 1s infinite ${i * 0.2}s`,
                  height: isSpeaking ? '10px' : '4px'
                }}
              />
            ))}
          </div>
        )}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="mt-4 w-80 bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-700 to-red-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaRobot className="text-xl" />
                <h2 className="text-lg font-bold">Bodhi</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto p-4 bg-gray-50">
            {greeted && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Bodhi</div>
                <div className="bg-blue-100 text-gray-800 p-3 rounded-lg max-w-xs">
                  नमस्कार, Patna Metro में आपका स्वागत है। मैं बोधि हूँ।
                </div>
              </div>
            )}

            {message && (
              <div className="mb-4 flex justify-end">
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">आप</div>
                  <div className="bg-green-100 text-gray-800 p-3 rounded-lg max-w-xs">
                    {message}
                  </div>
                </div>
              </div>
            )}

            {botResponse && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Bodhi</div>
                <div className="bg-blue-100 text-gray-800 p-3 rounded-lg max-w-xs">
                  {botResponse}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleTextSubmit} className="p-3 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleMicClick}
                className={`p-3 rounded-full ${isListening ? 'bg-red-500' : 'bg-green-500'} text-white`}
                disabled={isListening}
              >
                <FaMicrophone className={isListening ? 'animate-pulse' : ''} />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="संदेश टाइप करें..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                disabled={!message.trim()}
              >
                <BsSendFill />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              या माइक बटन दबाकर बोलें
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Bot;
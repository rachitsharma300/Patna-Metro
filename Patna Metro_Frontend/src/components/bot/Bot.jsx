import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import stationsData from "../../utils/Stations.json";
import { FaMicrophone, FaTimes } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";

// स्टेशन synonyms की mapping
const stationAliases = new Map();
stationsData.stations.forEach((station) => {
  station.synonyms.forEach((synonym) => {
    stationAliases.set(synonym.toLowerCase(), station.name);
  });
});

const Bot = ({ setSource, setDestination, triggerSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [isBotAwake, setIsBotAwake] = useState(false);

  const API_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://patna-metro-backend-latest.onrender.com/api";

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetText =
        "नमस्कार, Patna Metro में आपका स्वागत है। मैं बोधि हूँ। Mic बटन दबाकर बोलें या नीचे लिखकर बताएँ, आपको कहाँ से कहाँ जाना है।";
      addBotMessage(greetText);
      speak(greetText);
    }
  }, [isOpen]);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowPopup(false);
      setIsBotAwake(true);
    }, 3000);

    let interval;
    if (isBotAwake && !isOpen) {
      interval = setInterval(() => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 1000);
      }, 2000);
    }

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isBotAwake, isOpen]);

  const handleBotClick = () => {
    setIsOpen(!isOpen);
    setShowPopup(false);
    setIsBotAwake(false);
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { type: "bot", text }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { type: "user", text }]);
  };

  const handleMicClick = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showError(
        "माफ़ कीजिए, आपका ब्राउज़र voice सपोर्ट नहीं करता। Brave browser इस्तेमाल करें या लिखकर बताएँ।"
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "hi-IN";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      addUserMessage(transcript);
      const foundStations = findStationsInTranscript(transcript);
      processRouteRequest(foundStations);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      showError(
        "आवाज़ समझने में समस्या हुई। आप चाहें तो लिखकर भी स्टेशन का नाम बता सकते हैं।"
      );
      setIsListening(false);
    };
  };

  const findStationsInTranscript = (transcript) => {
    let searchableTranscript = transcript.toLowerCase();
    const foundStations = [];
    const sortedAliases = new Map(
      [...stationAliases.entries()].sort((a, b) => b[0].length - a[0].length)
    );

    sortedAliases.forEach((stationName, synonym) => {
      const index = searchableTranscript.indexOf(synonym);
      if (index !== -1) {
        foundStations.push({ name: stationName, index: index });
        const placeholder = "#".repeat(synonym.length);
        searchableTranscript =
          searchableTranscript.substring(0, index) +
          placeholder +
          searchableTranscript.substring(index + synonym.length);
      }
    });

    foundStations.sort((a, b) => a.index - b.index);
    const uniqueStationNames = [...new Set(foundStations.map((s) => s.name))];
    return uniqueStationNames;
  };

  const processRouteRequest = async (matchedStations) => {
    if (matchedStations.length >= 2) {
      const [source, destination] = matchedStations;
      try {
        const res = await axios.post(`${API_URL}/bot/voice-route`, {
          source,
          destination,
        });

        const data = res.data;
        addBotMessage(data.voiceResponse);
        speak(data.voiceResponse);

        setSource(source);
        setDestination(destination);
        navigate("/routefinder");

        setTimeout(() => {
          if (typeof triggerSearch === "function") {
            triggerSearch();
          }
        }, 500);
      } catch (err) {
        showError("माफ़ कीजिए, रूट निकालने में समस्या आ रही है।");
      }
    } else if (matchedStations.length === 1) {
      const singleStationText =
        "आपको " + matchedStations[0] + " से कहाँ जाना है?";
      addBotMessage(singleStationText);
      speak(singleStationText);
    } else {
      showError(
        "कृपया फिर से बताइए: जैसे 'पटना जंक्शन से पीएमसीएच जाना है।'"
      );
    }
    setInputText("");
  };

  const speak = (text) => {
    setIsSpeaking(true);
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "hi-IN";
    msg.onend = () => {
      setIsSpeaking(false);
    };
    window.speechSynthesis.speak(msg);
  };

  const showError = (errorText) => {
    addBotMessage(errorText);
    speak(errorText);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    addUserMessage(inputText);
    const foundStations = findStationsInTranscript(inputText);
    processRouteRequest(foundStations);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {!isOpen && showPopup && (
          <div className="absolute bottom-6 sm:bottom-16 -left-[195px] bg-white text-yellow text-sm p-3 rounded-xl shadow-lg whitespace-nowrap animate-slide-in">
            नमस्ते! मैं बोधि वॉइस असिस्टेंट हूँ
          </div>
        )}
        <button
          onClick={handleBotClick}
          className={`relative rounded-full p-2 shadow-xl border-4 transition-all duration-300 ease-in-out
                          ${isOpen ? "bg-red-500 border-red-500" : "bg-transparent border-transparent"}
                          ${!isOpen ? "animate-vibrate" : ""}`}
          style={{
            animation: isOpen
              ? "none"
              : "callRing 2s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {isOpen ? (
            <FaTimes className="text-white text-xl" />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center p-1 rounded-full bg-gradient-to-br from-gray-600 to-white">
              <img
                src="/bodhi.png"
                alt="Patna Metro Bot"
                className="w-full h-full rounded-full"
              />
            </div>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="mt-4 w-80 h-[400px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-blue-700 to-red-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 p-1 bg-white rounded-full">
                <img
                  src="/bodhi.png"
                  alt="Patna Metro Bot"
                  className="w-full h-full rounded-full"
                />
              </div>
              <h2 className="text-lg font-bold">
                बोधि
                {isListening && (
                  <span className="relative flex h-3 w-3 inline-block ml-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
              </h2>
            </div>
            <button
              onClick={handleBotClick}
              className="p-2 text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-xl shadow-md ${
                    msg.type === "user"
                      ? "bg-green-100 text-gray-800 rounded-br-none"
                      : "bg-blue-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleTextSubmit}
            className="p-3 border-t border-gray-200 bg-white"
          >
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleMicClick}
                className={`p-3 rounded-full transition-colors duration-300 ease-in-out text-white
                          ${isListening ? "bg-red-500 animate-pulse-slow" : "bg-green-500"}`}
              >
                {isListening ? <FaTimes /> : <FaMicrophone />}
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="यहाँ लिखें..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                disabled={!inputText.trim()}
              >
                <BsSendFill />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Mic बटन दबाकर बोलें या लिखकर बताएँ
            </div>
          </form>
        </div>
      )}
      <style jsx>{`
        @keyframes callRing {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        @keyframes vibrate {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-1px);
          }
          50% {
            transform: translateX(1px);
          }
          75% {
            transform: translateX(-1px);
          }
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-vibrate {
          animation: vibrate 0.2s infinite;
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Bot;

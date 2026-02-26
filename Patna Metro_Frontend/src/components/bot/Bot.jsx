import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import stationMatcher from "../../utils/StationMatcher";
import { FaMicrophone, FaTimes, FaRobot, FaUser } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const Bot = ({ setSource, setDestination, triggerSearch }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [autoSuggestions, setAutoSuggestions] = useState([]);
  const [isBotAwake, setIsBotAwake] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const greetedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !greetedRef.current && messages.length === 0) {
      greetedRef.current = true;
      const greetText = "नमस्कार, Patna Metro में आपका स्वागत है। मैं बोधि हूँ। Mic बटन दबाकर बोलें या नीचे लिखकर बताएँ, आपको कहाँ से कहाँ जाना है।";
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
        }, 2000);
      }, 8000);
    }

    return () => {
      clearTimeout(initialTimer);
      if (interval) clearInterval(interval);
    };
  }, [isBotAwake, isOpen]);

  // Auto-suggestions while typing
  useEffect(() => {
    if (inputText.length >= 2) {
      const words = inputText.split(' ');
      const lastWord = words[words.length - 1];
      const suggestions = stationMatcher.getSuggestions(lastWord);
      setAutoSuggestions(suggestions);
    } else {
      setAutoSuggestions([]);
    }
  }, [inputText]);

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
    setMessages((prev) => [...prev, { type: "bot", text, timestamp: new Date() }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { type: "user", text, timestamp: new Date() }]);
  };

  const addRouteCard = (data) => {
    setMessages((prev) => [...prev, { type: "route-card", ...data, timestamp: new Date() }]);
  };

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "hi-IN";
    msg.rate = 0.9;
    msg.pitch = 1.1;
    msg.onstart = () => setIsSpeaking(true);
    msg.onend = () => setIsSpeaking(false);
    msg.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(msg);
  };

  const handleMicClick = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showError("माफ़ कीजिए, आपका ब्राउज़र voice सपोर्ट नहीं करता। Chrome या Brave ब्राउज़र इस्तेमाल करें।");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      handleTextSubmit(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      showError("माफ़ कीजिए, आवाज़ समझने में समस्या हुई। कृपया लिखकर बताएँ।");
    };

    recognition.onend = () => setIsListening(false);

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const processRouteRequest = async (matchedStations, userText) => {
    setIsTyping(true);

    if (matchedStations.length >= 2) {
      let [source, destination] = matchedStations;
      source = stationMatcher.normalizeStationName(source);
      destination = stationMatcher.normalizeStationName(destination);

      if (stationMatcher.areSameStations(source, destination)) {
        showError("स्रोत और गंतव्य एक ही स्टेशन है। कृपया अलग स्टेशन चुनें।");
        setIsTyping(false);
        return;
      }

      try {
        const res = await api.post('/bot/voice-route', { source, destination });
        const data = res.data;

        setIsTyping(false);
        addBotMessage(data.voiceResponse);
        speak(data.voiceResponse);

        addRouteCard({
          source,
          destination,
          time: `${data.time} मिनट`,
          fare: `₹${data.fare}`,
          stations: `${data.totalStations} स्टेशन`
        });

        setTimeout(() => {
          setSource(source);
          setDestination(destination);
          navigate("/routefinder");
          if (typeof triggerSearch === "function") {
            triggerSearch();
          }
        }, 1500);

      } catch (err) {
        setIsTyping(false);
        showError("माफ़ कीजिए, रूट निकालने में समस्या आई। कृपया थोड़ी देर में प्रयास करें।");
      }
    } else if (matchedStations.length === 1) {
      setIsTyping(false);
      const normalizedStation = stationMatcher.normalizeStationName(matchedStations[0]);
      const text = `आपको ${normalizedStation} से कहाँ जाना है?`;
      addBotMessage(text);
      speak(text);
    } else {
      setIsTyping(false);
      showError("क्षमा करें, मुझे समझ नहीं आया। उदाहरण: 'दानापुर से पटना जंक्शन तक जाना है'");
    }
  };

  const handleTextSubmit = (customText = null) => {
    const text = typeof customText === 'string' ? customText : inputText;
    if (!text.trim()) return;

    if (typeof customText !== 'string') {
      addUserMessage(text);
      setInputText("");
    } else {
      addUserMessage(text);
    }

    setAutoSuggestions([]);

    // Logic like App Bot - Word by word search
    setTimeout(() => {
      const found = stationMatcher.findStations(text);
      processRouteRequest(found, text);
    }, 600);
  };

  const handleAutoSuggestionClick = (suggestion) => {
    const words = inputText.split(' ');
    words.pop();
    words.push(suggestion);
    const newText = words.join(' ') + ' ';
    setInputText(newText);
    setAutoSuggestions([]);
  };

  const showError = (text) => {
    addBotMessage(text);
    speak(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen && showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-20 right-0 w-64 p-3 rounded-2xl shadow-2xl text-white font-medium text-sm"
            style={{
              background: 'linear-gradient(135deg, #0B3D91 0%, #1a4ca3 100%)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            नमस्ते! मैं बोधि वॉइस असिस्टेंट हूँ
            <div className="absolute -bottom-2 right-6 w-4 h-4 rotate-45" style={{ background: '#1a4ca3' }}></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="bot-button"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                "0 10px 25px -5px rgba(11, 61, 145, 0.4)",
                "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              ]
            }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={handleBotClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden border-2 shadow-2xl transition-colors duration-300 bg-white border-blue-100"
          >
            <img src="/bodhi.png" alt="Bodhi" className="w-full h-full object-cover" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="absolute bottom-0 right-0 w-[350px] h-[550px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header - Premium App Gradient */}
            <div
              className="p-5 flex items-center justify-between text-white"
              style={{ background: 'linear-gradient(90deg, #0B3D91 0%, #1a4ca3 50%, #2b5cb5 100%)' }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 p-1.5 rounded-2xl backdrop-blur-md">
                  <img src="/bodhi.png" alt="Bodhi" className="w-full h-full object-contain rounded-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">बोधि</h2>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold">Voice Assistant</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <FaTimes size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 space-y-4">
              {messages.map((msg, index) => {
                if (msg.type === 'route-card') {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-br from-[#0B3D91] to-[#1a4ca3] p-5 rounded-2xl shadow-lg text-white"
                    >
                      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-white/60 text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">{msg.source}</span>
                        <div className="flex-1 mx-3 border-t-2 border-dashed border-white/20 relative">
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-white/10 px-2 py-0.5 rounded-full text-[8px]">ACTIVE</div>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-white/60 text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">{msg.destination}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white/10 p-2 rounded-xl">
                          <p className="text-[10px] text-white/60 mb-0.5">समय</p>
                          <p className="font-bold text-sm">{msg.time}</p>
                        </div>
                        <div className="bg-white/10 p-2 rounded-xl">
                          <p className="text-[10px] text-white/60 mb-0.5">किराया</p>
                          <p className="font-bold text-sm">{msg.fare}</p>
                        </div>
                        <div className="bg-white/10 p-2 rounded-xl">
                          <p className="text-[10px] text-white/60 mb-0.5">स्टेशन</p>
                          <p className="font-bold text-sm">{msg.stations}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.type === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 mr-2 flex-shrink-0 flex items-center justify-center p-1">
                        <img src="/bodhi.png" alt="B" className="w-full h-full opacity-80" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm ${msg.type === "user"
                        ? "bg-[#0B3D91] text-white rounded-tr-none"
                        : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                        }`}
                    >
                      {msg.text}
                      <p className={`text-[9px] mt-1 text-right ${msg.type === 'user' ? 'text-white/40' : 'text-gray-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 mr-2 flex-shrink-0 flex items-center justify-center p-1">
                    <img src="/bodhi.png" alt="B" className="w-full h-full opacity-80" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar - Same as App Logic */}
            <div className="p-4 bg-white border-t border-gray-100">
              {autoSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {autoSuggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleAutoSuggestionClick(s)}
                      className="text-[11px] bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => { e.preventDefault(); handleTextSubmit(); }}
                className="flex items-center space-x-3 bg-gray-100 p-1.5 rounded-full"
              >
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isListening ? "bg-red-500 animate-pulse" : "bg-green-500 text-white"
                    }`}
                >
                  {isListening ? <FaTimes /> : <FaMicrophone size={16} />}
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="यहाँ लिखें..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 text-gray-700"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${inputText.trim() ? "bg-blue-600 text-white" : "text-gray-400 bg-gray-200"
                    }`}
                >
                  <BsSendFill size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bot;

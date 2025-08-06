import React, { useState } from 'react';
import axios from 'axios';
import stationsData from '../../utils/Stations.json';

const Bot = ({ setSource, setDestination, triggerSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [greeted, setGreeted] = useState(false);
  const API_URL = "http://localhost:8080";

  const handleBotClick = () => {
    setIsOpen(!isOpen);
    if (!greeted) {
      const greetText = "नमस्कार, Patna Metro में आपका स्वागत है। मैं बोधि हूँ। कृपया बताएं, आपको कहाँ से कहाँ जाना है?";
      speak(greetText);
      setBotResponse(greetText);
      setGreeted(true);
    }
  };

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      const foundStations = findStationsInTranscript(transcript);
      processRouteRequest(foundStations);
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      showError("माइक से इनपुट लेने में समस्या हुई। कृपया दोबारा प्रयास करें।");
    };
  };

  const findStationsInTranscript = (transcript) => {
    const found = [];
    stationsData.stations.forEach(station => {
      station.synonyms.forEach(synonym => {
        if (transcript.toLowerCase().includes(synonym.toLowerCase())) {
          found.push(station.name);
        }
      });
    });
    return [...new Set(found)];
  };

  const processRouteRequest = async (matchedStations) => {
    if (matchedStations.length >= 2) {
      const [source, destination] = matchedStations;
      if (setSource) setSource(source);
      if (setDestination) setDestination(destination);

      try {
        const res = await axios.post(`${API_URL}/api/bot/voice-route`, {
          source,
          destination
        });

        const data = res.data;
        setBotResponse(data.voiceResponse);
        speak(data.voiceResponse);

        // Wait a short delay to ensure states are updated
        setTimeout(() => {
          if (triggerSearch) triggerSearch();
        }, 300); // delay to allow UI to update source/destination
      } catch (err) {
        console.error(err);
        showError("माफ़ कीजिए, रूट निकालने में समस्या आ रही है।");
      }
    } else {
      showError("कृपया फिर से बताएं: 'पटना जंक्शन से पीएमसीएच जाना है'");
    }
  };

  const showError = (errorText) => {
    setBotResponse(errorText);
    speak(errorText);
  };

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "hi-IN";
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleBotClick}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg"
      >
        🤖
      </button>

      {isOpen && (
        <div className="mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold mb-2">पटना मेट्रो सहायक</h2>
          <button
            onClick={handleMicClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full mb-3"
          >
            🎤 बोलकर बताएं
          </button>
          <div className="bg-gray-100 p-3 rounded">
            <p><strong>आप:</strong> {message || "..."}</p>
            <p><strong>बोधि:</strong> {botResponse || "आपकी प्रतीक्षा कर रहा हूँ..."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bot;

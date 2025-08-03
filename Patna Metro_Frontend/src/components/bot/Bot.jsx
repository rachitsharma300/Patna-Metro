import React, { useState } from "react";
import axios from "axios";
import stationsData from "../../utils/Stations.json";

const Bot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");

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
      console.log("User said:", transcript);

      const found = [];

      stationsData.stations.forEach(station => {
        station.synonyms.forEach(synonym => {
          if (transcript.includes(synonym)) {
            found.push(station.name);
          }
        });
      });

      console.log("Found stations:", found);

      if (found.length >= 2) {
        const source = found[0];
        const destination = found[1];

        axios.post("http://localhost:8080/api/route", { source, destination })
          .then(res => {
            const data = res.data;

            //  Defensive check
            if (!data.lines || data.lines.length === 0) {
              const noRoute = "Maaf kijiye, is route ka data uplabdh nahi hai.";
              setBotResponse(noRoute);
              speak(noRoute);
              return;
            }

            const speakText = `Aapko ${data.lines.join(" aur ")} line ki metro leni hogi. 
            Total samay ${data.totalTime} hai. Kiraya ${data.fare} rupaye. 
            ${data.interchange ? 'Aapko ' + data.interchange + ' par metro change karna hoga.' : ''}`;

            setBotResponse(speakText);
            speak(speakText);
          })
          .catch(err => {
            console.error(err);
            const errorText = "Maaf kijiye, route nahi mil paaya.";
            setBotResponse(errorText);
            speak(errorText);
          });
      } else {
        const incompleteText = "Kripya fir se bataen ki aap kahaan se kahaan jaana chaahate hain.";
        setBotResponse(incompleteText);
        speak(incompleteText);
      }
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      const errorText = "Mic input me koi dikkat aa gayi hai.";
      setBotResponse(errorText);
      speak(errorText);
    };
  };

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "hi-IN";
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg focus:outline-none"
      >
        🤖
      </button>

      {isOpen && (
        <div className="mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold mb-2 text-gray-800">🙏 नमस्ते, मैं Patna Metro Bot हूँ</h2>
          <p className="text-sm text-gray-600 mb-3">मैं आपका route ढूँढने में मदद कर सकता हूँ। बोलिए आप कहाँ जाना चाहते हैं।</p>

          <button
            onClick={handleMicClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            🎤 Mic से बोलें
          </button>

          <div className="mt-3 bg-gray-100 rounded p-2 max-h-40 overflow-y-auto">
            <p className="text-sm"><strong>You😎:</strong> {message}</p>
            <p className="text-sm"><strong>Bodhi🤖:</strong> {botResponse}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bot;
 
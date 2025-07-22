import React, { useEffect, useState } from "react";

function DisclaimerPopup() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 10000); // auto close after 10 sec
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
        <p className="text-gray-700 mb-6">
          This website currently displays demo data for informational and testing purposes only. Patna Metro has not yet officially released the complete details. Actual fares, timings, and route information may vary. Once the official data is published, this website will be updated accordingly.
        </p>
        <h2 className="text-xl font-semibold mb-4">अस्वीकरण</h2>
        <p>यह वेबसाइट वर्तमान में केवल डेमो डेटा दिखा रही है, जिसका उपयोग जानकारी और टेस्टिंग के लिए किया जा रहा है। पटना मेट्रो ने अभी तक आधिकारिक जानकारी साझा नहीं की है। वास्तविक किराया, समय और रूट जानकारी अलग हो सकती है। जैसे ही आधिकारिक डेटा जारी होगा, यह वेबसाइट अपडेट कर दी जाएगी।</p>
        <button
          onClick={() => setShow(false)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default DisclaimerPopup;

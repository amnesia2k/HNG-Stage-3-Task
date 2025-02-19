import * as React from "react";
import { useState, useEffect } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [translator, setTranslator] = useState(null);
  const [detector, setDetector] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAPIs = async () => {
      try {
        // Check if APIs are supported
        if (!('ai' in self && 'translator' in self.ai && 'languageDetector' in self.ai)) {
          throw new Error('Translation APIs are not supported in this browser');
        }

        // Initialize language detector
        const detectorCapabilities = await self.ai.languageDetector.capabilities();
        if (detectorCapabilities.available === 'no') {
          throw new Error('Language detection is not available');
        }

        const newDetector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
              console.log(`Detector: Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await newDetector.ready;
        setDetector(newDetector);

        // Initialize translator
        const translatorCapabilities = await self.ai.translator.capabilities();
        if (!translatorCapabilities.languagePairAvailable('en', selectedLanguage)) {
          throw new Error(`Translation to ${selectedLanguage} is not available`);
        }

        const newTranslator = await self.ai.translator.create({
          sourceLanguage: 'en',
          targetLanguage: selectedLanguage,
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
              console.log(`Translator: Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await newTranslator.ready;
        setTranslator(newTranslator);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    initializeAPIs();
  }, [selectedLanguage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !detector || !translator) return;

    try {
      // Detect language
      const detectionResults = await detector.detect(inputMessage);
      const [topResult] = detectionResults;
      const detectedLanguage = topResult.detectedLanguage;

      // Translate text
      const translation = await translator.translate(inputMessage);

      const newMessage = {
        text: inputMessage,
        detectedLanguage,
        translation,
      };

      setMessages([...messages, newMessage]);
      setInputMessage("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center p-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 text-white text-xl font-bold">
        AI-Powered Text Processing
      </header>

      <main className="flex-1 p-4 max-w-3xl mx-auto w-full flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white">Loading translation services...</div>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 mb-4">
              {messages.map((message, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-white">
                    {message.text}
                    <div className="text-sm text-gray-400">
                      Detected language: {message.detectedLanguage}
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">Translation:</div>
                    <div className="text-white">{message.translation}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-gray-800 text-white p-2 rounded-lg"
                >
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 bg-gray-800 text-white p-3 rounded-lg"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  disabled={isLoading}
                >
                  Send
                </button>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
}

import PropTypes from "prop-types";
import { Loader } from "lucide-react";
import * as React from "react";

export function MessageList({ messages }) {
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!messages.length) {
    return null;
  }

  return (
    <div className="flex-1 space-y-6 overflow-y-auto px-4 pb-4">
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col space-y-4">
          <div className="flex justify-end">
            <div className="bg-[#303030] px-4 py-2 rounded-full max-w-[80%] flex items-center gap-2">
              <span className="text-white">{message.text}</span>
              <span className="text-gray-400 text-sm">
                {!message.detectedLanguage ? (
                  <div className="flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin text-gray-400" />
                  </div>
                ) : (
                  `(${message.detectedLanguage})`
                )}
              </span>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="border px-4 py-2 rounded-full max-w-[80%] flex items-center gap-2">
              <span className="text-gray-400 text-sm">Translation:</span>
              {message.isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin text-white" />
                  <span className="text-gray-400">Translating...</span>
                </div>
              ) : message.error ? (
                <span className="text-red-400">{message.error}</span>
              ) : (
                <span className="text-white">{message.translation}</span>
              )}
            </div>
          </div>
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      detectedLanguage: PropTypes.string.isRequired,
      translation: PropTypes.string,
      isLoading: PropTypes.bool,
      error: PropTypes.string,
    })
  ).isRequired,
};

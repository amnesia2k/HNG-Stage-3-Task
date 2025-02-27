import PropTypes from "prop-types";
import { Loader, Bot, User } from "lucide-react";
import * as React from "react";

export function MessageList({ messages, type }) {
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
    <div className="flex-1 space-y-6 overflow-y-auto">
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col gap-1 space-y-4">
          <div className="flex justify-end items-start gap-2">
            <div className="bg-[#303030] p-2 md:p-3 rounded-xl max-w-[80%] flex flex-col items-start">
              <span className="text-white text-sm">{message.text}</span>
              <span className="text-gray-400 text-sm">
                {type === "translator" &&
                  (!message.detectedLanguage ? (
                    <div className="flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin text-gray-400" />
                    </div>
                  ) : (
                    <span className="text-sm">
                      Detected Language: ({message.detectedLanguage})
                    </span>
                  ))}
              </span>
            </div>
            <div className="flex-shrink-0 p-2 bg-[#303030] rounded-full">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="flex justify-start items-start gap-2">
            <div className="flex-shrink-0 p-2 bg-[#303030] rounded-full">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div
              className={`border p-2 md:p-3 rounded-xl max-w-[80%] flex flex-col items-start gap-1`}
            >
              <span className="text-gray-400 text-sm">
                {type === "translator" ? "Translation:" : "Summary:"}
              </span>
              {message.isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin text-white" />
                  <span className="text-gray-400">
                    {type === "translator"
                      ? "Translating..."
                      : "Summarizing..."}
                  </span>
                </div>
              ) : message.error ? (
                <span className="text-red-400 text-sm">{message.error}</span>
              ) : (
                <span className="text-white text-sm">
                  {message.translation}
                </span>
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
  type: PropTypes.oneOf(["translator", "summarizer"]).isRequired,
};

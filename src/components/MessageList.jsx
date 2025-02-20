import PropTypes from "prop-types";

export function MessageList({ messages }) {
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
                ({message.detectedLanguage})
              </span>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="border px-4 py-2 rounded-full max-w-[80%] flex items-center gap-2">
              <span className="text-gray-400 text-sm">Translation:</span>
              <span className="text-white">{message.translation}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      detectedLanguage: PropTypes.string.isRequired,
      translation: PropTypes.string.isRequired,
    })
  ).isRequired,
};

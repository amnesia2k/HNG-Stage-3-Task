import PropTypes from 'prop-types';

export function MessageList({ messages }) {
  if (!messages.length) {
    return null;
  }

  return (
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
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      detectedLanguage: PropTypes.string.isRequired,
      translation: PropTypes.string.isRequired
    })
  ).isRequired
};

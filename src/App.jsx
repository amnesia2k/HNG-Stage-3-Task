import * as React from "react";
import { MessageList } from "./components/MessageList";
import { LanguageSelector } from "./components/LanguageSelector";
import { useTranslation } from "./hooks/useTranslation";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

export default function App() {
  const [messages, setMessages] = React.useState([]);
  const [inputMessage, setInputMessage] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState("en");
  const { isLoading, error, translateText } = useTranslation(selectedLanguage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const result = await translateText(inputMessage);
    if (result) {
      setMessages([...messages, result]);
      setInputMessage("");
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
        {/* AI-Powered Text Processing */}
      </header>

      <main className="flex-1 p-4 max-w-3xl mx-auto w-full flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white">Loading translation services...</div>
          </div>
        ) : (
          <>
            <MessageList messages={messages} />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-2">
                <LanguageSelector
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1"
                />
                <Button type="submit" variant={"outline"} disabled={isLoading}>
                  Send
                </Button>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
}

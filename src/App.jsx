import * as React from "react";
import { MessageList } from "./components/MessageList";
import { LanguageSelector } from "./components/LanguageSelector";
import { useTranslation } from "./hooks/useTranslation";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Send } from "lucide-react";

export default function App() {
  const [messages, setMessages] = React.useState([]);
  const [inputMessage, setInputMessage] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState("en");
  const { isLoading, error, translateText } = useTranslation(selectedLanguage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      text: inputMessage,
      detectedLanguage: '',
      isLoading: true
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    try {
      const result = await translateText(inputMessage);
      if (result) {
        // Add a minimum delay of 1 second for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMessages(prevMessages => 
          prevMessages.map((msg, idx) => 
            idx === prevMessages.length - 1 ? {
              ...result,
              isLoading: false
            } : msg
          )
        );
      }
    } catch (err) {
      setMessages(prevMessages => 
        prevMessages.map((msg, idx) => 
          idx === prevMessages.length - 1 ? {
            ...msg,
            isLoading: false,
            error: err.message || 'Translation failed'
          } : msg
        )
      );
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

      <main className="flex-1 flex flex-col">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-white">Loading translation services...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center flex-col gap-y-10">
            <div className="text-white text-center text-2xl md:text-4xl font-semibold">
              What are we translating today?
            </div>

            <div className="w-full max-w-3xl px-4">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 p-2 border rounded-lg bg-background">
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={setSelectedLanguage}
                  />
                  <Input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={isLoading}
                    className="bg-white rounded-full text-black cursor-pointer"
                  >
                    <Send />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <div className="w-full max-w-3xl mx-auto px-4">
                <MessageList messages={messages} />
              </div>
            </div>
            <div className="w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky bottom-0">
              <div className="w-full max-w-3xl mx-auto px-4 py-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-2 p-2 border rounded-lg bg-background">
                    <LanguageSelector
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={setSelectedLanguage}
                    />
                    <Input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button
                      type="submit"
                      variant={"outline"}
                      disabled={isLoading}
                      className="bg-white rounded-full text-black cursor-pointer"
                    >
                      <Send />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

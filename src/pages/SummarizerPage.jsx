import { MessageList } from "@/components/MessageList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import * as React from "react";

export function SummarizerPage() {
  const [messages, setMessages] = React.useState([]);
  const [inputMessage, setInputMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Placeholder for summarizer logic
    const newMessage = {
      text: inputMessage,
      detectedLanguage: "en",
      isLoading: true,
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate loading state for UI demonstration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessages((prevMessages) =>
      prevMessages.map((msg, idx) =>
        idx === prevMessages.length - 1
          ? {
              ...msg,
              isLoading: false,
              translation: "This is a placeholder for the summary. The actual summarization logic will be implemented later.",
            }
          : msg
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center flex-col gap-y-10">
          <div className="text-white text-center text-2xl md:text-4xl font-semibold">
            What would you like to summarize today?
          </div>

          <div className="w-full max-w-3xl px-4">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-background">
                <Input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Enter English text to summarize (minimum 150 words)..."
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="submit"
                  variant="outline"
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
          <div className="w-full bg-[#1B1818] sticky bottom-0">
            <div className="w-full max-w-3xl mx-auto px-4 py-4">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 p-2 border rounded-lg bg-background">
                  <Input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Enter English text to summarize (minimum 150 words)..."
                    className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button
                    type="submit"
                    variant="outline"
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
    </div>
  );
}
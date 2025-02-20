import { MessageList } from "@/components/MessageList";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import * as React from "react";
import { useSummarizer } from "@/hooks/useSummarizer";

export function SummarizerPage() {
  const [messages, setMessages] = React.useState([]);
  const [inputMessage, setInputMessage] = React.useState("");
  const { isLoading, error, summarizeText } = useSummarizer();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      text: inputMessage,
      detectedLanguage: "en",
      isLoading: true,
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    try {
      const result = await summarizeText(inputMessage);
      if (result) {
        // Add a minimum delay of 1 second for better UX
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setMessages((prevMessages) =>
          prevMessages.map((msg, idx) =>
            idx === prevMessages.length - 1
              ? {
                  ...result,
                  isLoading: false,
                }
              : msg
          )
        );
      }
    } catch (err) {
      setMessages((prevMessages) =>
        prevMessages.map((msg, idx) =>
          idx === prevMessages.length - 1
            ? {
                ...msg,
                isLoading: false,
                error: err.message || "Summarization failed",
              }
            : msg
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
    <div className="flex-1 flex flex-col">
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-white">Loading summarization service...</div>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center flex-col gap-y-10">
          <div className="text-white text-center text-2xl md:text-4xl font-semibold">
            What would you like to summarize today?
          </div>

          <div className="w-full max-w-3xl px-4">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-2 px-2 pb-2 border rounded-lg bg-background">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Enter text to summarize (minimum 150 words)..."
                  className="flex-1 px-2 py-2 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none h-[70px]"
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
            <div className="w-full max-w-3xl mx-auto">
              <MessageList messages={messages} type="summarizer" />
            </div>
          </div>
          <div className="w-full bg-[#1B1818] sticky bottom-0">
            <div className="w-full max-w-3xl mx-auto pb-4">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-background">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Enter text to summarize (minimum 150 words)..."
                    className="flex-1 px-2 py-2 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none h-[70px]"
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

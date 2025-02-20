import * as React from "react";

export function useSummarizer() {
  const [summarizer, setSummarizer] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const initializeSummarizer = async () => {
      try {
        // Mock initialization for development
        const mockSummarizer = {
          summarize: async (text) => {
            // Simple mock summarization logic
            const words = text.split(' ');
            const summary = words.slice(0, Math.ceil(words.length * 0.3)).join(' ');
            return summary;
          },
        };

        setSummarizer(mockSummarizer);
        setIsLoading(false);
      } catch (err) {
        console.error("Summarizer initialization error:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    initializeSummarizer();
  }, []);

  const summarizeText = async (text) => {
    if (!text.trim()) return null;

    // Check if text meets minimum word count requirement
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount < 150) {
      throw new Error("Please enter at least 150 words for summarization");
    }

    if (!summarizer) return null;

    try {
      const summary = await summarizer.summarize(text);
      return {
        text,
        detectedLanguage: "en", // Assuming English for now
        translation: summary,
      };
    } catch (err) {
      throw new Error(err.message || "Summarization failed");
    }
  };

  return {
    isLoading,
    error,
    summarizeText,
  };
}

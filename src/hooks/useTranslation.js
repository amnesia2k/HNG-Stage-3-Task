import * as React from "react";

export function useTranslation(selectedLanguage) {
  // const [translator, setTranslator] = React.useState(null);
  const [detector, setDetector] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const initializeAPIs = async () => {
      try {
        // Check if APIs are supported
        if (
          !(
            "ai" in self &&
            "translator" in self.ai &&
            "languageDetector" in self.ai
          )
        ) {
          throw new Error("Translation APIs are not supported on this browser");
        }

        // Initialize language detector
        const detectorCapabilities =
          await self.ai.languageDetector.capabilities();
        if (detectorCapabilities.available === "no") {
          throw new Error("Language detection is not available");
        }

        const newDetector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              console.log(
                `Detector: Downloaded ${e.loaded} of ${e.total} bytes.`
              );
            });
          },
        });
        await newDetector.ready;
        setDetector(newDetector);

        // We'll initialize the translator after detecting the source language
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    initializeAPIs();
  }, [selectedLanguage]);

  const createTranslator = async (sourceLanguage, targetLanguage) => {
    try {
      const translatorCapabilities = await self.ai.translator.capabilities();
      if (
        !translatorCapabilities.languagePairAvailable(
          sourceLanguage,
          targetLanguage
        )
      ) {
        throw new Error(
          `Translation from ${sourceLanguage} to ${targetLanguage} is not available`
        );
      }

      const newTranslator = await self.ai.translator.create({
        sourceLanguage,
        targetLanguage,
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(
              `Translator: Downloaded ${e.loaded} of ${e.total} bytes.`
            );
          });
        },
      });
      await newTranslator.ready;
      return newTranslator;
    } catch (err) {
      throw new Error(`Failed to create translator: ${err.message}`);
    }
  };

  const translateText = async (text) => {
    if (!text.trim() || !detector) return null;

    try {
      // Detect the source language
      const detectionResults = await detector.detect(text);
      const [topResult] = detectionResults;
      const detectedLanguage = topResult.detectedLanguage;

      // If detected language is the same as target language, return the text as is
      if (detectedLanguage === selectedLanguage) {
        return {
          text,
          detectedLanguage,
          translation: text,
        };
      }

      // Create a new translator for the detected language pair
      const translatorInstance = await createTranslator(
        detectedLanguage,
        selectedLanguage
      );
      const translation = await translatorInstance.translate(text);

      return {
        text,
        detectedLanguage,
        translation,
      };
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  return {
    isLoading,
    error,
    translateText,
  };
}

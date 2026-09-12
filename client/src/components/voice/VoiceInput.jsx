import { useState } from "react";

export default function VoiceInput({ onTranscript }) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const [supported, setSupported] = useState(true);

  const startListening = () => {
    setError("");

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      setError(
        "Speech recognition is not supported in this browser.",
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      let text = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        text += event.results[i][0].transcript;
      }

      const cleanedText = text.trim();

      if (cleanedText) {
        onTranscript(cleanedText);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);

      setError(
        event.error === "not-allowed"
          ? "Microphone permission was denied."
          : "Could not understand your voice. Please try again.",
      );

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={startListening}
        disabled={isListening}
        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isListening ? "Listening..." : "Speak"}
      </button>

      {isListening && (
        <p className="mt-2 text-xs text-white/40">
          Listening...
        </p>
      )}

      {!supported && (
        <p className="mt-2 text-xs text-white/40">
          Voice input is unavailable in this browser.
        </p>
      )}

      {error && (
        <p className="mt-2 text-xs text-white/50">
          {error}
        </p>
      )}
    </div>
  );
}
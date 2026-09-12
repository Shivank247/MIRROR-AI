import { useEffect, useRef, useState } from "react";

export default function VoiceInput({ onTranscript }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
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
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += text;
        } else {
          interimText += text;
        }
      }

      const text = finalText || interimText;
      setTranscript(text);

      if (finalText.trim() && onTranscript) {
        onTranscript(finalText.trim());
      }
    };

    recognition.onerror = (event) => {
      setError(`Voice error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [onTranscript]);

  const startListening = () => {
    if (!recognitionRef.current) return;

    setTranscript("");
    setError("");

    try {
      recognitionRef.current.start();
    } catch {
      setError("Microphone is already active.");
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return (
    <div className="voice-input">
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        {isListening ? "🎙️ Stop" : "🎤 Speak"}
      </button>

      <div>
        <strong>Status:</strong>{" "}
        {isListening ? "Listening..." : "Ready"}
      </div>

      {transcript && (
        <p>
          <strong>Transcript:</strong> {transcript}
        </p>
      )}

      {error && (
        <p role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

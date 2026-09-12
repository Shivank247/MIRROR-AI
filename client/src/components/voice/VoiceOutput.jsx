import { useEffect, useState } from "react";

export default function VoiceOutput({ text, autoSpeak = true }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsAvailable, setTtsAvailable] = useState(true);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setTtsAvailable(false);
      return;
    }

    setTtsAvailable(true);
  }, []);

  const speak = () => {
    if (!text) return;

    if (!("speechSynthesis" in window)) {
      setTtsAvailable(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    utterance.onerror = () => {
      setIsSpeaking(false);
      setTtsAvailable(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (autoSpeak && text) {
      speak();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, autoSpeak]);

  if (!text) return null;

  return (
    <div
      style={{
        marginTop: "24px",
        padding: "18px",
        borderRadius: "14px",
        border: "1px solid rgba(128,128,128,0.25)",
      }}
    >
      <p>
        <strong>AI:</strong> {text}
      </p>

      <button type="button" onClick={isSpeaking ? stop : speak}>
        {isSpeaking ? "🔇 Stop" : "🔊 Speak"}
      </button>

      {!ttsAvailable && (
        <p role="alert">
          Voice output unavailable. You can read the response instead.
        </p>
      )}
    </div>
  );
}
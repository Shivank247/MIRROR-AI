import { useEffect, useState } from "react";

export default function VoiceOutput({ text, autoSpeak = true }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState("");

  const speak = () => {
    if (!text) return;

    if (!("speechSynthesis" in window)) {
      setError("Voice output unavailable. You can read the response instead.");
      return;
    }

    window.speechSynthesis.cancel();
    setError("");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      setError("Could not play voice. The text response is still available.");
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (autoSpeak && text) speak();

    return () => window.speechSynthesis?.cancel();
  }, [text, autoSpeak]);

  if (!text) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 620,
        margin: "18px auto 0",
        padding: 20,
        borderRadius: 16,
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.12)",
        boxSizing: "border-box",
      }}
    >
      <p style={{ marginTop: 0 }}>
        <strong>AI:</strong> {text}
      </p>

      <button type="button" onClick={isSpeaking ? stop : speak}>
        {isSpeaking ? "🔇 Stop" : "🔊 Speak"}
      </button>

      {error && (
        <p role="alert" style={{ marginBottom: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
}

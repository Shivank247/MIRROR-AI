import { useEffect, useState } from "react";

export default function VoiceOutput({ text, autoSpeak = true }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (!text || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

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
    <div className="voice-output">
      <p>
        <strong>AI:</strong> {text}
      </p>

      <button type="button" onClick={isSpeaking ? stop : speak}>
        {isSpeaking ? "🔇 Stop" : "🔊 Speak"}
      </button>
    </div>
  );
}

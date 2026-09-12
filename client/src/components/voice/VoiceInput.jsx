import { useEffect, useRef, useState } from "react";

export default function VoiceInput({ onTranscript }) {
  const [status, setStatus] = useState("IDLE");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [typedText, setTypedText] = useState("");

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Voice unavailable. You can type instead.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setStatus("LISTENING");
      setError("");
      setTranscript("");
    };

    recognition.onresult = (event) => {
      let text = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);

      const lastResult = event.results[event.results.length - 1];

      if (lastResult?.isFinal && text.trim()) {
        setStatus("READY");
        setTranscript(text.trim());

        if (onTranscript) {
          onTranscript(text.trim());
        }
      }
    };

    recognition.onerror = (event) => {
      setStatus("IDLE");

      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        setError("Voice unavailable. You can type instead.");
      } else {
        setError("Voice input failed. You can type instead.");
      }
    };

    recognition.onend = () => {
      setStatus((current) =>
        current === "LISTENING" ? "READY" : current
      );
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [onTranscript]);

  const startListening = () => {
    if (!recognitionRef.current) {
      setError("Voice unavailable. You can type instead.");
      return;
    }

    setError("");
    setTranscript("");
    setStatus("PROCESSING");

    try {
      recognitionRef.current.start();
    } catch {
      setStatus("IDLE");
      setError("Microphone is already active.");
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setStatus("TRANSCRIBING");
  };

  const submitTypedText = () => {
    const text = typedText.trim();

    if (!text) {
      setError("Please speak or type an answer.");
      return;
    }

    setError("");
    setTranscript(text);
    setStatus("READY");

    if (onTranscript) {
      onTranscript(text);
    }

    setTypedText("");
  };

  const isListening = status === "LISTENING";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "620px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          marginBottom: "18px",
          fontWeight: "600",
          letterSpacing: "0.04em",
        }}
      >
        Voice Input
      </div>

      <div
        style={{
          marginBottom: "18px",
          opacity: 0.8,
        }}
      >
        Status: {status}
      </div>

      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        style={{
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "600",
          background: isListening ? "#ef4444" : "#2563eb",
          color: "white",
          boxShadow: isListening
            ? "0 0 0 12px rgba(239,68,68,0.15)"
            : "0 8px 30px rgba(37,99,235,0.25)",
          transition: "all 0.2s ease",
        }}
      >
        {isListening ? "🎙 Stop" : "🎤 Speak"}
      </button>

      {isListening && (
        <div style={{ marginTop: "18px", opacity: 0.8 }}>
          Listening... speak your answer
        </div>
      )}

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Your voice transcript will appear here..."
        rows={3}
        style={{
          width: "100%",
          marginTop: "24px",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid rgba(128,128,128,0.35)",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <div style={{ marginTop: "14px" }}>
        <textarea
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
          placeholder="Speak OR type your answer..."
          rows={3}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid rgba(128,128,128,0.35)",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />

        <button
          type="button"
          onClick={submitTypedText}
          style={{
            marginTop: "10px",
            padding: "10px 22px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Submit Answer
        </button>
      </div>

      {error && (
        <p
          role="alert"
          style={{
            marginTop: "16px",
            color: "#dc2626",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

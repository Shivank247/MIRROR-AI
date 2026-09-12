import { useEffect, useRef, useState } from "react";

export default function VoiceInput({ onTranscript }) {
  const [status, setStatus] = useState("IDLE");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

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
    };

    recognition.onresult = (event) => {
      let result = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        result += event.results[i][0].transcript;
      }

      setText(result);

      if (event.results[event.results.length - 1].isFinal) {
        const finalText = result.trim();

        if (finalText) {
          setStatus("READY");

          if (onTranscript) {
            onTranscript(finalText);
          }
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      setStatus("IDLE");

      if (event.error === "not-allowed" || event.error === "permission-denied") {
        setError("Microphone permission denied. You can type instead.");
      } else {
        setError("Voice unavailable. You can type instead.");
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
    setError("");
    setText("");

    if (!recognitionRef.current) {
      setError("Voice unavailable. You can type instead.");
      return;
    }

    try {
      setStatus("LISTENING");
      recognitionRef.current.start();
    } catch (err) {
      console.error(err);
      setError("Voice unavailable. You can type instead.");
      setStatus("IDLE");
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setStatus("READY");
  };

  const submitText = () => {
    const value = text.trim();

    if (!value) {
      setError("Please speak or type your answer.");
      return;
    }

    setError("");
    setStatus("READY");

    if (onTranscript) {
      onTranscript(value);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "620px",
        margin: "30px auto",
        padding: "24px",
        borderRadius: "18px",
        background: "#f5f7fb",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <strong>Voice Input</strong>

        <span>
          {status === "LISTENING" ? "🎙️ Listening..." : status}
        </span>
      </div>

      <button
        type="button"
        onClick={status === "LISTENING" ? stopListening : startListening}
        style={{
          display: "block",
          margin: "0 auto 20px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: status === "LISTENING" ? "#dc2626" : "#2563eb",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {status === "LISTENING" ? "🛑 Stop" : "🎤 Speak"}
      </button>

      {status === "LISTENING" && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          🔊 Listening — speak now...
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Speak or type your answer..."
        rows={4}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
          resize: "vertical",
          fontSize: "16px",
        }}
      />

      <button
        type="button"
        onClick={submitText}
        style={{
          display: "block",
          margin: "15px auto 0",
          padding: "10px 22px",
          borderRadius: "10px",
          border: "none",
          background: "#111827",
          color: "white",
          cursor: "pointer",
        }}
      >
        Submit Answer
      </button>

      {error && (
        <p
          role="alert"
          style={{
            color: "#dc2626",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
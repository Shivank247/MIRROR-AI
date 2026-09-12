import { useEffect, useRef, useState } from "react";

export default function VoiceInput({ onTranscript, disabled = false }) {
  const [status, setStatus] = useState("IDLE");
  const [transcript, setTranscript] = useState("");
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
      let finalText = "";
      let interimText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i += 1
      ) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += text;
        } else {
          interimText += text;
        }
      }

      const text = finalText || interimText;

      setTranscript(text);

      if (finalText.trim()) {
        setStatus("READY");
        onTranscript?.(finalText.trim());
      } else {
        setStatus("TRANSCRIBING");
      }
    };

    recognition.onerror = (event) => {
      setStatus("IDLE");

      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        setError(
          "Microphone access denied. You can type instead.",
        );
      } else if (event.error === "no-speech") {
        setError(
          "No speech detected. Try again or type instead.",
        );
      } else {
        setError(
          "Voice unavailable. You can type instead.",
        );
      }
    };

    recognition.onend = () => {
      setStatus((current) =>
        current === "LISTENING" ||
        current === "TRANSCRIBING"
          ? "READY"
          : current,
      );
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [onTranscript]);

  const startListening = () => {
    if (disabled || !recognitionRef.current) {
      return;
    }

    setTranscript("");
    setError("");
    setStatus("LISTENING");

    try {
      recognitionRef.current.start();
    } catch {
      setStatus("IDLE");
      setError(
        "Voice is already active. Try again or type instead.",
      );
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setStatus("READY");
  };

  const submitText = () => {
    const value = transcript.trim();

    if (!value) {
      setError(
        "Please speak or type an answer first.",
      );
      return;
    }

    setError("");
    setStatus("PROCESSING");

    onTranscript?.(value);

    setTimeout(() => {
      setStatus("READY");
    }, 0);
  };

  const statusText = {
    IDLE: "Ready",
    LISTENING: "Listening... Speak now",
    TRANSCRIBING: "Transcribing...",
    PROCESSING: "Processing...",
    READY: "Ready",
  }[status];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 620,
        margin: "0 auto",
        padding: 24,
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,.12)",
        background: "rgba(255,255,255,.05)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <strong>Voice Input</strong>
        <span>{statusText}</span>
      </div>

      <button
        type="button"
        onClick={
          status === "LISTENING"
            ? stopListening
            : startListening
        }
        disabled={
          disabled || !recognitionRef.current
        }
        aria-label={
          status === "LISTENING"
            ? "Stop listening"
            : "Start listening"
        }
        style={{
          display: "block",
          margin: "24px auto 16px",
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "none",
          cursor: disabled
            ? "not-allowed"
            : "pointer",
          fontSize: 18,
          background:
            status === "LISTENING"
              ? "#ef4444"
              : "#2563eb",
          color: "#fff",
          boxShadow:
            status === "LISTENING"
              ? "0 0 0 12px rgba(239,68,68,.15)"
              : "none",
        }}
      >
        {status === "LISTENING"
          ? "Stop"
          : "Speak"}
      </button>

      {status === "LISTENING" && (
        <div
          style={{
            textAlign: "center",
            marginBottom: 14,
          }}
          aria-live="polite"
        >
          Listening...
        </div>
      )}

      <textarea
        value={transcript}
        onChange={(event) => {
          setTranscript(event.target.value);
          setError("");
        }}
        placeholder="Speak or type your answer..."
        rows={4}
        aria-label="Voice transcript or text answer"
        style={{
          width: "100%",
          boxSizing: "border-box",
          resize: "vertical",
          padding: 14,
          borderRadius: 12,
          border:
            "1px solid rgba(255,255,255,.15)",
          background: "rgba(0,0,0,.2)",
          color: "inherit",
          fontSize: 16,
        }}
      />

      <button
        type="button"
        onClick={submitText}
        disabled={
          !transcript.trim() || disabled
        }
        style={{
          width: "100%",
          marginTop: 10,
          padding: "12px 16px",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        Submit Answer
      </button>

      {error && (
        <p
          role="alert"
          style={{ marginTop: 14 }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
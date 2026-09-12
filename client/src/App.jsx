import { useCallback, useState } from "react";
import VoiceInput from "./components/voice/VoiceInput";
import VoiceOutput from "./components/voice/VoiceOutput";

function App() {
  const [response, setResponse] = useState("");

  const handleTranscript = useCallback((text) => {
    // P0 voice pipeline hook:
    // Voice -> STT -> this callback -> team AI/backend integration.
    // Replace the demo response with the agreed backend/API call when Shivani's
    // AI endpoint is available. Do not put API keys in this frontend.
    setResponse(`I heard: "${text}". Your voice input is ready for the AI system.`);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center" }}>MIRROR//AI</h1>
      <h2 style={{ textAlign: "center" }}>Voice Assistant</h2>

      <p style={{ textAlign: "center", opacity: 0.8 }}>
        Speak OR type your answer.
      </p>

      <VoiceInput onTranscript={handleTranscript} />
      <VoiceOutput text={response} />
    </main>
  );
}

export default App;

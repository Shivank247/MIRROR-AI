import VoiceInput from "./components/voice/VoiceInput";
import VoiceOutput from "./components/voice/VoiceOutput";

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Mirror AI</h1>

      <h2>Voice Assistant</h2>

      <VoiceInput />
      <VoiceOutput />
    </div>
  );
}

export default App;
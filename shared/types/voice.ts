export interface TranscriptionResult {
  transcribedText: string;
  confidence?: number;
}

export interface VoiceState {
  status:
    | "idle"
    | "listening"
    | "processing"
    | "speaking"
    | "error";
  error?: string;
}
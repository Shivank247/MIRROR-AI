import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, Sparkles } from "lucide-react";

function FutureSelfChat({
  futureSelf,
  onAsk,
  disabled = false,
}) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || disabled) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((current) => [...current, userMessage]);
    setQuestion("");

    try {
      const response = await onAsk(trimmedQuestion);

      setMessages((current) => [
        ...current,
        {
          id: `future-${Date.now()}`,
          role: "future",
          content:
            response ||
            "I don't have enough context to answer that yet.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: "future",
          content:
            "I couldn't reflect on that right now. Try asking again.",
          error: true,
        },
      ]);
    }
  };

  const suggestedQuestions = [
    "Was it worth it?",
    "What decision changed me the most?",
    "What would you do differently?",
  ];

  const askSuggestedQuestion = (value) => {
    setQuestion(value);
  };

  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-xl">
        <div className="border-b border-white/10 px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
              <MessageCircle size={18} />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Talk to your Future Self
              </p>

              <p className="mt-1 text-xs text-white/45">
                Ask about the life your decisions created.
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-[260px] space-y-4 px-5 py-6 sm:px-7">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-white text-black"
                      : "border border-white/10 bg-white/[0.045] text-white/80"
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {messages.length === 0 && (
            <div className="flex min-h-[210px] flex-col items-center justify-center text-center">
              <Sparkles
                size={20}
                className="mb-4 text-white/50"
              />

              <p className="text-sm text-white/65">
                {futureSelf?.futureVoice?.tone
                  ? "Your future is listening."
                  : "Ask your Future Self anything."}
              </p>

              <p className="mt-2 max-w-md text-xs leading-5 text-white/35">
                The conversation should stay grounded in the
                decisions, consequences, and trajectory that created
                this simulation.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-5 py-5 sm:px-7">
          <div className="mb-4 flex flex-wrap gap-2">
            {suggestedQuestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => askSuggestedQuestion(suggestion)}
                disabled={disabled}
                className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-white/55 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-2"
          >
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              disabled={disabled}
              placeholder="Ask your Future Self..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/25 disabled:cursor-not-allowed"
            />

            <button
              type="submit"
              disabled={disabled || !question.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Send question"
            >
              <ArrowUp size={17} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default FutureSelfChat;
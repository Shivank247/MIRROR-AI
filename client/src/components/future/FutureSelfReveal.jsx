import { useEffect, useState } from "react";

function FutureSelfReveal({ futureSelf, onComplete }) {
  const [stage, setStage] = useState("complete");

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage("identity"), 1800),
      setTimeout(() => setStage("trajectory"), 3200),
      setTimeout(() => setStage("ready"), 4800),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  if (!futureSelf) {
    return (
      <section className="future-self-reveal">
        <div className="future-self-reveal-content">
          <p>Future Self data is not available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`future-self-reveal future-self-reveal-${stage}`}
      aria-live="polite"
    >
      <div className="future-self-reveal-content">
        {stage === "complete" && (
          <>
            <p className="future-self-reveal-kicker">MIRROR//AI</p>
            <h1>SIMULATION COMPLETE.</h1>
            <p className="future-self-reveal-subtitle">
              This future was created by your decisions.
            </p>
          </>
        )}

        {stage !== "complete" && (
          <>
            <p className="future-self-reveal-kicker">YOUR FUTURE SELF</p>

            <h1>{futureSelf.career}</h1>

            <div className="future-self-reveal-meta">
              <div>
                <span>AGE</span>
                <strong>{futureSelf.age}</strong>
              </div>

              <div>
                <span>FINANCE</span>
                <strong>{futureSelf.financialState}</strong>
              </div>

              <div>
                <span>RELATIONSHIPS</span>
                <strong>{futureSelf.relationships}</strong>
              </div>
            </div>

            {stage === "trajectory" || stage === "ready" ? (
              <p className="future-self-reveal-trajectory">
                {futureSelf.trajectorySummary}
              </p>
            ) : null}

            {stage === "ready" && (
              <div className="future-self-reveal-actions">
                <button type="button" onClick={onComplete}>
                  TALK TO FUTURE SELF
                </button>

                <button type="button" onClick={onComplete}>
                  WHAT IF?
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default FutureSelfReveal;
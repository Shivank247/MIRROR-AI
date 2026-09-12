function FutureSelfStats({ futureSelf }) {
  if (!futureSelf) {
    return (
      <div className="future-self-card">
        <p>Future Self data is not available yet.</p>
      </div>
    );
  }

  const personality = futureSelf.personality ?? {};

  const stats = [
    {
      label: "Confidence",
      value: personality.confidence,
    },
    {
      label: "Risk Tolerance",
      value: personality.riskTolerance,
    },
    {
      label: "Discipline",
      value: personality.discipline,
    },
  ];

  const normalizeStat = (value) => {
    if (typeof value !== "number" || Number.isNaN(value)) {
      return 0;
    }

    return Math.max(0, Math.min(100, value));
  };

  return (
    <section className="future-self-stats">
      <div className="future-self-card">
        <p className="future-self-label">SIMULATED FUTURE SELF</p>

        <h2>{futureSelf.career}</h2>

        <p>{futureSelf.trajectorySummary}</p>

        <div className="future-self-meta">
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
      </div>

      <div className="future-self-card">
        <p className="future-self-label">PERSONALITY</p>

        <div className="future-self-stat-list">
          {stats.map((stat) => {
            const value = normalizeStat(stat.value);

            return (
              <div
                key={stat.label}
                className="future-self-stat"
              >
                <div className="future-self-stat-header">
                  <span>{stat.label}</span>

                  <strong>
                    {typeof stat.value === "number"
                      ? `${Math.round(value)}%`
                      : "—"}
                  </strong>
                </div>

                <div className="future-self-stat-bar">
                  <div
                    className="future-self-stat-fill"
                    style={{
                      width: `${value}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="future-self-card">
        <p className="future-self-label">MAJOR DECISIONS</p>

        {futureSelf.majorDecisions?.length ? (
          <ul>
            {futureSelf.majorDecisions.map(
              (decision, index) => (
                <li key={`${decision}-${index}`}>
                  {decision}
                </li>
              ),
            )}
          </ul>
        ) : (
          <p>No major decisions recorded.</p>
        )}
      </div>

      <div className="future-self-card">
        <p className="future-self-label">ACHIEVEMENTS</p>

        {futureSelf.achievements?.length ? (
          <ul>
            {futureSelf.achievements.map(
              (achievement, index) => (
                <li key={`${achievement}-${index}`}>
                  {achievement}
                </li>
              ),
            )}
          </ul>
        ) : (
          <p>No achievements recorded.</p>
        )}
      </div>

      <div className="future-self-card">
        <p className="future-self-label">REGRETS</p>

        {futureSelf.regrets?.length ? (
          <ul>
            {futureSelf.regrets.map(
              (regret, index) => (
                <li key={`${regret}-${index}`}>
                  {regret}
                </li>
              ),
            )}
          </ul>
        ) : (
          <p>No regrets recorded.</p>
        )}
      </div>

      <div className="future-self-card">
        <p className="future-self-label">LIFESTYLE</p>

        <p>{futureSelf.lifestyle}</p>
      </div>
    </section>
  );
}

export default FutureSelfStats;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`,
    );
  }

  return data;
}

export async function checkHealth() {
  return request("/health");
}

export async function createPlayerProfile(inputText) {
  return request("/api/ai/profile", {
    method: "POST",
    body: JSON.stringify({
      inputText,
    }),
  });
}

export async function generateScenario({
  profile,
  gameState,
  decisionHistory,
  memories,
  timeline,
}) {
  return request("/api/ai/scenario", {
    method: "POST",
    body: JSON.stringify({
      profile,
      gameState,
      decisionHistory,
      memories,
      timeline,
    }),
  });
}
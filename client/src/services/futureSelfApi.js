const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Generate the player's simulated Future Self.
 */
export async function generateFutureSelf({
  profile,
  gameState,
  trajectory,
}) {
  const response = await fetch(
    `${API_BASE_URL}/api/future-self/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile,
        gameState,
        trajectory,
      }),
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Future Self server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        `Future Self generation failed (${response.status}).`
    );
  }

  if (!data?.futureSelf) {
    throw new Error(
      "Future Self server returned no Future Self data."
    );
  }

  return data.futureSelf;
}

/**
 * Ask the generated Future Self a question.
 */
export async function askFutureSelf({
  futureSelf,
  question,
  context,
}) {
  const response = await fetch(
    `${API_BASE_URL}/api/future-self/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        futureSelf,
        question,
        context,
      }),
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Future Self chat server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        `Future Self chat failed (${response.status}).`
    );
  }

  if (!data?.response) {
    throw new Error(
      "Future Self chat server returned no response."
    );
  }

  return data.response;
}
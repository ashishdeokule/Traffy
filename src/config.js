// ── PASTE YOUR GROQ API KEY HERE ──────────────────────────
export const GROQ_API_KEY = "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";

// ── GROQ MODEL (free) ─────────────────────────────────────
export const GROQ_MODEL = "llama-3.3-70b-versatile";

// ── TRAFFY CALL FUNCTION ──────────────────────────────────
export async function askTraffy(systemPrompt, messages) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 1000,
        temperature: 0.7,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ]
      })
    });
    const data = await res.json();
    if (data.error) return `Error: ${data.error.message}`;
    return data.choices[0].message.content;
  } catch (e) {
    return "Traffy is offline. Check your connection.";
  }
}

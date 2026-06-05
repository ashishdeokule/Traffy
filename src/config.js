// ── PASTE YOUR GROQ API KEY HERE ──────────────────────────
export const GROQ_API_KEY = "paste_your_gsk_key_here";

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

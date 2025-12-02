import axios from "axios";

export const askHybrid = async prompt => {
  try {
    const r1 = await axios.post(
      process.env.OLLAMA_URL,
      { model: process.env.OLLAMA_MODEL, prompt, stream: false },
      { timeout: 6000 }
    );
    if (r1.data?.response) return r1.data.response;
  } catch {}

  try {
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    const r2 = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      payload
    );
    return r2.data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch {}

  return "Não consegui responder agora.";
};

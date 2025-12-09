// api/ai.js

import { chatCompletion } from "@huggingface/inference"

const HF_TOKEN = process.env.HF_TOKEN

// ✅ Vercel needs a *default export* that is a function
export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  if (!HF_TOKEN) {
    console.error("Missing HF_TOKEN environment variable")
    return res.status(500).json({ error: "HF_TOKEN is not set on the server" })
  }

  try {
    const { ingredients } = req.body || {}

    const ingredientsString = Array.isArray(ingredients)
      ? ingredients.join(", ")
      : String(ingredients ?? "")

    const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make
with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page.`

    const payload = {
      accessToken: HF_TOKEN,
      model: "Qwen/Qwen2.5-7B-Instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe!` },
      ],
      max_tokens: 1024,
    }

    const response = await chatCompletion(payload)
    const content = response.choices?.[0]?.message?.content ?? ""

    return res.status(200).json({ recipe: content })
  } catch (e) {
    console.error("HF error in /api/ai:", e)
    return res.status(500).json({ error: "Failed to generate recipe" })
  }
}

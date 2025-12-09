import { chatCompletion } from "@huggingface/inference"

// For local testing only. In prod, use an env var or a serverless proxy.
const HF_TOKEN = process.env.HF_TOKEN

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make
with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page.`

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = Array.isArray(ingredientsArr)
    ? ingredientsArr.join(", ")
    : String(ingredientsArr ?? "")

  const payload = {
    accessToken: HF_TOKEN,
    model: "Qwen/Qwen2.5-7B-Instruct",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `I have ${ingredientsString}. Please give me a recipe!` },
    ],
    max_tokens: 1024,
  }

  // sanity log (safe)
  console.log("HF payload check:", {
    model: payload.model,
    hasToken: !!payload.accessToken,
    userMsgLen: payload.messages[1].content.length,
  })

  try {
    const response = await chatCompletion(payload)
    return response.choices?.[0]?.message?.content ?? ""
  } catch (e) {
    console.error("HF error status:", e.status)
    console.error("HF error:", e.message)
    console.error("HF details:", e.response || e.cause || e.stack)
    throw e
  }
}

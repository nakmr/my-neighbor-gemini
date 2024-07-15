import { GoogleGenerativeAI } from "@google/generative-ai"
import Chat from "../models/Chat"
import { db } from "../utils/firestore"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export default class GeminiService {
  async callGemini() {
    const prompt = "Can you hear me?"
    const result = await model.generateContent(prompt)

    const docRef = db.collection("chat").doc("dev-test")
    await docRef.set({
      prompt: prompt,
      response: result.response.text()
    })

    return result.response
  }

  async chatGemini(message: Chat) {
    const prompt = message.message
    const conversationContext: any = []
    const currentMessages = []

    for (const [inputText, responseText] of conversationContext) {
      currentMessages.push({ role: "user", parts: inputText })
      currentMessages.push({ role: "model", parts: responseText })
    }

    const chat = model.startChat({
      history: currentMessages,
      generationConfig: {
        maxOutputTokens: 200,
      },
    })

    const result = await chat.sendMessage(prompt)
    const response = result.response
    const responseText = response.text()

    conversationContext.push([prompt, responseText])
    return responseText
  }
}

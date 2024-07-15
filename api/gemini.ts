import { Hono } from "hono"
import GeminiService from "../services/GeminiService"
import { getService } from "../utils/backend"
import { zValidator } from "@hono/zod-validator"
import Chat from "../models/Chat"

const geminiService = getService(GeminiService)

const gemini = new Hono()
  .post("/", async (c) => {
    const result = await geminiService.callGemini()
    return c.json({
      data: result,
    })
  })

  .post("/chat", zValidator("json", Chat), async (c) => {
    const data = c.req.valid("json")
    const result = await geminiService.chatGemini(data)
    return c.json({
      data: result,
    })
  })

export default gemini

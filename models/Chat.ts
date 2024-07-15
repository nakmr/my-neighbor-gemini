import { z } from "zod"

const Chat = z.object({
  message: z.string(),
})

type Chat = z.infer<typeof Chat>

export default Chat

import { Hono } from "hono";
import todo from "./todo";
import gemini from "./gemini";

// Always register routes in an index.ts file
// Must use chaining syntax, otherwise `hc` will lose types.
const api = new Hono()
  .route("/todo", todo)
  .route("/gemini", gemini)

export default api

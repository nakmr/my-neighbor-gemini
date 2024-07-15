import { Firestore } from "@google-cloud/firestore"

export const db = new Firestore({
  projectId: import.meta.env.VITE_PROJECT_ID,
  keyFilename: import.meta.env.VITE_GOOGLE_APPLICATION_CREDENTIALS,
  databaseId: import.meta.env.VITE_FIRESTORE_DB_ID
})

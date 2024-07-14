import { onRequest } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import * as admin from 'firebase-admin'

const serviceAccountKeyPath = './serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKeyPath),
})

const fireStore = admin.firestore()

export const testStore = onRequest((request, response) => {
  const params = request.body
  const documentId = String(params.documentId)

  if (documentId) {
    const testRef = fireStore.collection('test')
    testRef
      .doc(documentId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          response.status(200).send(doc.data())
        } else {
          response.status(200).send('document not found')
        }
      })
  } else {
    response.status(400).send({ errorMessaage: 'document id is not found' })
  }
})

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

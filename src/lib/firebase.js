import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: 'G-EZ2P640752',
}

const hasRequiredConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
].every((value) => typeof value === 'string' && value.trim().length > 0)

let app = null
let auth = null
let db = null
let storage = null

if (hasRequiredConfig) {
  app = initializeApp(firebaseConfig)

  // Keep the public website usable even if Firebase auth keys are invalid in production.
  try {
    auth = getAuth(app)
  } catch (error) {
    console.error('Firebase auth failed to initialize:', error)
  }

  db = getFirestore(app)
  storage = getStorage(app)
} else {
  console.warn('Firebase config is missing; auth, firestore, and storage are disabled.')
}

export { auth, db, storage }
export const firebaseConfigured = hasRequiredConfig

// Analytics only runs in browser environments that support it (not SSR/Node)
export const analyticsPromise = app
  ? isSupported().then((yes) =>
      yes ? getAnalytics(app) : null
    )
  : Promise.resolve(null)

export default app

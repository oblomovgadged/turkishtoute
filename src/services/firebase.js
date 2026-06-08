/**
 * Firebase service — central place for auth, firestore, realtime sync.
 *
 * SETUP (one-time):
 *   1. Create a Firebase project at https://console.firebase.google.com
 *   2. Enable Authentication (Email/Password) + Firestore Database
 *   3. Copy config from Project Settings → "Your apps"
 *   4. Paste keys into .env.local (see .env.example)
 *
 * Then `import { auth, db, signIn, signOut } from './services/firebase.js'`
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithEmailAndPassword, signOut as fbSignOut,
  createUserWithEmailAndPassword, onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, collection,
  query, where, getDocs, onSnapshot, addDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore';

const config = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const enabled = Boolean(config.apiKey);
let app, auth, db;

if (enabled) {
  app = initializeApp(config);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  console.warn('[firebase] disabled — missing VITE_FIREBASE_* env vars. Auth/Firestore calls will no-op.');
}

/* ----- Auth ----- */
export async function signIn(email, password) {
  if (!enabled) throw new Error('Firebase not configured');
  return signInWithEmailAndPassword(auth, email, password);
}
export async function signUp(email, password) {
  if (!enabled) throw new Error('Firebase not configured');
  return createUserWithEmailAndPassword(auth, email, password);
}
export async function signOut() {
  if (!enabled) return;
  return fbSignOut(auth);
}
export function watchAuth(callback) {
  if (!enabled) return () => {};
  return onAuthStateChanged(auth, callback);
}

/* ----- Trip / route storage ----- */
export async function saveRoute(userId, route) {
  if (!enabled) return null;
  const ref = await addDoc(collection(db, 'routes'), {
    userId, ...route, createdAt: serverTimestamp(),
  });
  return ref.id;
}
export async function loadRoute(routeId) {
  if (!enabled) return null;
  const snap = await getDoc(doc(db, 'routes', routeId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
export async function listUserRoutes(userId) {
  if (!enabled) return [];
  const q = query(collection(db, 'routes'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* ----- Co-pilot real-time sync ----- */
/** Subscribe to live changes on a route — calls onUpdate with the latest doc. */
export function subscribeRoute(routeId, onUpdate) {
  if (!enabled) return () => {};
  return onSnapshot(doc(db, 'routes', routeId), (snap) => {
    if (snap.exists()) onUpdate({ id: snap.id, ...snap.data() });
  });
}
export async function updateRoutePlaces(routeId, places) {
  if (!enabled) return;
  return updateDoc(doc(db, 'routes', routeId), { places, updatedAt: serverTimestamp() });
}

export { auth, db, enabled };

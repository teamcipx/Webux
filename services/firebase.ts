import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz8eXcbpuX0MhdW8vfVyiB5zc0WiOQSt0",
  authDomain: "webuxe2s.firebaseapp.com",
  projectId: "webuxe2s",
  storageBucket: "webuxe2s.firebasestorage.app",
  messagingSenderId: "396405186624",
  appId: "1:396405186624:web:af55a8cf8e2f65cb1d7fa5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
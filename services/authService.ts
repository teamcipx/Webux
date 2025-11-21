import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { auth, googleProvider } from './firebase';
import { User } from '../types';

const mapFirebaseUser = (firebaseUser: any): User => {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    photoURL: firebaseUser.photoURL || undefined,
    // Simple check for admin (in production use Custom Claims)
    isAdmin: firebaseUser.email === 'admin@webuxbd.com'
  };
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return mapFirebaseUser(userCredential.user);
};

export const registerUser = async (email: string, password: string, name: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // Update display name
  await updateProfile(userCredential.user, { displayName: name });
  return mapFirebaseUser(userCredential.user);
};

export const loginWithGoogle = async (): Promise<User> => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return mapFirebaseUser(userCredential.user);
};

export const logoutUser = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (firebaseUser: any) => {
    if (firebaseUser) {
      callback(mapFirebaseUser(firebaseUser));
    } else {
      callback(null);
    }
  });
};
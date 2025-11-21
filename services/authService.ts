import { User } from '../types';

// This service simulates Firebase Authentication and Firestore interactions.
// In a production environment, you would import firebase/auth and firebase/firestore here.

export const loginUser = async (email: string, password: string): Promise<User> => {
  console.log("Authenticating with Firebase...", { email });
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // basic validation mock
  if (!email.includes('@')) {
    throw new Error("Please enter a valid email address.");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  // Return mock user
  return {
    id: 'user_' + Math.random().toString(36).substr(2, 9),
    email,
    name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
  };
};

export const registerUser = async (email: string, password: string, name: string): Promise<User> => {
  console.log("Creating user in Firebase...", { email, name });
  
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (!email.includes('@')) {
    throw new Error("Please enter a valid email address.");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  return {
    id: 'user_' + Math.random().toString(36).substr(2, 9),
    email,
    name
  };
};

export const logoutUser = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("User logged out");
};
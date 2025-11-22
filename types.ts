import React from 'react';

export interface DomainResult {
  name: string;
  isAvailable: boolean;
  price: string;
  reasoning?: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
  color?: string; // Added color for styling differentiation
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  isAdmin?: boolean;
}

export type OrderStatus = 'pending' | 'approved' | 'in_progress' | 'delivered' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'partial' | 'paid';

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  planName: string;
  planPrice: number;
  planFeatures?: string[];
  
  // User Inputs
  domainName?: string;
  requirements?: string;
  
  // Payment Info
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  
  status: OrderStatus;
  adminNotes?: string;
  createdAt: any; // Firestore Timestamp
}

export interface OrderData {
  planName: string;
  planPrice: number;
  planFeatures: string[];
  domainName: string;
  requirements: string;
  paymentMethod: string;
  totalAmount: number;
  paidAmount: number;
}

export enum NavSection {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  PORTFOLIO = 'portfolio',
  PRICING = 'pricing',
  CONTACT = 'contact',
  DASHBOARD = 'dashboard'
}
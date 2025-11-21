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
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export enum NavSection {
  HOME = 'home',
  SERVICES = 'services',
  PORTFOLIO = 'portfolio',
  PRICING = 'pricing',
  DOMAIN = 'domain',
  CONTACT = 'contact'
}
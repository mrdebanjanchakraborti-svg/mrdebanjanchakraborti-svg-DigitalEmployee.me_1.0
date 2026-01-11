
import React from 'react';

export interface ServiceCardProps {
  title: string;
  target: string;
  roles: string[];
  icon: React.ReactNode;
}

export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

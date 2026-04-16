export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
  healthProfile?: {
    age?: number;
    gender?: string;
    savedTopics?: string[];
  };
  createdAt: any;
}

export interface Booking {
  id?: string;
  userId: string;
  date: string;
  time: string;
  tier: 'Basic' | 'Advanced' | 'Premium';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus?: 'unpaid' | 'paid';
  whatsappNumber?: string;
  createdAt: any;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  type: 'ebook' | 'program';
  imageUrl: string;
}

export interface HealthTopic {
  id: string;
  title: string;
  category: string;
  overview: string;
  details: string;
  symptoms: string[];
  prevention: string[];
  treatment: string;
}

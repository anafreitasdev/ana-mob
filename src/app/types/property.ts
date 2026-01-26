export type PropertyType = 'apartment' | 'house' | 'commercial';

export interface PropertyLocation {
  city: string;
  state: string;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  location: PropertyLocation;
  featured: boolean;
  images: string[];
}

import { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Economy Sedan',
    type: 'economy',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    capacity: 4,
    pricePerKm: 1.5,
    estimatedTime: 5
  },
  {
    id: '2',
    name: 'Comfort Sedan',
    type: 'comfort',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600',
    capacity: 4,
    pricePerKm: 2.0,
    estimatedTime: 5
  },
  {
    id: '3',
    name: 'Premium Sedan',
    type: 'premium',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600',
    capacity: 4,
    pricePerKm: 3.0,
    estimatedTime: 4
  },
  {
    id: '4',
    name: 'Luxury SUV',
    type: 'suv',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600',
    capacity: 6,
    pricePerKm: 3.5,
    estimatedTime: 6
  }
];
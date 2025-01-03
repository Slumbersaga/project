export interface Vehicle {
  id: string;
  name: string;
  type: 'economy' | 'comfort' | 'premium' | 'suv';
  image: string;
  capacity: number;
  pricePerKm: number;
  estimatedTime: number;
}

export interface Booking {
  pickup: string;
  dropoff: string;
  distance: number;
  vehicle: Vehicle;
  price: number;
}
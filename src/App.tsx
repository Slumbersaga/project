import React, { useState } from 'react';
import { Car } from 'lucide-react';
import { vehicles } from './data/vehicles';
import { BookingForm } from './components/BookingForm';
import { VehicleCard } from './components/VehicleCard';
import type { Vehicle, Booking } from './types';

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [locations, setLocations] = useState<{ pickup: string; dropoff: string } | null>(null);

  const handleLocationSubmit = (pickup: string, dropoff: string) => {
    setLocations({ pickup, dropoff });
    // Simulate distance calculation (in km)
    const distance = Math.floor(Math.random() * 10) + 5;
    if (selectedVehicle) {
      setBooking({
        pickup,
        dropoff,
        distance,
        vehicle: selectedVehicle,
        price: distance * selectedVehicle.pricePerKm
      });
    }
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    if (locations) {
      const distance = Math.floor(Math.random() * 10) + 5;
      setBooking({
        pickup: locations.pickup,
        dropoff: locations.dropoff,
        distance,
        vehicle,
        price: distance * vehicle.pricePerKm
      });
    }
  };

  const handleBooking = () => {
    if (booking) {
      alert('Booking confirmed! A driver will pick you up shortly.');
      setSelectedVehicle(null);
      setBooking(null);
      setLocations(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Car className="text-blue-600" size={24} />
            <h1 className="text-xl font-bold text-gray-900">GoMobility</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Book Your Ride</h2>
              <BookingForm onSubmit={handleLocationSubmit} />
            </div>

            {booking && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
                <div className="space-y-3">
                  <p><strong>From:</strong> {booking.pickup}</p>
                  <p><strong>To:</strong> {booking.dropoff}</p>
                  <p><strong>Distance:</strong> {booking.distance} km</p>
                  <p><strong>Vehicle:</strong> {booking.vehicle.name}</p>
                  <p className="text-xl font-bold text-blue-600">
                    Total: ${booking.price.toFixed(2)}
                  </p>
                  <button
                    onClick={handleBooking}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  selected={selectedVehicle?.id === vehicle.id}
                  onSelect={handleVehicleSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
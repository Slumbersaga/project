import React from 'react';
import { Users, Clock, Ban } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  selected: boolean;
  onSelect: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, selected, onSelect }: VehicleCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border transition-all cursor-pointer ${
        selected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-200'
      }`}
      onClick={() => onSelect(vehicle)}
    >
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{vehicle.name}</h3>
      <div className="flex items-center gap-4 text-gray-600">
        <div className="flex items-center gap-1">
          <Users size={18} />
          <span>{vehicle.capacity}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={18} />
          <span>{vehicle.estimatedTime} min</span>
        </div>
      </div>
      <div className="mt-3 text-lg font-semibold text-blue-600">
        ${vehicle.pricePerKm.toFixed(2)}/km
      </div>
    </div>
  );
}
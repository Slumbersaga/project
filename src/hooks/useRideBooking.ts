import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Ride } from '../types';

export function useRideBooking() {
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);

  const requestRide = async (
    riderId: string,
    pickupLocation: [number, number],
    dropoffLocation: [number, number],
    pickupAddress: string,
    dropoffAddress: string
  ) => {
    const { data, error } = await supabase
      .from('rides')
      .insert([{
        rider_id: riderId,
        pickup_location: `POINT(${pickupLocation[1]} ${pickupLocation[0]})`,
        dropoff_location: `POINT(${dropoffLocation[1]} ${dropoffLocation[0]})`,
        pickup_address: pickupAddress,
        dropoff_address: dropoffAddress,
        status: 'requested'
      }])
      .select()
      .single();

    if (error) throw error;
    setCurrentRide(data);
    return data;
  };

  const acceptRide = async (rideId: string, driverId: string) => {
    const { data, error } = await supabase
      .from('rides')
      .update({ 
        driver_id: driverId,
        status: 'accepted'
      })
      .eq('id', rideId)
      .select()
      .single();

    if (error) throw error;
    setCurrentRide(data);
    return data;
  };

  const updateRideStatus = async (rideId: string, status: 'started' | 'completed' | 'cancelled') => {
    const updates: any = { status };
    if (status === 'completed') {
      updates.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('rides')
      .update(updates)
      .eq('id', rideId)
      .select()
      .single();

    if (error) throw error;
    setCurrentRide(status === 'completed' ? null : data);
    return data;
  };

  return {
    currentRide,
    requestRide,
    acceptRide,
    updateRideStatus
  };
}
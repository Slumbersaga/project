import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Driver } from '../types';

export function useRealTimeLocation() {
  const [nearbyDrivers, setNearbyDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    // Subscribe to changes in driver locations
    const channel = supabase
      .channel('driver-locations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'drivers',
          filter: 'is_online=eq.true'
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setNearbyDrivers(current => {
              const updated = [...current];
              const index = updated.findIndex(d => d.id === payload.new.id);
              if (index !== -1) {
                updated[index] = { ...updated[index], ...payload.new };
              } else {
                updated.push(payload.new as Driver);
              }
              return updated;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateLocation = async (latitude: number, longitude: number, driverId: string) => {
    const point = `POINT(${longitude} ${latitude})`;
    const { error } = await supabase
      .from('drivers')
      .update({ 
        current_location: point,
        is_online: true 
      })
      .eq('id', driverId);
    
    if (error) throw error;
  };

  return {
    nearbyDrivers,
    updateLocation
  };
}
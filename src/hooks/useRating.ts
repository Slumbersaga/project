import { supabase } from '../lib/supabase';

export function useRating() {
  const submitRating = async (
    rideId: string,
    fromUserId: string,
    toUserId: string,
    rating: number,
    comment?: string
  ) => {
    const { error } = await supabase
      .from('ratings')
      .insert([{
        ride_id: rideId,
        from_user_id: fromUserId,
        to_user_id: toUserId,
        rating,
        comment
      }]);

    if (error) throw error;
  };

  const getUserRating = async (userId: string) => {
    const { data, error } = await supabase
      .from('ratings')
      .select('rating')
      .eq('to_user_id', userId);

    if (error) throw error;

    if (!data.length) return 5; // Default rating
    
    const average = data.reduce((acc, curr) => acc + curr.rating, 0) / data.length;
    return Number(average.toFixed(1));
  };

  return {
    submitRating,
    getUserRating
  };
}
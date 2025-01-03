export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string | null
          role: 'rider' | 'driver'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          phone?: string | null
          role: 'rider' | 'driver'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone?: string | null
          role?: 'rider' | 'driver'
          created_at?: string
        }
      }
      drivers: {
        Row: {
          id: string
          user_id: string
          vehicle_type: string
          license_number: string
          current_location: unknown
          is_online: boolean
          current_status: 'available' | 'busy'
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          vehicle_type: string
          license_number: string
          current_location?: unknown
          is_online?: boolean
          current_status?: 'available' | 'busy'
          rating?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          vehicle_type?: string
          license_number?: string
          current_location?: unknown
          is_online?: boolean
          current_status?: 'available' | 'busy'
          rating?: number
          created_at?: string
        }
      }
      rides: {
        Row: {
          id: string
          rider_id: string
          driver_id: string | null
          pickup_location: unknown
          dropoff_location: unknown
          pickup_address: string
          dropoff_address: string
          status: 'requested' | 'accepted' | 'started' | 'completed' | 'cancelled'
          price: number | null
          distance: number | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          rider_id: string
          driver_id?: string | null
          pickup_location: unknown
          dropoff_location: unknown
          pickup_address: string
          dropoff_address: string
          status?: 'requested' | 'accepted' | 'started' | 'completed' | 'cancelled'
          price?: number | null
          distance?: number | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          rider_id?: string
          driver_id?: string | null
          pickup_location?: unknown
          dropoff_location?: unknown
          pickup_address?: string
          dropoff_address?: string
          status?: 'requested' | 'accepted' | 'started' | 'completed' | 'cancelled'
          price?: number | null
          distance?: number | null
          created_at?: string
          completed_at?: string | null
        }
      }
      ratings: {
        Row: {
          id: string
          ride_id: string
          from_user_id: string
          to_user_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          ride_id: string
          from_user_id: string
          to_user_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          ride_id?: string
          from_user_id?: string
          to_user_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
    }
  }
}
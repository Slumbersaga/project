/*
  # Initial Schema for Ride Hailing Platform

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - full_name (text)
      - phone (text)
      - role (enum: rider, driver)
      - created_at (timestamp)
      
    - drivers
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - vehicle_type (text)
      - license_number (text)
      - current_location (geography)
      - is_online (boolean)
      - current_status (enum: available, busy)
      - rating (numeric)
      
    - rides
      - id (uuid, primary key)
      - rider_id (uuid, references users)
      - driver_id (uuid, references drivers)
      - pickup_location (geography)
      - dropoff_location (geography)
      - pickup_address (text)
      - dropoff_address (text)
      - status (enum: requested, accepted, started, completed, cancelled)
      - price (numeric)
      - distance (numeric)
      - created_at (timestamp)
      - completed_at (timestamp)
      
    - ratings
      - id (uuid, primary key)
      - ride_id (uuid, references rides)
      - from_user_id (uuid, references users)
      - to_user_id (uuid, references users)
      - rating (numeric)
      - comment (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('rider', 'driver');
CREATE TYPE driver_status AS ENUM ('available', 'busy');
CREATE TYPE ride_status AS ENUM ('requested', 'accepted', 'started', 'completed', 'cancelled');

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  role user_role NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create drivers table
CREATE TABLE drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users NOT NULL,
  vehicle_type text NOT NULL,
  license_number text NOT NULL,
  current_location geography(POINT, 4326),
  is_online boolean DEFAULT false,
  current_status driver_status DEFAULT 'available',
  rating numeric DEFAULT 5.0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create rides table
CREATE TABLE rides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rider_id uuid REFERENCES users NOT NULL,
  driver_id uuid REFERENCES drivers,
  pickup_location geography(POINT, 4326) NOT NULL,
  dropoff_location geography(POINT, 4326) NOT NULL,
  pickup_address text NOT NULL,
  dropoff_address text NOT NULL,
  status ride_status DEFAULT 'requested',
  price numeric,
  distance numeric,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Create ratings table
CREATE TABLE ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id uuid REFERENCES rides NOT NULL,
  from_user_id uuid REFERENCES users NOT NULL,
  to_user_id uuid REFERENCES users NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Drivers can update their location and status"
  ON drivers
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read driver locations"
  ON drivers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Riders can create ride requests"
  ON rides
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = rider_id AND status = 'requested');

CREATE POLICY "Users can view their own rides"
  ON rides
  FOR SELECT
  TO authenticated
  USING (auth.uid() = rider_id OR auth.uid() = (SELECT user_id FROM drivers WHERE id = rides.driver_id));

CREATE POLICY "Users can create ratings"
  ON ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user_id);

-- Create indexes for better performance
CREATE INDEX drivers_location_idx ON drivers USING GIST (current_location);
CREATE INDEX rides_status_idx ON rides (status);
CREATE INDEX rides_created_at_idx ON rides (created_at);
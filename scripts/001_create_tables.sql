-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create lost_found_items table
CREATE TABLE IF NOT EXISTS public.lost_found_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('lost', 'found')),
  image_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'returned')),
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block TEXT NOT NULL CHECK (block IN ('D', 'E', 'F', 'G', 'H', 'I')),
  room_number TEXT NOT NULL,
  floor INTEGER NOT NULL,
  UNIQUE(block, room_number)
);

-- Create room_schedules table
CREATE TABLE IF NOT EXISTS public.room_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
  time_slot TEXT NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(room_id, day_of_week, time_slot)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lost_found_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_schedules ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for announcements
CREATE POLICY "Anyone can view announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Admins can insert announcements" ON public.announcements FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can delete announcements" ON public.announcements FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- RLS Policies for lost_found_items
CREATE POLICY "Anyone can view lost_found items" ON public.lost_found_items FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert items" ON public.lost_found_items FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Admins can update any item" ON public.lost_found_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admins can delete any item" ON public.lost_found_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- RLS Policies for rooms
CREATE POLICY "Anyone can view rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Admins can manage rooms" ON public.rooms FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- RLS Policies for room_schedules
CREATE POLICY "Anyone can view room schedules" ON public.room_schedules FOR SELECT USING (true);
CREATE POLICY "Admins can manage room schedules" ON public.room_schedules FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_lost_found_items_type ON public.lost_found_items(type);
CREATE INDEX IF NOT EXISTS idx_lost_found_items_category ON public.lost_found_items(category);
CREATE INDEX IF NOT EXISTS idx_lost_found_items_status ON public.lost_found_items(status);
CREATE INDEX IF NOT EXISTS idx_room_schedules_room_id ON public.room_schedules(room_id);
CREATE INDEX IF NOT EXISTS idx_room_schedules_day_of_week ON public.room_schedules(day_of_week);
CREATE INDEX IF NOT EXISTS idx_announcements_created_at ON public.announcements(created_at DESC);

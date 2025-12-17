-- Seed rooms for blocks D to I (floors 1-3, rooms 01-04 per floor)
DO $$
DECLARE
  block_letter TEXT;
  floor_num INTEGER;
  room_num INTEGER;
  room_number_str TEXT;
BEGIN
  FOR block_letter IN SELECT unnest(ARRAY['D', 'E', 'F', 'G', 'H', 'I'])
  LOOP
    FOR floor_num IN 1..3
    LOOP
      FOR room_num IN 1..4
      LOOP
        room_number_str := floor_num || LPAD(room_num::TEXT, 2, '0');
        INSERT INTO public.rooms (block, room_number, floor)
        VALUES (block_letter, room_number_str, floor_num)
        ON CONFLICT (block, room_number) DO NOTHING;
      END LOOP;
    END LOOP;
  END LOOP;
END $$;

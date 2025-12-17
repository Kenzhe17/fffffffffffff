# UniSync Supabase Setup Guide

This guide will help you set up your Supabase database for the UniSync application.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Your Supabase project is already connected with these credentials:
  - URL: `https://rfvquepefupnjkwgkofg.supabase.co`
  - Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 1: Access Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Select your project: `rfvquepefupnjkwgkofg`

## Step 2: Run SQL Scripts

You need to run 3 SQL scripts in order. Here's how:

### Open SQL Editor

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query** to create a new query

### Script 1: Create Tables and RLS Policies

Copy the entire content from `scripts/001_create_tables.sql` and paste it into the SQL Editor, then click **Run**.

This script will:
- Create 5 tables: profiles, announcements, lost_found_items, rooms, room_schedules
- Enable Row Level Security (RLS) on all tables
- Create RLS policies for proper access control
- Add indexes for performance

**Expected Result:** You should see "Success. No rows returned" message.

### Script 2: Create Profile Trigger

Copy the entire content from `scripts/002_create_profile_trigger.sql` and paste it into a new query, then click **Run**.

This script will:
- Create a function that automatically creates a profile when a new user signs up
- Set admin status for adminsync17@gmail.com automatically
- Create a trigger that fires on new user registration

**Expected Result:** You should see "Success. No rows returned" message.

### Script 3: Seed Room Data

Copy the entire content from `scripts/003_seed_rooms.sql` and paste it into a new query, then click **Run**.

This script will:
- Insert 72 rooms (6 blocks × 3 floors × 4 rooms)
- Blocks: D, E, F, G, H, I
- Floors: 1, 2, 3
- Rooms per floor: 101-104, 201-204, 301-304

**Expected Result:** You should see "Success. No rows returned" message.

## Step 3: Verify Tables Were Created

1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - profiles
   - announcements
   - lost_found_items
   - rooms
   - room_schedules

3. Click on **rooms** table - you should see 72 rows of room data

## Step 4: Enable Email Authentication

1. Go to **Authentication** → **Providers** in the left sidebar
2. Find **Email** provider
3. Make sure it's **Enabled** (it should be by default)
4. You can optionally disable "Confirm email" for testing purposes

## Step 5: Test Your Setup

### Create a Test User

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter:
   - Email: `test@sdu.edu.kz`
   - Password: `test123` (or any password 6+ characters)
4. Click **Create user**

### Verify Profile Was Created

1. Go to **Table Editor** → **profiles**
2. You should see your test user in the profiles table
3. The `is_admin` field should be `false`

### Test Admin User

1. Try creating user with email: `adminsync17@gmail.com`
2. Check the profiles table - `is_admin` should be `true`

## Step 6: Your App is Ready!

Your Supabase database is now fully configured! 

The credentials are already set in your app at `lib/supabase.js`:
```javascript
url: "https://rfvquepefupnjkwgkofg.supabase.co"
anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Troubleshooting

### Issue: "permission denied for table X"

**Solution:** Make sure you ran Script 1 completely. RLS policies must be created.

### Issue: "relation does not exist"

**Solution:** Make sure you ran the scripts in order (001 → 002 → 003).

### Issue: No profile created on signup

**Solution:** 
1. Check if Script 2 (trigger) was run successfully
2. Go to Database → Functions - you should see `handle_new_user`
3. Go to Database → Triggers - you should see `on_auth_user_created`

### Issue: Can't see any data in tables

**Solution:** 
1. Check RLS policies are enabled
2. Make sure you're signed in as a user when testing
3. For testing, you can temporarily disable RLS:
   ```sql
   ALTER TABLE public.rooms DISABLE ROW LEVEL SECURITY;
   ```

## Next Steps

1. Deploy your app to Vercel (click "Publish" in v0)
2. Create your admin account: `adminsync17@gmail.com`
3. Start using UniSync!

## Important Notes

- **Admin Access:** Only `adminsync17@gmail.com` has admin privileges
- **SDU Students:** Any email ending with `@sdu.edu.kz` can register
- **Guest Access:** No authentication required for basic features
- **RLS is Active:** Users can only modify their own data; admins can modify everything

## Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Check Supabase logs (Dashboard → Logs)
3. Verify all 3 SQL scripts ran successfully
4. Make sure RLS policies are active

---

**Your database is now ready! 🎉**

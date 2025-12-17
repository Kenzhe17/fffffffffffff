# UniSync Deployment Guide

## Prerequisites
Before deploying, ensure you have:
1. ✅ Supabase account and project created
2. ✅ All SQL scripts ready to run
3. ✅ Vercel account (or other hosting platform)

---

## Step 1: Set Up Supabase Database

### 1.1 Run SQL Scripts in Order

Go to your Supabase dashboard → SQL Editor and run these scripts in order:

1. **scripts/001_create_tables.sql** - Creates all database tables (profiles, announcements, lost_found_items, rooms, room_schedules)
2. **scripts/002_create_profile_trigger.sql** - Sets up automatic profile creation on user signup
3. **scripts/003_seed_rooms.sql** - Populates rooms for blocks D-I (101-304)

### 1.2 Enable Email Authentication

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Enable **Email** provider
3. Disable email confirmation for development (optional):
   - Go to **Authentication** → **Email Templates**
   - Or update: **Settings** → **Auth** → **Email Auth** → Disable "Enable email confirmations"

### 1.3 Get Your Supabase Credentials

From Supabase Dashboard → **Settings** → **API**:
- Copy your **Project URL** (SUPABASE_URL)
- Copy your **anon/public** key (SUPABASE_ANON_KEY)

---

## Step 2: Update Environment Variables

Your Supabase environment variables are already configured in v0:
- ✅ `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `SUPABASE_ANON_KEY` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`

These will automatically be available when you deploy to Vercel from v0.

---

## Step 3: Deploy to Vercel

### Option A: Deploy from v0 (Recommended)
1. Click the **"Publish"** button in the top-right corner of v0
2. Select **"Deploy to Vercel"**
3. Confirm the deployment
4. Wait for deployment to complete
5. Your site will be live at: `https://your-project-name.vercel.app`

### Option B: Manual Deployment
1. Download your project code (ZIP file)
2. Extract the files locally
3. Install Vercel CLI: `npm i -g vercel`
4. Run: `vercel` in your project directory
5. Follow the prompts to deploy

---

## Step 4: Verify Deployment

After deployment, test these features:

### 4.1 Authentication
1. Go to your deployed site
2. Try registering with an @sdu.edu.kz email
3. Log in and verify you can access the home page
4. Log out and log back in to verify session persistence

### 4.2 Admin Access
1. Register/Login with: `adminsync17@gmail.com`
2. Go to: `https://your-site.vercel.app/admin-login.html`
3. Verify you can access the admin dashboard
4. Test creating announcements, managing rooms, etc.

### 4.3 Room Finder
1. Go to Room Finder page
2. Select a block (D-I)
3. View room schedules
4. Verify availability shows correctly

### 4.4 Lost & Found
1. Go to Lost & Found page
2. Submit a new lost/found item
3. Verify it appears in the list
4. Check admin panel to see the item

### 4.5 Announcements
1. Create an announcement in admin panel
2. Go to Campus Feed page
3. Verify the announcement appears

---

## Step 5: Configure Custom Domain (Optional)

### In Vercel Dashboard:
1. Go to your project → **Settings** → **Domains**
2. Add your custom domain (e.g., `unisync.sdu.edu.kz`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

---

## Troubleshooting

### Issue: "Failed to fetch" errors
**Solution:** Check that:
- Supabase URL and keys are correct
- RLS policies are enabled
- Tables exist in database

### Issue: Can't login
**Solution:**
- Check Supabase Auth is enabled
- Verify email confirmation is disabled (for testing)
- Check browser console for errors

### Issue: Admin panel not accessible
**Solution:**
- Ensure you're logged in with `adminsync17@gmail.com`
- Check that the profile was created with `is_admin = true`
- Run this SQL to verify: `SELECT * FROM profiles WHERE email = 'adminsync17@gmail.com';`

### Issue: Room schedules not showing
**Solution:**
- Verify seed script (003_seed_rooms.sql) was run
- Check: `SELECT COUNT(*) FROM rooms;` (should return 1224 rooms)

---

## Post-Deployment Checklist

- [ ] SQL scripts executed successfully
- [ ] Email auth enabled in Supabase
- [ ] Site deployed to Vercel
- [ ] Authentication working (signup/login)
- [ ] Admin access working with adminsync17@gmail.com
- [ ] Room Finder showing schedules
- [ ] Lost & Found submitting items
- [ ] Announcements displaying on feed
- [ ] Dark/Light mode toggling correctly

---

## Admin Credentials

**Admin Login:**
- Email: `adminsync17@gmail.com`
- Password: Any password (6+ characters on first signup)

**Student Login:**
- Any email ending with `@sdu.edu.kz`
- Password: Any password (6+ characters)

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify Supabase dashboard for data
3. Check Vercel deployment logs
4. Test authentication flow step by step

Your UniSync website is now ready for production use!

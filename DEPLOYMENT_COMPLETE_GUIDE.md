# UniSync Complete Deployment Guide

Complete step-by-step guide to deploy your UniSync application.

## Overview

UniSync is now configured with:
- ✅ Real Supabase authentication
- ✅ PostgreSQL database with RLS
- ✅ 72 rooms across 6 blocks (D-I)
- ✅ Lost & Found system
- ✅ Announcements/Feed system
- ✅ Admin dashboard

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

This is the easiest and fastest way to deploy.

#### Steps:

1. **Click Publish Button**
   - In v0, click the **"Publish"** button at the top-right
   - Select **"Deploy to Vercel"**
   - Sign in to Vercel if needed

2. **Configure Project**
   - Project name: `unisync-sdu` (or your choice)
   - Framework Preset: **Other**
   - Root Directory: `./`

3. **Deploy**
   - Click **"Deploy"**
   - Wait 1-2 minutes for deployment
   - You'll get a live URL: `https://unisync-sdu.vercel.app`

4. **Setup Supabase Database**
   - Follow the **SUPABASE_SETUP_GUIDE.md** to run SQL scripts
   - This takes about 5 minutes

5. **Test Your Site**
   - Visit your Vercel URL
   - Create an account with `@sdu.edu.kz` email
   - Test all features!

#### Advantages:
- ✅ Automatic SSL certificate
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Auto-deploys on updates
- ✅ Free for personal projects

---

### Option 2: Deploy with GitHub

Deploy via GitHub for version control.

#### Steps:

1. **Download Project**
   - Click the three dots (⋮) in v0
   - Select **"Download ZIP"**
   - Extract the files

2. **Create GitHub Repository**
   - Go to [github.com/new](https://github.com/new)
   - Name: `unisync-sdu`
   - Make it **Public** or **Private**
   - Click **"Create repository"**

3. **Push Code to GitHub**
   ```bash
   cd unisync-sdu
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/unisync-sdu.git
   git push -u origin main
   ```

4. **Deploy to Vercel from GitHub**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select **Import Git Repository**
   - Choose your `unisync-sdu` repo
   - Click **Deploy**

5. **Setup Database**
   - Follow **SUPABASE_SETUP_GUIDE.md**

#### Advantages:
- ✅ Version control
- ✅ Collaboration support
- ✅ Auto-deploy on git push
- ✅ Easy rollbacks

---

### Option 3: Local Development

Run locally for testing and development.

#### Requirements:
- Node.js 18+ or Python 3.7+

#### Using Python (Simplest):

```bash
# Navigate to project folder
cd unisync-sdu

# Start server
python -m http.server 8000

# Open browser
open http://localhost:8000
```

#### Using Node.js:

```bash
# Install serve globally
npm install -g serve

# Start server
serve -s . -p 8000

# Open browser
open http://localhost:8000
```

#### Using VS Code:

1. Install **Live Server** extension
2. Right-click `index.html`
3. Select **"Open with Live Server"**

---

## Post-Deployment Setup

### 1. Configure Supabase (Required)

Follow **SUPABASE_SETUP_GUIDE.md** to:
- Run 3 SQL scripts
- Create database tables
- Set up authentication
- Seed room data

**This step is REQUIRED for the app to work!**

### 2. Create Admin Account

1. Visit your deployed site
2. Register with email: `adminsync17@gmail.com`
3. Password: any password (6+ characters)
4. You now have admin access!

### 3. Test All Features

#### As Student (Regular User):
- ✅ Register with `@sdu.edu.kz` email
- ✅ View room schedules
- ✅ Report lost/found items
- ✅ View campus feed
- ✅ Access grades/attendance (demo data)

#### As Admin:
- ✅ Login with `adminsync17@gmail.com`
- ✅ Go to `/admin-login.html`
- ✅ Manage room schedules
- ✅ Manage lost & found items
- ✅ Create announcements
- ✅ View statistics

#### As Guest:
- ✅ Click "Google" login on homepage
- ✅ Limited features (no grades/homework)
- ✅ Can view public content

---

## Environment & Credentials

### Supabase Configuration

Already configured in `lib/supabase.js`:

```javascript
url: "https://rfvquepefupnjkwgkofg.supabase.co"
anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdnF1ZXBlZnVwbmprd2drb2ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODczNDgsImV4cCI6MjA3NzM2MzM0OH0.UJJiRTyhVta9WwIL2QOdryacmAqZIuZNq9hsQcAaFvs"
```

**No environment variables needed!** Everything is configured.

---

## Features Checklist

Make sure everything works:

### Authentication
- [ ] Register with `@sdu.edu.kz` email
- [ ] Login with existing account
- [ ] Guest access via Google button
- [ ] Admin access with `adminsync17@gmail.com`
- [ ] Logout functionality

### Room Finder
- [ ] View 6 blocks (D-I)
- [ ] Click block to see rooms
- [ ] Click room to see schedule
- [ ] Schedule shows Mon-Sat
- [ ] Time slots 8:30-17:20
- [ ] Available/Occupied status

### Lost & Found
- [ ] Report lost item
- [ ] Report found item
- [ ] Upload image
- [ ] Select category
- [ ] Browse items
- [ ] Filter by category

### Campus Feed
- [ ] View announcements
- [ ] Filter by type
- [ ] See author name
- [ ] Time ago display

### Admin Dashboard
- [ ] Login as admin
- [ ] View statistics
- [ ] Manage rooms
- [ ] Set room schedules
- [ ] Manage lost & found
- [ ] Create announcements
- [ ] Delete items

### UI/UX
- [ ] Dark/Light mode toggle
- [ ] Responsive design
- [ ] Smooth animations
- [ ] Loading states
- [ ] Error messages

---

## Troubleshooting

### Can't login / Auth errors

1. Check Supabase scripts were run
2. Verify email auth is enabled in Supabase
3. Check browser console for errors
4. Try clearing browser cache/cookies

### No data showing

1. Run SQL scripts in Supabase (SUPABASE_SETUP_GUIDE.md)
2. Check RLS policies are active
3. Verify you're logged in
4. Check Supabase logs for errors

### Room schedules not saving

1. Make sure you're logged in as admin
2. Check admin status in profiles table
3. Verify RLS policies allow admin access
4. Check browser console for errors

### 404 errors on routes

- **Vercel:** Make sure `vercel.json` exists (it should)
- **Local:** Use a proper HTTP server, not `file://`

---

## Performance & Best Practices

### Optimization Tips

1. **Enable Caching** (Vercel does this automatically)
2. **Compress Images** (before uploading to lost & found)
3. **Monitor Supabase Usage** (Dashboard → Usage)

### Security Notes

- ✅ RLS policies protect all data
- ✅ Only admins can modify critical data
- ✅ User passwords are hashed by Supabase
- ✅ HTTPS required in production

### Supabase Limits (Free Tier)

- 500MB database storage
- 2GB file storage
- 50,000 monthly active users
- Unlimited API requests

**This is more than enough for SDU campus!**

---

## What's Next?

### Recommended Enhancements

1. **Email Notifications** - Notify when item is found
2. **Real-time Updates** - Use Supabase Realtime
3. **Mobile App** - Convert to React Native
4. **Analytics** - Track popular rooms/times
5. **Room Booking** - Allow students to book rooms

### Maintenance

1. **Monitor Supabase logs** weekly
2. **Backup database** monthly
3. **Update dependencies** quarterly
4. **Review RLS policies** as needed

---

## Support & Resources

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Your Project Files
- `SUPABASE_SETUP_GUIDE.md` - Database setup
- `README.md` - Project overview
- `scripts/` - SQL migration scripts

---

## Success! 🎉

Your UniSync application is now live and ready for SDU students!

**Live URL:** https://unisync-sdu.vercel.app (or your custom domain)

**Admin Access:** `adminsync17@gmail.com`

**Student Access:** Any `@sdu.edu.kz` email

**Guest Access:** Click "Google" button on homepage

---

*Built with ❤️ for SDU University*

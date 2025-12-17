# UniSync - SDU University Student Portal

A comprehensive web platform for SDU University students featuring Lost & Found, Room Finder, Campus Feed, and academic management tools.

## Features

### For Students
- **Lost & Found System** - Report and find lost items with categories and image uploads
- **Room Finder** - Check room availability across campus blocks (D-I) with real-time schedules
- **Campus Feed** - View university announcements and updates
- **Academic Tools** - Access grades, attendance, and homework (SDU students only)
- **Dark/Light Mode** - Toggle theme across all pages

### For Administrators
- **Admin Dashboard** - Manage all platform features from one place
- **Lost & Found Management** - Review, delete, or mark items as returned
- **Room Schedule Management** - Set availability for all rooms by block, day, and time slot
- **Announcements** - Create and publish campus-wide announcements
- **Statistics Overview** - View platform usage metrics

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Styling:** Tailwind CSS + Custom CSS Variables
- **Backend:** Supabase (PostgreSQL + Authentication)
- **Hosting:** Vercel
- **Real-time:** Supabase Real-time subscriptions

## Quick Start

### Prerequisites
- Supabase account with a project
- Node.js (for local development)

### Installation

1. Clone the repository or download from v0
2. Run SQL scripts in Supabase (see DEPLOYMENT_GUIDE.md)
3. Configure environment variables
4. Deploy to Vercel

See **DEPLOYMENT_GUIDE.md** for detailed setup instructions.

## Project Structure

```
unisync/
├── index.html              # Login/Registration page
├── home.html               # Student dashboard
├── admin-login.html        # Admin authentication
├── admin.html              # Admin dashboard
├── lostfound.html          # Lost & Found interface
├── roomfinder.html         # Room availability finder
├── feed.html               # Campus announcements feed
├── grades.html             # Student grades (SDU only)
├── attendance.html         # Attendance tracking (SDU only)
├── homework.html           # Homework assignments (SDU only)
├── lib/
│   └── supabase.js         # Supabase client & utilities
├── scripts/
│   ├── 001_create_tables.sql           # Database schema
│   ├── 002_create_profile_trigger.sql  # Auto-profile creation
│   └── 003_seed_rooms.sql              # Room data seeding
└── DEPLOYMENT_GUIDE.md     # Deployment instructions
```

## Authentication

### Student Access
- Email ending with `@sdu.edu.kz`
- Access to all features including grades, attendance, homework

### Guest Access
- Any other email address
- Access to Lost & Found, Room Finder, and Campus Feed only

### Admin Access
- Email: `adminsync17@gmail.com`
- Full administrative privileges
- Access to admin dashboard at `/admin-login.html`

## Database Schema

### Tables
- **profiles** - User information and roles
- **announcements** - Campus-wide announcements
- **lost_found_items** - Lost and found item reports
- **rooms** - Campus room information
- **room_schedules** - Room availability by time slot

All tables include Row Level Security (RLS) policies for data protection.

## Development

### Local Development
1. Serve files with any static server:
   ```bash
   npx serve .
   ```
2. Open `http://localhost:3000` in your browser

### Environment Variables
Required in Vercel/Production:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Room Schedule System

Rooms operate on 50-minute time slots:
- Start: 8:30 AM
- End: 5:20 PM
- Days: Monday - Saturday
- Blocks: D, E, F, G, H, I
- Rooms per block: 101-304 (3 floors)

## Contributing

This is a university project. For bugs or feature requests, contact the development team.

## License

© 2025 SDU University. All rights reserved.

## Contact

For support or inquiries:
- Admin: adminsync17@gmail.com
- University: SDU Kaskelen Campus

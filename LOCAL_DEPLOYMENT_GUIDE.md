# UniSync Local Deployment Guide

This guide will help you run UniSync locally without any external dependencies or database services.

## Quick Start

### Option 1: Simple HTTP Server (Recommended)

1. **Using Python (if installed)**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **Using Node.js (if installed)**:
   ```bash
   # Install http-server globally
   npm install -g http-server
   
   # Run the server
   http-server -p 8000
   ```

3. **Using PHP (if installed)**:
   ```bash
   php -S localhost:8000
   ```

4. Open your browser and visit: `http://localhost:8000`

### Option 2: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Double-Click (May have limitations)

Simply double-click `index.html` to open it in your browser. Note: Some features may not work due to CORS restrictions.

## Features

All features work locally using localStorage:

### User Authentication
- **SDU Students**: Any email ending with `@sdu.edu.kz` + password (6+ characters)
- **Admin Access**: `adminsync17@gmail.com` + any password (6+ characters)
- **Guest Access**: Click "Google" button for limited access

### Available Features
- **Lost & Found**: Report and search for lost items (with categories and image upload)
- **Room Finder**: View room availability by block (D-I), with weekly schedules
- **Campus Feed**: View and post campus announcements
- **Admin Dashboard** (for admins only):
  - Manage Lost & Found items
  - Edit room schedules
  - Post/delete announcements
  - View statistics

### Student-Only Features
Available only to @sdu.edu.kz accounts:
- Grades
- Attendance  
- Homework

## Data Storage

All data is stored in your browser's localStorage:
- `unisync_users` - User accounts
- `unisync_lostfound` - Lost & Found items
- `unisync_rooms` - Room information
- `unisync_schedules` - Room schedules
- `unisync_announcements` - Campus announcements

### Reset Data

To reset all data, open browser console (F12) and run:
```javascript
localStorage.clear()
location.reload()
```

## Default Credentials

### Admin Access
- Email: `adminsync17@gmail.com`
- Password: Any 6+ characters (e.g., `password123`)

### Student Access
- Email: Any email ending with `@sdu.edu.kz` (e.g., `john.doe@sdu.edu.kz`)
- Password: Any 6+ characters

### Guest Access
- Click the "Google" button on login page

## Browser Compatibility

Works best on modern browsers:
- Chrome/Edge (Recommended)
- Firefox
- Safari

## Troubleshooting

### Issue: White screen or errors
**Solution**: Make sure you're running a local server (not just opening the file directly)

### Issue: Data not saving
**Solution**: Check if localStorage is enabled in your browser settings

### Issue: Images not loading
**Solution**: Images are stored as Base64 in localStorage. Large images may cause storage limits.

### Issue: "CORS" errors in console
**Solution**: Use a local server instead of opening files directly

## Project Structure

```
unisync/
├── index.html              # Login page
├── home.html              # Dashboard
├── lostfound.html         # Lost & Found
├── roomfinder.html        # Room Finder
├── feed.html              # Campus Feed
├── admin-login.html       # Admin login
├── admin.html             # Admin dashboard
├── grades.html            # Student grades
├── attendance.html        # Student attendance
├── homework.html          # Student homework
└── lib/
    └── supabase-local.js  # Local storage implementation
```

## Next Steps

1. **Start the server** using one of the methods above
2. **Open your browser** to `http://localhost:8000`
3. **Login** with any @sdu.edu.kz email or use admin/guest access
4. **Explore** all features!

## Need Help?

All data is stored locally in your browser. No internet connection or external services are required.

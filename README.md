# Mediconnect Admin - Frontend UI

A modern, responsive React + TypeScript admin panel for managing clinic operations.

## Features

✅ **Dashboard** - Overview with statistics and recent data
✅ **Doctors Management** - View, search doctors with specializations
✅ **Appointments** - Schedule and manage appointments with status tracking
✅ **Reviews** - Display and manage patient reviews with ratings
✅ **Analytics** - Charts and performance metrics using Recharts
✅ **Settings** - Clinic configuration and preferences
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Modern UI** - Clean, professional interface with smooth animations

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── Sidebar.css
│   │   ├── Header.tsx       # Top header bar
│   │   └── Header.css
│   ├── pages/
│   │   ├── Dashboard.tsx    # Dashboard page
│   │   ├── Dashboard.css
│   │   ├── Doctors.tsx      # Doctors management
│   │   ├── Appointments.tsx # Appointments management
│   │   ├── Reviews.tsx      # Reviews management
│   │   ├── Analytics.tsx    # Analytics with charts
│   │   ├── Settings.tsx     # Settings page
│   │   └── Pages.css        # Common page styles
│   ├── styles/
│   │   └── index.css        # Global styles
│   ├── App.tsx              # Main app component
│   ├── App.css              # App layout styles
│   └── main.tsx             # React entry point
├── index.html               # HTML entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **React Router** - Navigation
- **React Icons** - Icon library
- **Recharts** - Data visualization

## Installation & Setup

### Prerequisites
- Node.js v16+ installed
- npm or yarn package manager

### Quick Start

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Pages Overview

### 1. Dashboard
- Statistics cards (Doctors, Appointments, Reviews, Patients)
- Recent appointments table
- Top doctors list with ratings

### 2. Doctors Management
- Search doctors by name or specialization
- View doctor details (experience, phone, specialization)
- Add/Edit/Delete buttons (UI ready for integration)

### 3. Appointments Management
- List all appointments with status
- Search by doctor or patient name
- Status badges (Scheduled, Completed, Cancelled)
- Add/Edit/Delete options

### 4. Reviews Management
- Card-based review display
- Star ratings (1-5 stars)
- Search by doctor or patient
- Delete review option
- Show review dates and comments

### 5. Analytics
- Appointment trend chart (line chart)
- Doctor performance chart (bar chart)
- Sample data included

### 6. Settings
- Clinic information form
- Email, phone, address settings
- Timezone and language preferences
- Save/Reset functionality

## Navigation

**Sidebar Menu Items:**
- 🏠 Dashboard
- 👨‍⚕️ Doctors
- 📅 Appointments
- ⭐ Reviews
- 📊 Analytics
- ⚙️ Settings
- 🚪 Logout button

## Styling Features

### Color Scheme
- Primary: `#0066cc` (Blue)
- Success: `#28a745` (Green)
- Danger: `#dc3545` (Red)
- Warning: `#ffc107` (Yellow)
- Info: `#17a2b8` (Cyan)

### Components
- **Cards** - White background with subtle shadows
- **Buttons** - Multiple variants (primary, secondary, info, danger)
- **Tables** - Striped rows with hover effects
- **Badges** - Status indicators with color coding
- **Forms** - Clean input fields with focus states
- **Charts** - Responsive chart containers

## Responsive Design

- **Desktop** (1200px+) - Full layout with sidebars
- **Tablet** (768px - 1199px) - Optimized spacing
- **Mobile** (<768px) - Stacked layout, responsive tables

## How to Customize

### Change Colors
Edit `:root` variables in `src/styles/index.css`:
```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  /* ... other colors */
}
```

### Add New Pages
1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add menu item in `src/components/Sidebar.tsx`

### Modify Sidebar
Edit `src/components/Sidebar.tsx` to:
- Change colors/gradients
- Add/remove menu items
- Customize styling

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

This is a **UI-only version** with:
- Mock data for demonstration
- No backend API integration yet
- Sample data in all pages
- Ready for API integration

## Next Steps

To connect to a backend:
1. Create API service layer
2. Replace mock data with API calls
3. Add authentication/login
4. Implement form submissions
5. Add error handling

## License

ISC

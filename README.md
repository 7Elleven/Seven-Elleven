# SevenElleven - Football Entertainment Website

A modern, responsive React.js website for SevenElleven, an entertainment company specializing in football events, tournaments, fan experiences, and live match activations.

## 🚀 Features

- **Modern Design**: Dark blue color palette with premium, sporty aesthetics
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Engaging hover effects and transitions
- **SEO-Friendly**: Clean structure and semantic HTML
- **Reusable Components**: Modular component architecture

## 📋 Pages & Sections

- **Homepage**: Hero section, featured events, why choose us, and CTA
- **About**: Company story, mission, vision, and team
- **Events**: Upcoming and past events with filtering
- **Gallery**: Event highlights and photo gallery with categories
- **Contact**: Contact form and social media links

## 🛠️ Tech Stack

- **React.js** (v18.2.0) - Functional components with hooks
- **React Router** (v6.20.0) - Client-side routing
- **Tailwind CSS** (v3.3.6) - Utility-first CSS framework
- **Firebase** (v10.7.1) - Firestore database for experiences data
- **React Scripts** - Build tooling

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Firebase:
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=sevenelleven-8f512
   REACT_APP_FIREBASE_STORAGE_BUCKET=sevenelleven-8f512.firebasestorage.app
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

3. Start the development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## 🎨 Design System

### Colors
- **Primary Dark Blue**: `#0a1628`
- **Accent Blue**: `#3b82f6`
- **Light Blue**: `#60a5fa`
- **Neon Blue**: `#00d4ff`

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)

## 📁 Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.js
│   ├── Footer.js
│   └── EventCard.js
├── pages/           # Page components
│   ├── Home.js
│   ├── About.js
│   ├── Events.js
│   ├── Gallery.js
│   └── Contact.js
├── App.js           # Main app component with routing
├── index.js         # Entry point
└── index.css        # Global styles and Tailwind imports
```

## 🎯 Key Features

- **Event Filtering**: Filter events by status (upcoming, past, all)
- **Gallery Categories**: Filter gallery images by category
- **Contact Form**: Functional contact form with validation
- **Responsive Navigation**: Mobile-friendly hamburger menu
- **Smooth Scrolling**: Enhanced user experience
- **Custom Animations**: Float, pulse, and hover effects

## 🔧 Customization

### Adding New Events
Edit the `allEvents` array in `src/pages/Events.js`:

```javascript
{
  id: 10,
  title: 'Your Event Title',
  description: 'Event description',
  date: 'Date',
  location: 'Location',
  status: 'upcoming',
  featured: false,
  attendees: 'Number',
}
```

### Modifying Colors
Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  'dark-blue': '#your-color',
  // ... other colors
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is created for SevenElleven entertainment company.

## 👥 Credits

Built with ❤️ for football fans worldwide.


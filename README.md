# EMA

[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-API-black?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge)](https://clerk.com/)
[![Inngest](https://img.shields.io/badge/Inngest-Workflows-black?style=for-the-badge)](https://www.inngest.com/)
[![ImageKit](https://img.shields.io/badge/ImageKit-Media_Storage-2F6FED?style=for-the-badge)](https://imagekit.io/)

> A full-stack social networking platform focused on creating a calmer, more intentional space for people to connect, share, and express themselves without the overstimulation of traditional social apps.

---
*Work In Progress*

## Tech Stack

### Frontend
- JavaScript
- React
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Clerk Authentication
- Inngest (event-driven user sync workflows)
- ImageKit (media storage pipeline in progress)

---

## Engineering Progress

### Frontend
Implemented core product flows and reusable UI components:
- Authentication / Login page
- Feed with stories and posts
- Messages and chat interface
- Connections page
- Discover page
- User profile page
- Edit profile modal
- Create story modal
- Create post flow
- Responsive layout across major screens

Frontend architecture includes:
- React Router nested routing
- reusable component system (Sidebar, StoriesBar, PostCard, modals)
- local state management with React hooks
- Tailwind-based design system
- accessibility and calmer visual design refinements

### Backend
Built backend foundations for scalable social features:
- Express server setup with modular structure
- MongoDB database connection and schema modeling
- User model with profile, social graph, and media fields
- Clerk authentication integration
- Inngest workflows for Clerk user creation / update / deletion sync
- profile update controller logic
- file upload middleware setup
- ImageKit SDK integration setup for media uploads (in progress)

Backend architecture includes:
- REST API controller pattern
- modular route structure
- async database operations with Mongoose
- third-party service integration
- environment variable / config management

---

## Currently Working On
- Connecting ImageKit for image storage
- Connecting backend and frontend with live API data
- Adding message notifications on the website
- Deploying the project online
- Changing the way authentication works and creating the concept of different communities

---

## User Interface Preview

### 1. Log In page
<img width="3456" height="1926" alt="image" src="https://github.com/user-attachments/assets/1dae850c-67d8-4464-9c1f-b28adc2373cc" />

### 2. Feed
<img width="3456" height="1926" alt="image" src="https://github.com/user-attachments/assets/796036dd-b927-4613-b80d-f83170b6e674" />

### 3. Messages
<img width="3456" height="1928" alt="image" src="https://github.com/user-attachments/assets/20b5d431-6ee6-4323-97f8-0dadd09cd2fc" />

### 4. Connections
<img width="3456" height="1926" alt="image" src="https://github.com/user-attachments/assets/840b5909-4b38-4300-8dca-a54a599eed7e" />

### 5. Discover
<img width="3456" height="1928" alt="image" src="https://github.com/user-attachments/assets/69f5eecd-473c-42c4-83b4-c3ba09e728bc" />

### 6. Profile
<img width="3456" height="1930" alt="image" src="https://github.com/user-attachments/assets/83363ec4-026b-4394-9575-057ce943b7e1" />

### 7. Edit Profile Modal
<img width="3456" height="1924" alt="image" src="https://github.com/user-attachments/assets/7503633e-f9d5-4ead-92df-46379263e83d" />

### 8. Create Story Modal
<img width="3456" height="1922" alt="image" src="https://github.com/user-attachments/assets/1b5598e2-57ed-4ae4-b701-6f8ae599aab4" />

### 9. Create Post
<img width="3456" height="1926" alt="image" src="https://github.com/user-attachments/assets/9a420549-a007-40e0-890c-3b34ec28fa33" />

### 10. Messaging
<img width="3456" height="1926" alt="image" src="https://github.com/user-attachments/assets/3e39fcf1-e68f-47d7-b22c-b6f5e5fffea6" />

---

## Acknowledgments

This project was initially inspired by a tutorial by [GreatStack Channel](https://www.youtube.com/watch?v=7oKFzriZt0A).

I used the tutorial as a starting point for the core social app structure for:

- frontend with JavaScript, React, Vite, and Tailwind CSS
- backend with Clerk authentication, Express, MongoDB, Inngest, and ImageKit

  then I independently:
- customizing the UI/UX and visual design system
- redesigning the color palette and accessibility choices
- implementing profile editing and media upload flows
- debugging and adapting several parts of backend logic to work with updated SDKs and APIs

The project reflects both the learning foundation from the tutorial and my own product/design decisions and engineering work.

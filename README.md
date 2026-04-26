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
*Debugging authentication issue that is involved with the latest change of frontend apr 25 2026*

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
- Changing the way authentication works and creating the concept of different communities
- Tighten app security
  
---

## User Interface Preview

### 1. Log In page
<img width="3456" height="1926" alt="image" src="https://github.com/user-attachments/assets/2636167f-2d77-407e-b8cc-4eb908c8e35d" />

### 2. Feed
<img width="3454" height="1926" alt="image" src="https://github.com/user-attachments/assets/d8d1562c-af88-467f-bd73-cdb71abc17c9" />

### 3. Messages
<img width="1728" height="963" alt="image" src="https://github.com/user-attachments/assets/8091ca92-8e43-4a52-b94e-9f7233c335b5" />

### 4. Connections
<img width="1728" height="963" alt="image" src="https://github.com/user-attachments/assets/dff70135-c67b-4136-ab97-ed4320d5e4b4" />

### 5. Discover
<img width="1728" height="965" alt="image" src="https://github.com/user-attachments/assets/ca47c1f8-608e-4234-b8a6-4dcfe350130e" />

### 6. Profile
<img width="3456" height="1928" alt="image" src="https://github.com/user-attachments/assets/996aabd0-0b8b-44c3-9c85-a3cfeceb8dc5" />

### 7. Edit Profile Modal
<img width="3456" height="1924" alt="image" src="https://github.com/user-attachments/assets/77301cd9-1908-468e-81ca-003c88687158" />

### 8. Create Story Modal
<img width="3456" height="1924" alt="image" src="https://github.com/user-attachments/assets/94f6f877-9b8e-4078-bab7-0304dcde52b3" />

### 9. Create Post
<img width="3456" height="1926" alt="image" src="https://github.com/user-attachments/assets/6179b99e-6479-4f51-9698-361d7c849333" />

### 10. Messaging
<img width="1728" height="964" alt="image" src="https://github.com/user-attachments/assets/6f9e0ed6-80e9-43d9-829e-ba7c1b89c482" />

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

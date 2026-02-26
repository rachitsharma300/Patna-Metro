# 🏗️ Patna Metro System Architecture & Workflow

This document provides a comprehensive breakdown of the **Patna Metro Route Finder** ecosystem, covering the interaction between the Frontend, Backend, Database, and Mobile Application.

---

## 🛰️ 1. High-Level Architecture
The system follows a modern **Decoupled Architecture**:
- **Frontend**: React-based Single Page Application (SPA) deployed on **Netlify**.
- **Backend**: Java Spring Boot Microservice deployed on **Render** (via Docker).
- **Database**: MongoDB Atlas (Cloud) for persistence.
- **Mobile**: Android Application interacting with the same centralized Backend APIs.

---

## ⚙️ 2. Tech Stack & Integration

### **Backend (The Core Engine)**
- **Framework**: Spring Boot 3.5.3 (Java 21).
- **Database**: MongoDB (NoSQL) – Chosen for flexible schema to handle station metadata and future corridor expansions.
- **Caching**: **Spring Cache** – Station data and frequent routes are cached in-memory to reduce DB hits and provide sub-100ms responses.
- **Algorithm**: 
  - **Route Finding**: Custom BFS-based logic handles both same-line journeys and complex **Interchanges** (switching between Blue and Red lines).
  - **Distance**: Haversine Formula for precise geolocation-aware distance gap analysis.
- **Security**: CORS configuration to allow secure requests only from valid frontend domains.

### **Frontend (The User Interface)**
- **Framework**: React 18 with **Vite** for optimized builds.
- **Styling**: Vanilla CSS & **Tailwind CSS** for a premium, responsive glassmorphic UI.
- **Visuals**: Framer Motion for smooth transitions (e.g., the animated train on the Home screen).
- **Localization**: `react-i18next` provides seamless context-aware switching between **English** and **Hindi**.
- **Network**: `Axios` with a centralized `api.js` service for fetching real-time data from the Render backend.

---

## 🔄 3. Interaction Workflow

### **Scenario: User searches for a route**
1. **Frontend**: User selects "Source" and "Destination" in `RouteFinder.jsx`.
2. **API Call**: Frontend triggers three parallel requests (`Promise.all`) to the backend:
   - `GET /stations/route?source=...&destination=...` (The path)
   - `GET /fare?stations=...` (The cost)
   - `GET /estimated-time?stations=...` (The duration)
3. **Backend Logic**:
   - `RouteFinderService` checks if an interchange is needed.
   - If yes, it calculates the shortest path from Source $\rightarrow$ Interchange $\rightarrow$ Destination.
   - `FareService` calculates the price based on station slabs (₹15, ₹20, ₹25, ₹30).
4. **Response**: Backend sends JSON back. Frontend maps the stations and displays the **Interchange Badge** if a line switch is detected.

---

## 🤖 4. AI Bot Workflow (Voice & Slang Support)
The Bot is the most advanced feature, designed to handle native Bihar dialects.
1. **Voice Input**: User speaks (e.g., "Patna Junction se Zero Mile jaana hai").
2. **Station Matcher (Fuzzy Logic)**: A utility script on the frontend cleans the input and matches spoken names to official station IDs even if the pronunciation is slightly off.
3. **Backend Integration**: The bot hits `/api/bot/voice-route` which returns a structured "Hindi Voice Script".
4. **Humanized Response**: The bot doesn't just show text; it announces the route in a natural, helpful tone.

---

## 📱 5. Mobile App Workflow
The Android app is built to be a fast, on-the-go version of the website.
- **Interaction**: It uses `React Native` or `Webview Wrapper` logic to communicate with the **same production backend**.
- **Offline Context**: Frequently used stations are stored locally for instant suggestions.
- **Sync**: Any station addition or fare update in the MongoDB database reflects instantly on both the Web and Mobile app without requiring an app update.

---

## 🚀 6. Deployment & Dev-Ops
- **Dockerization**: The Backend is containerized using a multi-stage `Dockerfile`.
  - *Stage 1*: Build using Maven.
  - *Stage 2*: Run using OpenJDK.
- **Render (Backend)**: Automatically pulls the GitHub repo, builds the Docker image, and hosts the API.
- **Netlify (Frontend)**: Handles high-performance CDN delivery and SSL for the React application.
- **Environment Management**: `.env` files manage different URLs for Local (localhost) vs Production (Render URL).

---

## 📈 7. Performance Optimizations
To achieve high Lighthouse scores (90+), we implemented:
- **SVG over PNG**: All icons and logos are SVG to minimize payload.
- **WebP Images**: All static banners are in `.webp` format (~80% smaller than JPG).
- **Lazy Loading**: Components and images load only when they enter the viewport.
- **Video Preloading**: `preload="metadata"` ensures the 2.8MB banner video doesn't block the initial page render.

---

*This project is a perfect blend of high-performance Java Backend and a fluid React Frontend, built to serve millions of commuters in Patna.*

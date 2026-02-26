# Contributing to Patna Metro Route Finder 🚇

Thank you for your interest in contributing to the **Patna Metro Route Finder** project! We welcome contributions from developers of all skill levels to help make commuting in Patna easier and more efficient.

This document provides guidelines and essential details to help you get started.

---

## 🌟 Project Overview
Patna Metro Route Finder is a comprehensive ecosystem consisting of:
- **Frontend**: A performance-optimized React application.
- **Backend**: A robust Java Spring Boot API.
- **Database**: MongoDB Atlas for real-time station and route management.
- **Mobile**: A React Native/Android application for on-the-go access.

---

## 🛠️ Essential Project Details

### **1. Backend (Java Spring Boot)**
- **Source Folder**: `patna-metro`
- **Tech Stack**: Java 21, Spring Boot 3.5.3, Maven.
- **Main API Endpoints**:
  - `GET /api/stations`: List all stations.
  - `GET /api/stations/route`: Find shortest path.
  - `GET /api/fare`: Calculate journey cost.
  - `GET /api/estimated-time`: Estimated travel duration.
  - `POST /api/bot/voice-route`: AI Bot integration.
- **Deployment**: Hosted as a Docker container on **Render**.
- **Live API Base**: `https://backend.patnametromap.in/api` (Verify via project configurations).

### **2. Frontend (React)**
- **Source Folder**: `Patna Metro_Frontend`
- **Tech Stack**: React 18, Vite, Tailwind CSS, Framer Motion.
- **Official Domain**: [patnametromap.in](https://patnametromap.in)
- **Base API URL**: Configurable via `VITE_API_BASE_URL` in environment variables.
- **Deployment**: Hosted on **Netlify**.

### **3. Database**
- **Type**: MongoDB
- **Cloud Provider**: MongoDB Atlas.
- **Local Dev**: Ensure MongoDB is running on `mongodb://localhost:27017/patnametro`.

---

## 🚀 Getting Started

### **Prerequisites**
- **Java**: JDK 21 or higher.
- **Node.js**: v18 or higher.
- **MongoDB**: Local installation or an Atlas URI.
- **Git**: For version control.

### **Setup Instructions**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/rachitsharma300/Patna-Metro.git
   cd Patna-Metro
   ```

2. **Backend Setup**:
   ```bash
   cd patna-metro
   # Update src/main/resources/application.properties with your MongoDB URI
   mvn install
   mvn spring-boot:run
   ```

3. **Frontend Setup**:
   ```bash
   cd Patna Metro_Frontend
   npm install
   # Create a .env file with VITE_API_BASE_URL=http://localhost:8080/api
   npm run dev
   ```

---

## 🤝 How to Contribute

### **Reporting Bugs**
- Check the [Issues](https://github.com/rachitsharma300/Patna-Metro/issues) tab to see if the bug has already been reported.
- If not, create a new issue with a clear title, description, and steps to reproduce.

### **Suggesting Features**
- Open an issue with the "feature request" tag.
- Explain why the feature is needed and how it would benefit users.

### **Submission Process**
1. **Fork** the repository.
2. **Create a Branch**: `git checkout -b feature/your-feature-name` or `bugfix/issue-id`.
3. **Commit Changes**: Use descriptive commit messages (e.g., `feat: add support for local language bot responses`).
4. **Push to GitHub**: `git push origin feature/your-feature-name`.
5. **Open a Pull Request**: Provide a detailed description of your changes and link any related issues.

---

## 🎨 Coding Standards
- **Clean Code**: Follow standard Java and JavaScript naming conventions.
- **Documentation**: Add comments for complex logic and update `README.md` if adding new features.
- **Localization**: When adding text to the frontend, update both `src/locales/en.json` and `src/locales/hi.json`.
- **UI/UX**: Maintain the glassmorphic, premium aesthetic using Tailwind CSS and Framer Motion.

---

##  Need Help?
If you have any questions or need access to specific backend credentials (like MongoDB Atlas), please reach out via GitHub Issues or contact the project maintainer.

Happy Coding! 🚇✨

# 🚔 PPIS: Police Patrol & Incident System

PPIS is a modern, full-stack web application designed for law enforcement and emergency response agencies. It provides a real-time command dashboard for tracking officer locations, managing patrol routes, and automating emergency dispatch using live geospatial data.

## ✨ Core Features
* **Live Dispatch Map:** Real-time geospatial mapping utilizing Leaflet and OSRM (Open Source Routing Machine) to calculate the shortest driving routes to incidents.
* **Automated Escalation:** System automatically calculates the distance between an officer and an incident, triggering local backup alerts if the officer is outside the maximum response radius.
* **Dashboard Analytics:** High-level overview of active officers, patrol logs, and QR-based checkpoint scans.
* **Role-Based Access:** Secure login and routing system (currently configured for Admin/Command Center view).

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, React-Leaflet (Maps), Axios
* **Backend:** Node.js, Express.js (REST API & Socket.io ready)
* **Routing Engine:** OSRM Public API
* **Styling:** Custom CSS with Glassmorphism/Dark UI elements

## 📂 Project Structure
This repository is organized as a monorepo containing both the frontend and backend codebases:
```text
PPIS/
├── frontend/       # React application (Vite)
├── backend/        # Node.js/Express API server
├── .gitignore
└── README.md

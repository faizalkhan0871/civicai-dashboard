# CivicAI

CivicAI is an AI-powered civic complaint management platform designed to help administrators monitor, analyze, prioritize, and resolve public grievances through a centralized dashboard.

The platform combines complaint management, analytics, AI-assisted analysis, multilingual interaction, and live monitoring in a modern full-stack application.

## Live Demo

- Frontend: https://civicai-dashboard.vercel.app
- Backend API: https://civicai-backend-ufkc.onrender.com

> Note: The backend is hosted on Render's free tier, so the first request may take some time if the service is inactive.

## Key Features

- Secure user registration and login
- JWT-based authentication
- Create, view, update, and delete civic complaints
- Complaint status and priority tracking
- Dashboard statistics and analytics
- AI-powered complaint analysis using Gemini
- Multilingual CivicAI Copilot
- Live complaint monitoring
- Complaint filtering and search
- Export reports
- Responsive dark-themed dashboard
- MongoDB-based persistent data storage

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### AI Integration

- Google Gemini API
- Multilingual AI Copilot
- AI-assisted complaint analysis

### Deployment

- Vercel for frontend deployment
- Render for backend deployment
- MongoDB Atlas for cloud database

## Project Architecture

```text
CivicAI
│
├── Frontend
│   ├── Next.js
│   ├── TypeScript
│   ├── Tailwind CSS
│   └── Axios
│
├── Backend
│   ├── Node.js
│   ├── Express.js
│   ├── MongoDB
│   └── JWT Authentication
│
└── AI Layer
    ├── Gemini API
    ├── Complaint Analysis
    └── Multilingual Copilot
# CareBridge

A full-stack customer service management platform with admin dashboard and user interface.

## Structure

```
careBridge/
├── backend/         # Node.js API server
├── frontend/admin/ # Admin dashboard (React + Vite)
├── frontend/ui/    # User interface (React + Vite)
└── careBridge.sql  # Database schema
```

## Quick Start

### Backend

```
bash
cd backend
npm install
npm start
```

### Frontend (Admin)

```
bash
cd frontend/admin
npm install
npm run dev
```

### Frontend (UI)

```
bash
cd frontend/ui
npm install
npm run dev
```

## Tech Stack

- **Backend:** Node.js, Express, MySQL
- **Frontend:** React, Vite, React Router
- **Database:** MySQL

## Single Repo

This project uses a monorepo structure (all code in one repository).

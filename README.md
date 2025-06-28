# Kareer

Kareer is a full-stack job portal web application that connects job seekers with employers. It features resume analysis, job matching, user authentication, and company dashboards, providing a seamless experience for both applicants and recruiters.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

- **User Authentication:** Secure signup and login for job seekers and companies (JWT-based).
- **Resume Analysis:** Upload resumes (PDF/DOCX) and extract skills for better job matching using built-in parsers.
- **Job Matching:** Intelligent job recommendations based on extracted skills from resumes.
- **Job Listings:** Browse, create, and manage job postings as a company or user.
- **Application Management:** Apply to jobs, track applications, and manage applicant data.
- **Profile Management:** Update user and company profiles, including profile pictures and resumes.
- **Company Dashboard:** Manage job postings and view applicants in a dedicated dashboard.
- **Modern UI:** Responsive frontend built with React and Vite for a seamless user experience.

---

## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose ODM)
- **File Uploads:** Multer, Cloudinary
- **Resume Parsing:** PDF and DOCX parsing utilities

---

## Project Structure

```
backend/
  controllers/         # Route controllers for API
  middlewares/         # Express middlewares (auth, uploads)
  models/              # Mongoose models (User, Job, Application)
  routes/              # API routes
  utils/               # Utility functions (resume parsing, job matching)
  uploads/             # Uploaded files (profile pictures, resumes)
  config/              # Configuration files (DB, Cloudinary, Multer)
  server.js            # Entry point for backend
frontend/
  src/
    components/        # Reusable React components
    pages/             # Page components (Home, Login, Signup, Dashboard, etc.)
    routes/            # Route definitions
    store/             # Redux store, actions, reducers
    utils/             # Frontend utilities (axios, hooks)
  public/              # Static assets (fonts, images, PDFs)
  index.html           # Main HTML file
  vite.config.js       # Vite configuration
```

---

## Getting Started

### Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- **MongoDB** (local or cloud, e.g., MongoDB Atlas)
- **Cloudinary** account for image and file uploads

---

### Backend Setup
1. **Navigate to the backend folder:**
   ```sh
   cd backend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the `backend` directory with the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     PORT=5000
     ```
4. **Start the backend server:**
   ```sh
   npm start
   ```
   The backend will run on `http://localhost:5000` by default.

---

### Frontend Setup
1. **Navigate to the frontend folder:**
   ```sh
   cd frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the frontend development server:**
   ```sh
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` by default.

---

## Environment Variables

- **Backend:**
  - `MONGODB_URI`: MongoDB connection string
  - `JWT_SECRET`: Secret for JWT authentication
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Cloudinary credentials
  - `PORT`: Port for backend server (default: 5000)
- **Frontend:**
  - If you need to connect to a custom backend URL, set `VITE_API_URL` in a `.env` file in the `frontend` directory.

---

## API Overview

- **Base URL:** `/api`
- **Main Endpoints:**
  - `POST /api/auth/register` — Register a new user or company
  - `POST /api/auth/login` — Login
  - `GET /api/jobs` — List all jobs
  - `POST /api/jobs` — Create a new job (company only)
  - `GET /api/profile` — Get user/company profile
  - `PATCH /api/profile` — Update profile
  - `POST /api/applications` — Apply to a job
  - `GET /api/applications` — List user/company applications
  - `POST /api/analyze` — Analyze uploaded resume

> For more details, see the route files in `backend/routes/`.

---

## Usage

- **Frontend & Backend (Production):** Hosted together at: [https://kareer.onrender.com](https://kareer.onrender.com)
- **API Example:**
  - `https://kareer.onrender.com/api/jobs`
- **Local Development:**
  - Frontend: `http://localhost:5173`
  - Backend: `http://localhost:4000`

---

## Troubleshooting

- **CORS Issues:**
  - Make sure the backend allows requests from the frontend origin in development.
- **Database Connection Errors:**
  - Check your `MONGODB_URI` and ensure MongoDB is running.
- **Cloudinary Upload Errors:**
  - Verify your Cloudinary credentials in `.env`.
- **Port Conflicts:**
  - Change the `PORT` variable if 4000 is in use.

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)

---

## Acknowledgements
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [Cloudinary](https://cloudinary.com/)
- [Multer](https://github.com/expressjs/multer)

# HRMS Dashboard

A full-stack Human Resource Management System (HRMS) dashboard built with React.js and Node.js.

This README provides an overview of the project's features, architecture, setup instructions, and licensing. Feel free to customize it further based on your specific needs!

## Features

- **Authentication**
  - User registration and login
  - JWT-based authentication
  - Protected routes

- **Candidate Management**
  - Add new candidates
  - Upload and store resumes
  - Track candidate status
  - Search and filter candidates

- **Employee Management**
  - Convert candidates to employees
  - Edit employee details
  - Search and filter employees
  - Delete employees

- **Attendance Management**
  - Mark daily attendance
  - Track attendance history
  - Filter attendance records
  - Task assignments

- **Leave Management**
  - Apply for leaves
  - Upload supporting documents
  - Leave approval workflow
  - Calendar view for approved leaves

## Tech Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- React Router v6
- Axios (HTTP Client)
- React Hook Form
- CSS Modules

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Multer (File Upload)
- Cloudinary (File Storage)
- Joi (Validation)

## Project Structure
├── client/                    # Frontend React application
│   ├── public/                # Public assets (favicon, index.html, etc.)
│   └── src/                   # Source files
│       ├── assets/            # Images, icons, and other static files
│       ├── components/        # Reusable UI components
│       ├── pages/             # Page components
│       ├── redux/             # Redux store and slices
│       ├── services/          # API service layer (e.g., Axios calls)
│       └── utils/             # Utility/helper functions
│
├── server/                    # Backend Node.js application
│   ├── configs/               # Configuration files (e.g., DB, environment)
│   ├── controllers/           # Route controllers
│   ├── middlewares/           # Custom middleware functions
│   ├── models/                # Mongoose models for MongoDB
│   ├── routes/                # Express route definitions
│   ├── utils/                 # Utility/helper functions
│   └── validators/            # Request validators (e.g., Joi, express-validator)


## Getting Started

1. Clone the repository
2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:
```env
PORT=5000
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=HRMS_DASHBOARD
```

4. Start the application:
```bash
# Start client (from client directory)
npm run dev

# Start server (from server directory)
npm start
```

## Optimizations

### Frontend Optimizations
- **Debounced Search**
  - Implemented search debouncing using [`debounce`](client/src/utils/optimizers.js) utility to reduce API calls
  - 500ms delay for search input to minimize server requests

- **Pagination & Infinite Scroll**
  - Implemented lazy loading with pagination
  - Only fetches data when needed to reduce initial load time
  - Uses Redux state management for efficient data caching

- **Image Optimizations**
  - Using Cloudinary for image resizing and optimization
  - Automatic image format selection based on browser support
  - Lazy loading for images using native `loading="lazy"` attribute

### Backend Optimizations
- **Database Queries**
  - Implemented pagination with MongoDB
  - Optimized search queries using indexes
  - Selective field projection to minimize data transfer

- **File Uploads**
  - Stream-based file uploads to Cloudinary
  - File size validation and compression before upload
  - Parallel upload processing for multiple files

- **API Response**
  - Compressed responses using gzip
  - Proper error handling and status codes
  - Cached responses where appropriate

### Performance Features
- **State Management**
  - Centralized Redux store with optimized slices
  - Minimized re-renders using proper memoization
  - Efficient updates using normalized state structure

- **Caching Strategy**
  - Browser caching for static assets
  - API response caching where applicable
  - Local storage for user preferences

- **Code Splitting**
  - Route-based code splitting
  - Lazy loading of components
  - Optimized bundle size using tree shaking

# Real-time Todo Application

A real-time todo application built with Vue.js, Express, MongoDB, and Socket.IO. This project allows users to create and view tasks in real-time across multiple clients.

## Features

- Create and view tasks in real-time
- Real-time updates using Socket.IO
- Persistent storage with MongoDB
- Responsive design

## Tech Stack

### Frontend
- Vue.js
- Socket.IO (client)
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO (server)

## Installation

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd todo-app-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root of the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/todo-app
   ```
   Note: Adjust the MONGO_URI based on your MongoDB setup. If using MongoDB Atlas, use the connection string provided by the service.

4. Start the backend server:
   ```
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root of the frontend directory with the following variables:
   ```
   VUE_APP_API_URL=http://localhost:5000/api
   VUE_APP_SOCKET_URL=http://localhost:5000
   ```
   Note: Adjust the URLs if your backend is running on a different host or port.

4. Start the frontend development server:
   ```
   npm run serve
   ```

5. Build for production:
   ```
   npm run build
   ```

## Usage

After starting both the backend and frontend servers, you can access the application at `http://localhost:8080` (or the port specified by your Vue.js development server).

- To add a new task, enter the task title in the input field and click "Add"
- The task will be added to the list and will be visible in real-time to all connected clients

## Project Structure

```
project-root/
├── frontend/             # Vue.js frontend
│   ├── public/           # Static files
│   └── src/              # Source files
│       ├── components/   # Vue components
│       ├── App.vue       # Main app component
│       └── main.js       # Entry point
│
└── todo-app-backend/     # Express.js backend
    ├── config/           # Configuration files
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    └── server.js         # Server entry point
```

## License

MIT
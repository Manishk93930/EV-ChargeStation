
---
# Charging Station Management App

A full-stack web application to manage electric vehicle (EV) charging stations. Authenticated users can add, edit, delete, and view station data on an interactive map.

---

## Features

* User authentication (Register/Login)
* Add, update, and delete charging stations
* Display stations on a map with markers
* Highlight focused station via URL query
* View detailed info in popups
* Responsive UI with Tailwind CSS
* Protected routes for authenticated users

---

## Tech Stack

### Frontend

* Vue 3 + Vite
* Vue Router
* Axios
* Tailwind CSS
* Google Maps

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* JWT Authentication
* dotenv

---

## Folder Structure

```
charging-station-app/
├── client/                 # Vue frontend
│   ├── components/         # Reusable UI components
│   ├── pages/              # View pages (Login, Register, Dashboard, etc.)
│   ├── services/           # Axios API layer
│   └── main.js             # App entry point
├── server/                 # Node.js backend
│   ├── controllers/        # Logic handlers
│   ├── middleware/         # JWT auth and validation
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   └── server.js           # Server entry point
├── README.md
└── .env.example
```

---

## Setup Instructions

### Prerequisites

* Node.js and npm
* MongoDB Atlas account
* Vercel (for frontend deployment)
* Vercel (for backend deployment)

### Backend Setup

1. Navigate to the server folder:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Run the backend:

```bash
npm run dev
```

---

### Frontend Setup

1. Navigate to the client folder:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:3000
```

4. Run the frontend:

```bash
npm run dev
```

---

## Deployment

### Frontend - Vercel

1. Push the project to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Set the environment variable:

```
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

4. Deploy.

---

### Backend - Vercel

1. Go to [vercel](https://vercel.com) and create a new Web Service.
2. Connect your GitHub repository and select the `server` folder.
3. Set environment variables:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Deploy.

---

## API Endpoints

| Method | Path           | Description      |
| ------ | -------------- | ---------------- |
| GET    | /stations      | Get all stations |
| POST   | /stations      | Add new station  |
| PUT    | /stations/\:id | Update station   |
| DELETE | /stations/\:id | Delete station   |
| POST   | /auth/register | Register user    |
| POST   | /auth/login    | Login user       |

---

## Input Validation

* **Latitude**: must be a number between -90 and 90
* **Longitude**: must be a number between -180 and 180

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-xyz`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature-xyz`)
5. Create a pull request

---

## Author
GitHub: https://github.com/Manishk93930

---

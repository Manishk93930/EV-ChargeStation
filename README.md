# EV-ChargeStation
project:
  name: Charging Station Management App
  description: >
    A full-stack web application to manage electric vehicle (EV) charging stations.
    Authenticated users can add, edit, delete, and view station data on an interactive map.
  features:
    - User authentication (Register/Login)
    - Add, update, and delete charging stations
    - Display stations on a map with markers
    - Highlight focused station via URL query
    - View detailed info in popups
    - Responsive UI with Tailwind CSS
    - Protected routes for authenticated users
  tech_stack:
    frontend:
      - Vue 3 + Vite
      - Vue Router
      - Axios
      - Tailwind CSS
      - Google-Maps
    backend:
      - Node.js
      - Express.js
      - MongoDB (Atlas)
      - Mongoose
      - JWT Authentication
      - dotenv
  folder_structure: |
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
  setup:
    prerequisites:
      - Node.js and npm
      - MongoDB Atlas account
      - Vercel (Frontend deployment)
      - Vercel (Backend deployment)
    backend:
      steps:
        - cd server
        - npm install
        - Create .env file with keys:
            - MONGO_URI
            - JWT_SECRET
            - PORT
        - npm run dev
    frontend:
      steps:
        - cd client
        - npm install
        - Create .env file with:
            - VITE_API_BASE_URL=http://localhost:3000
        - npm run dev
  deployment:
    frontend:
      platform: Vercel
      steps:
        - Import GitHub repo into Vercel
        - Set environment variable: VITE_API_BASE_URL
        - Deploy
    backend:
      platform: Render
      steps:
        - Create Web Service from GitHub repo (server folder)
        - Set environment variables: MONGO_URI, JWT_SECRET, PORT
        - Deploy
  api_endpoints:
    - method: GET
      path: /stations
      description: Get all stations
    - method: POST
      path: /stations
      description: Add new station
    - method: PUT
      path: /stations/:id
      description: Update station
    - method: DELETE
      path: /stations/:id
      description: Delete station
    - method: POST
      path: /auth/register
      description: Register user
    - method: POST
      path: /auth/login
      description: Login user
  validation:
    latitude: -90 to 90
    longitude: -180 to 180

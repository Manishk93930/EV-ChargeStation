const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const stationRoutes = require('./routes/stationRoutes')

const app = express()
app.use(cors())
app.use(cors({ origin: process.env.FRONTEND_URL}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/stations', stationRoutes)

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => console.error(err))

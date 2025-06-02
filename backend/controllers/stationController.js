const Station = require('../models/Station')

exports.getAllStations = async (req, res) => {
  const stations = await Station.find()
  res.json(stations)
}

exports.createStation = async (req, res) => {
  const station = new Station(req.body)
  await station.save()
  res.status(201).json(station)
}

exports.updateStation = async (req, res) => {
  const { id } = req.params
  const updated = await Station.findByIdAndUpdate(id, req.body, { new: true })
  res.json(updated)
}

exports.deleteStation = async (req, res) => {
  const { id } = req.params
  await Station.findByIdAndDelete(id)
  res.json({ message: 'Deleted successfully' })
}

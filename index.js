const express = require('express')
const cors = require('cors')
const path = require('path')
const getTrackLyric = require('./server/mm').getTrackLyric
const topSongList = require('./server/mm').topSongList
const buildSchema = require('./server/mm').buildSchema

// Create the server
const app = express()

// Serve our base route that returns a Hello World cow
app.get('/api/mm/songs', cors(), async (req, res, next) => {
  const r = await topSongList()
  try {
    res.json(r)
  } catch (err) {
    next(err)
  }
})

/** get liryc */
app.get('/api/mm/lyric/:id', cors(), async (req, res, next) => {
  const id = req.params.id
  const r = await getTrackLyric(id)
  try {
    res.json(r)
  } catch (err) {
    next(err)
  }
})

/** get initial schema */
app.get('/api/mm/schema', cors(), async (req, res, next) => {
  const r = await buildSchema()
  try {
    res.json(r)
  } catch (err) {
    next(err)
  }
})

/** info **/
app.get('/api/info', cors(), async (req, res, next) => {
  const host = req.get('host')
  const origin = req.get('origin')

  try {
    res.json({ host, origin })
  } catch (err) {
    next(err)
  }
})

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})

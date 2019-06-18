const express = require('express')
const cors = require('cors')
const path = require('path')

// Create the server
const app = express()

// Serve our base route that returns a Hello World cow
app.get('/api/cow/', cors(), async (req, res, next) => {
  try {
    res.json({ text: 'hello world' })
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

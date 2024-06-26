require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const snippetRoutes = require('./routes/snippetRoutes');
const collabRoutes = require('./routes/collabRoutes');
// const { checkJwt } = require('./middleware/authMiddleware');
const http = require('http');
const initializeSockets = require('./utils/sockets');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/snippets', snippetRoutes);
// app.use('/api/snippets', checkJwt, snippetRoutes);
app.use('/api/collabs', collabRoutes);
// app.use('/api/collabs', checkJwt, collabRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = http.createServer(app);

const io = initializeSockets(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

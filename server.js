require('dotenv').config();

const dns = require('dns');
dns.setServers(['1.1.1.1','8.8.8.8']);

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const seedTrainer = require('./seeder');

connectDB();

const app = express();
//middleware
app.use(cors());
app.use(express.json());

//seedTrainer(); // Seed the trainer user on server start

//routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/submissions', submissionRoutes);

//task route
app.get('/', (req, res) => {
  res.send('API Running...');
}
);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
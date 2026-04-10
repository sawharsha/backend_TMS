require('dotenv').config();

const dns = require('dns');
dns.setServers(['1.1.1.1','8.8.8.8']);

const express = require('express');

const connectDB = require('./config/db');

const app = express();

app.use(express.json());

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
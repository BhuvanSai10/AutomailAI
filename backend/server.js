const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();


const emailRoutes = require('./routes/emailRoutes'); 
const authRoutes = require('./routes/authRoutes');
const sendEmailRoutes = require("./routes/sendEmailRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes")

const connectDB = require('./config/db.js');

const app = express();
const port = 5000;

connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api', emailRoutes);
app.use('/api', authRoutes); 
app.use("/api", sendEmailRoutes);
app.use("/api", dashboardRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path')
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const jobRoutes= require('./routes/jobRoutes');
const analyzeRoutes=require('./routes/analyzeRoutes');
const profileRoutes = require('./routes/profileRoutes');


const app = express();
const _dirname = path.resolve();

// Middleware
app.use(cors({
    origin: 'https://kareer.onrender.com', 
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes 
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/profile', profileRoutes);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(_dirname, 'frontend', 'dist')));

app.use((req, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
});

// Server + DB
const PORT = process.env.PORT || 5000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { initDB } = require('./database/database');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "https://tutam-es-haikal-gifari-inzaghi-2406.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDB();

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server berjalan mulus di port:${PORT}`);
    });
}
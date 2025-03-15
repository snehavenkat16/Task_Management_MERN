const express = require('express');
const connectDB = require('./config');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const mongoose = require('mongoose');
connectDB();


app.use(express.json());

app.use('/users',userRoutes);
app.use('/tasks',taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

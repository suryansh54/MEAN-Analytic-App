const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const dbConnect = process.env.DATABASE_CONNECT;
const chartRoutes = require('../routes/charts');
const upload = require('../routes/upload');
const dummy = require('../routes/dummyData');

// Import auth routes
const authRoute = require('./../routes/auth');

// Connect to DB
mongoose.connect(
    dbConnect,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    ()=>{ console.log('Connected to DB');}
);

// Middleware
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/charts', chartRoutes);
app.use('/api', upload);
app.use('/api', dummy);

app.listen(port, ()=> console.log(`Server is running in port ${port}`));
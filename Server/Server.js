require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOrigins');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const PORT = process.env.PORT || 3500;

//connect to mongodb
connectDB();

//Handle options credentials check - before CORS!
//and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//for form data
app.use(express.urlencoded({ extended: false }));

//for json data
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//routes
app.use('^/', require('./routes/user'));

app.use(verifyJWT);

app.use('^/students', require('./routes/student'));

app.all('*', (req, res) => {
    res.status(404).json({ 'message': 'PAGE-NOT-FOUND' });
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json(err.message);
});

mongoose.connection.once('open', () => {
    console.log('mongodb connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
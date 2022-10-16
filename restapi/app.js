const express = require('express');
const app = express();
const studentRouter = require('./api/routes/student');
const facultyRouter = require('./api/routes/faculty'); 
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:user@cluster0.bpn3qta.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.on('error', err=>{
    console.log('connection failed')
});

mongoose.connection.on('connected', connected=>{
    console.log('connected with database successfully')
});

app.use('/student', studentRouter);
app.use('/faculty', facultyRouter);

app.use((req,res,next) => {
    res.status(404).json({
        error: 'bad request'
})
})

//middleware


module.exports = app;
require('dotenv').config();
const express = require('express');
const app = express();
const itemRouter = require('./api/routes/item.route');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB);

mongoose.connection.on('error', err=>{
    console.log('connection failed')
});

mongoose.connection.on('connected', connected=>{
    console.log('connection established with database ')
});

app.use(express.json());

app.use('/item', itemRouter);

app.use('/',(req,res,next)=>{
    res.status(200).json({
        msg: 'bad request'
    })
})

module.exports  = app;
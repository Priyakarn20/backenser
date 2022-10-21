require('dotenv').config();
const express = require('express');
const app = express();
const productRouter = require('./api/routes/product');
const userRouter = require('./api/routes/user');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect(process.env.DB);

mongoose.connection.on('error', err=>{
    console.log('connection failed')
});

mongoose.connection.on('connected', connected=>{
    console.log('connection connected with db')
});

app.use(fileUpload({
    useTempFiles: true
}))

app.use(cors());



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/product' , productRouter);
app.use('/user', userRouter);

app.use((req,res,next) => {
    res.status(404).json({
        error: 'bad request'
    })
})

module.exports = app;
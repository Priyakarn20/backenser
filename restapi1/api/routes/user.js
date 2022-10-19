const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../model/model.user');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'User get request'
    })
})

router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, 10 , (err, hash)=>{
    if (err) {
        return res.status(500).json({
            error:err
        })
    } else {
        const user = new User({
_id: new mongoose.Types.ObjectId,
username:req.body.username,
password:hash,
phone:req.body.phone,
email:req.body.email,
userType:req.body.userType
        })
        user.save()
        .then(result=>{
            res.status(200).json({
                message: 'user saved successfully',
                new_user: result,
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }
  })
})
module.exports = router;
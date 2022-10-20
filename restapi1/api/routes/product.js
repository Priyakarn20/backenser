const express = require('express');
const router = express.Router();
const Product = require('../../model/model.product');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
});

router.get('/', checkAuth, (req, res, next) => {

    Product.find()
        .then(result => {
            res.status(200).json({
                productData: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    Product.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                product: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    console.log(req.body);
    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath,(err, result)=>{
        console.log(result);
        const product = new Product({
            _id: new mongoose.Types.ObjectId,
            code: req.body.code,
            title: req.body.title,
            description: req.body.description,
            mrp: req.body.mrp,
            imagePath: result.url
        })
        product.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    newProduct: result
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    });
   
})

//delete request
router.delete('/:id', (req, res, next) => {
    Product.remove({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Product deleted successfully',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

//put request
router.put('/:id', (req, res, next) => {
    console.log(req.params.id);
    Product.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            code: req.body.code,
            title: req.body.title,
            description: req.body.description,
            mrp: req.body.mrp
        }
    })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product updated successfully',
                result: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})




module.exports = router
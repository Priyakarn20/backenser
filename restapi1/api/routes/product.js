const express = require('express');
const router = express.Router();
const Product = require('../../model/model.product');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Product.find()
        .then(result => {
            res.status(200).json({
                productData: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                errorr: err
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
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        code: req.body.code,
        title: req.body.title,
        description: req.body.description,
        mrp: req.body.mrp
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
})

module.exports = router
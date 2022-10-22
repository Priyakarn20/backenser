const express = require('express');
const router = express.Router();
const Item = require('../model/item.model');
const mongoose = require('mongoose');

router.get('/', (req,res,next)=>{
    Item.find()
    .then(result=>{
        res.status(200).json({
            itemData: result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})

router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Item.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            item: result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
    })
})
})

router.post('/', (req,res,next)=>{
   
   const item = new Item({
    _id: new mongoose.Types.ObjectId,
    code: req.body.code,
    title: req.body.title,
    description: req.body.description,
    mrp: req.body.mrp,
    imagePath: req.body.imagePath
   })
   item.save()
   .then(result=>{
    console.log(result);
    res.status(200).json({
        newItem:result
    })
   })
.catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
});
})

router.delete('/:id',(req,res,next)=>{
    Item.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message: 'Item deleted successfully',
            result: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Item.findOneAndUpdate({_id:req.params.id},{
        $set: {
            code: req.body.code,
            title: req.body.title,
            description: req.body.description,
            mrp: req.body.mrp
            
        }
    })
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message: 'Item updated successfully',
            result: result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;

const express = require('express');
const router = express.Router();
const {Category} = require('../models/category');
const { default: mongoose } = require('mongoose');

router.get(`/`,async (req,res)=>{
    const categoryList = await Category.find();
    if(!categoryList){
        res.status(500).json({success:false})
    }
    res.status(200).send(categoryList);
})

router.get(`/:id`,async (req,res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        return res.status(500).json({message:'The category id supplied doesnt exist'});
    }
    res.status(200).send(category);
})

router.post(`/`,async (req,res)=>{
    let category = new Category(
        {
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color
        }
    );
    category = await category.save();

    if(!category)
    return res.status(404).send("Category can't be created") ;

    res.send(category);
})

router.put(`/:id`, async(req,res)=>{
const category = await Category.findByIdAndUpdate(
req.params.id,{
    name:req.body.name,
    icon:req.body.icon,
    color:req.body.color,
})
if(!category)
return res.status(500).send('The category cant be modified');

res.send(category);
})


router.delete(`/:categoryId`,async (req,res)=>{
    Category.findByIdAndDelete(req.params.categoryId)
    .then(category=>{
        if(category){
            return res.status(200).json({success:true,message:'The category has been deleted'});
        }
        else{
            return res.status(404).json({success:false,message:"The category was not found"});
        }
    }).catch(err=>{
        return res.status(400).json({success:false,message:err});
    })
})

module.exports = router;
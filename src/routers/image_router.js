const Image_m = require('../models/Image.js')
const express = require('express')
const app = new express.Router()

app.post('/image',auth,async (req,res) => {
    // const image = new Image_m(req.body)
    const image = new Image_m({
        ...req.body,
        publisher:req.user._id
    })
    
    try{
        await image.save()
        res.status(200).send(image)
        // console.log(image)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }

})

app.post('/image/filter',async (req,res) => {
    try{
        var images;
        console.log(req.body)
        if (req.body.title == ''){
        images = await Image_m.find({})
        }
        else{
        images = await Image_m.find(req.body)
        }
        res.send(images)
    }catch(e){
        console.log(e)
        res.status(400).send(e.message)
        
    }

})




module.exports = app
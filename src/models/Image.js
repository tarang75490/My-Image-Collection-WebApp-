const mongoose = require('mongoose')
const validator= require('validator')

const image_schema=new mongoose.Schema({
    title:{
        type:String,

        minlenght:4,
        trim:true,
        required:true,
    },
    tags:[{
        type:String,
        trim:true,
    }],
    image:{
        type:String,
        trim:true,
        required:true,
        // validate(value){
        //     if(! validator.isBase64(value)){
        //         throw new Error('Invalid Bytecode')
        //     }
        // }

    },
    publisher:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true,
})

const Image = mongoose.model('Images',image_schema)
// const me= new   Image({
//     title:'Tarangdsds',
//     author:'5e638543f6acf20bfa3f2',
//     tags:'adaa'

// })

// me.save().then((result)=>{
//     console.log(result)
    
// }).catch((e) =>{
//     console.log(e.message)
// })


module.exports = Image
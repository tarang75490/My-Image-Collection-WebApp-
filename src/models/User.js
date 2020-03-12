const mongoose = require('mongoose')
const validator= require('validator')

const User_schema = new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:16,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email Not is an suitable format')
            }
        }
    },
    age:{
        type:Number,
        min:0
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:6,
        validate(value){
            const check1 = value.toLowerCase().includes('password')
            const check2 = value.toLowerCase().includes(this.name.toLowerCase())
            if (check1){
                throw new Error("password Should Not contains Word 'Password'")
            }
            else    if (check2){
                throw new Error("password Should Not contain username ")
            }
        }
    },
    phone_number:{
        type:String,
        trim:true,
        validate(value){
            const number = '0123456789'
            const check = value.split('').every((val) => number.includes(val) )
            if (!(value.length == 10)){
                throw new Error('Length of the phone number should be ten')
            }
            if (!check){
                throw new Error('Phone no. should only contains digits')
            }
        }
    } ,
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]
},{
    timestamps:true,
})

User_schema.virtual('images',{
    ref:'Images',
    localField:'_id',
    foreignField:'publisher'
})
// const me = new User({
//     name:'Tarang aa    ',
//     email:'Tarangkhetan111@gmail.com        ',
//     phone_number:'9660744867',
//     age:21,
//     password:'Taransg75490'

// })

// me.save().then((result)=>{
//     console.log(result)
// }).catch((e) =>{
//     console.log(e.message)
// })


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

User_schema.methods.generatetoken = async function(){
    const user = this
    const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

User_schema.statics.findbyCredentials = async (email,password) => {
    const user =  await User.findOne({email})
    if(!user){
        throw new Error('No Match \n Unable to Login')
    }
    const ismatch = await bcrypt.compare(password,user.password)
    if(!ismatch){
        throw new Error('No Match \n Unable to Login')
    }
    return user
}

User_schema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})


const User = mongoose.model('User',User_schema)

const Image = require('./Image.js')
User_schema.pre('remove',async function(next){
    const user = this
    await Image.deleteMany({publisher:user._id}) 
    next()
})
module.exports = User
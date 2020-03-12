const jwt = require('jsonwebtoken')
const User = require('../models/User.js')


const auth = async (req,res,next) =>{
    console.log(req.header('Authorization'))
    try{
    const token = req.header('Authorization').replace('Bearer ','')
    const decode =  jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findOne({_id : decode._id ,'tokens.token':token}) // find any one token from list of tokens
    // console.log(user)
    if(!user){
        return res.status(404).send( {error: 'user Not Found'})
    }

    req.user = user
    req.token = token

    next()
    }catch(e){
        console.log('error')
        res.status(401).send( {error: 'Please Authenticate'})
    
    }
}


module.exports = auth
const User = require('../models/User.js')
const express = require('express')
const app = new express.Router()
const auth = require('../middleware/auth.js')

app.post('/users',async (req,res) => {
    try{
        console.log(req.body)
        const user = new User(req.body)
        const token = await user.generatetoken()
        await user.save()
        res.status(201).send({user,token})
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }

})
app.post('/users/login',async (req,res) =>{
    
    try{
        
        const user = await User.findbyCredentials(req.body.email,req.body.password)
        const token = await user.generatetoken()
        if(!user){
            res.status(404).send("Unable to login")
        }
        res.send({user,token})
        
    }catch(e){
        res.status(400).send(e)
    }
})
app.post('/users/logout',auth, async (req,res) =>{
    
    try{
        req.user.tokens = req.user.tokens.filter((token) => token.token != req.token) 
        await req.user.save()
        res.send({message:'Successsfully Logout'})
    }catch(e){
        res.status(500).send("error"+e)
    }
})  
app.post('/users/logoutAll',auth, async (req,res) =>{
    
    try{
        req.user.tokens = []  
        await req.user.save()
        
            res.send({message:'Successsfully Logout for all Devices'})
        
    }catch(e){
        res.status(500).send("error"+e)
    }
})

app.get('/users',async (req,res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        console.log(e)
        res.status(400).send(e.message)
        
    }

})

app.get('/users/me',auth,async (req,res) => {
    // try{
    //     const users = await User.find({})
    //     res.send(users)
    // }catch(e){
    //     console.log(e)
    //     res.status(400).send(e.message)
        
    // }
    await req.user.populate('images').execPopulate()
    res.send({user:req.user,images:req.user.images})

})

app.delete('/users/me',auth,async(req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send('User Not Found')
        // }
        await req.user.remove() 
        res.send(req.user)
    }catch(e){
        res.status(500).send(error)
    }
})

app.patch('/users/me',auth,async (req,res) =>{
    const updates_allowed = ['phone_number','email','age','password','name']
    const update_proposed = Object.keys(req.body)
    const validate = update_proposed.every((update) => updates_allowed.includes(update))


    if (!validate){
        res.status(400).send('Update proposed is not allowed\nPlease Check\n Invalid Update Property')
    }

    try{
        // const updated_user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        update_proposed.forEach((update) => req.user[update]=req.body[update])
        await    req.user.save()
        res.send({user:req.user})

    }
    catch(error){
        res.status(400).send(error.message)
    }

})
// app.delete('/users/:id',async(req,res)=>{
//     try{
//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user){
//             return res.status(404).send('User Not Found')
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send(error)
//     }
// })

// app.patch('/users/:id',async (req,res) =>{
//     const updates_allowed = ['phone_no','email','age','password','name']
//     const update_proposed = Object.keys(req.body)
//     const validate = update_proposed.every((update) => updates_allowed.includes(update))


//     if (!validate){
//         res.status(400).send('Update proposed is not allowed\nPlease Check\n Invalid Update Property')
//     }

//     try{
//         const user = await User.findById(req.params.id)
//         // const updated_user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
//         update_proposed.forEach((update) => user[update]=req.body[update])
//         await    user.save()
//         if(!user){
//             res.status(404).send('Not found')
//         }
//         res.send({user})

//     }
//     catch(error){
//         res.status(400).send(error.message)
//     }

// })


module.exports = app
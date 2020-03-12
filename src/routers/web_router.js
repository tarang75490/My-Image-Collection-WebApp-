
const express = require('express')
const app = new express.Router()


app.get('',(req,res)=>{
    res.render('home',{
        'name':'tarang'
    })
})
app.get('/test',(req,res)=>{
    res.render('test',{
        'name':'tarang'
    })
})
app.get('/profile',(req,res)=>{
    res.render('profile',{
        'name':'tarang'
    })
})
app.get('/img',(req,res)=>{
    res.render('img',{
        'name':'tarang'
    })
})
app.get('/home',(req,res)=>{
    res.render('home',{
        'name':'tarang'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        'name':'tarang'
    })
})
app.get('/all_users',(req,res)=>{
    res.render('all_users',{
        'name':'tarang'
    })
})
app.get('/SignUp',(req,res)=>{
    res.render('signup',{
        'name':'tarang'
    })
})
app.get('/LogIn',(req,res)=>{
    res.render('Login',{
        'name':'tarang'
    })
})

module.exports = app
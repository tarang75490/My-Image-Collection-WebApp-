require('./db/mongoose.js')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const User = require('./models/User.js')
const Image_m= require('./models/Image.js')
const auth = require('./middleware/auth.js')

const user_router = require('./routers/user_router.js')
// const image_router = require('./routers/image_router.js')
const web_router = require('./routers/web_router.js')


const app = express()
const port = process.env.PORT || 3000

//setup paths to directory
const publicstaticpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')


// setup handlers and view locations
app.set('view engine', 'hbs');
app.set('views',viewpath)
hbs.registerPartials(partialpath) //to register partials

// setup static files to serve
app.use(express.static(publicstaticpath))



// app.use((req,res,next) => {
//     if(req.method == 'GET'){
//         console.log('fafsdf')
//     }

//     next()
// })
app.use(express.json({limit: '100mb'}))




app.use(user_router)
// app.use(image_router)
app.use(web_router)

app.post('/image',auth,async (req,res) => {
    // const image = new Image_m(req.body)
    console.log(req.user)
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
        console.log(req.query)
        // if (req.body.title == ''){
        var sort= req.query.sortby
       images = await Image_m.find(req.body).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))    // .sort(sort)
    // }
    //     else{
    //     images = await Image_m.find(req.body)
    //     }
        res.send(images)
    }catch(e){
        console.log(e)
        res.status(400).send(e.message)
        
    }

})





app.listen(port,()=> {
    console.log('Successfully listening to port '+ port)
})
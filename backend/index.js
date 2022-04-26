var morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/heroes')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
const port = 3000;
app.listen(port,()=>{
    console.log('server started on port'+" " + port)
})

const HeroesSchema = new mongoose.Schema({
    slug: String,
	name: String,
	power: [String],
	color: String,
	isAlive: Boolean,
	age: Number,
	image: String
})


const HeroesModel = mongoose.model('heroes',HeroesSchema)

// HeroesModel.insertMany(
//     [
//         {
//                     slug: "iron-man",
//             name: "Iron Man",
//             power: ["money"],
//             color: "red",
//             isAlive: true,
//             age: 46,
//             image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
//         },
//         {
//                     slug: "thor",
//             name: "Thor",
//             power: ["electricty", "worthy"],
//             color: "blue",
//             isAlive: true,
//             age: 300,
//             image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
//         },
//         {
//                     slug: "dardevil",
//             name: "Daredevil",
//             power: ["blind"],
//             color: "red",
//             isAlive: false,
//             age: 30,
//             image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
//         }
//     ])//.exec()
    // .then(res=>{
    //     console.log(res)
    // })
    

app.get('/heroes', async function (req, res, next ){
    const heroes= await HeroesModel.find({}).exec()
    console.log("console log verif heroes",heroes)
    res.json(heroes)
    // console.log("console log de res app",res)
})

app.get('/heroes/:slug', function(req, res, next){
    const slug = req.params.slug
    console.log('console log de slug',slug)
    const heroes = HeroesModel.find({slug}).exec().then((heroes)=>{
        console.log("console log de something",heroes)
        res.json(heroes)
    })
})

app.get('/heroes/:slug/powers',function(req, res, next){
    const slug = req.params.slug
    console.log("console.log de slug",slug)
    HeroesModel.find({slug}).exec().then((resultat)=>{
        console.log(resultat.power)
        res.json(resultat[0].power)
        
    })
    
})
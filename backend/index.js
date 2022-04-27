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
app.listen(port, () => {
    console.log('server started on port' + " " + port)
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


const HeroesModel = mongoose.model('heroes', HeroesSchema)

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


app.get('/heroes', async function (req, res, next) {
    const heroes = await HeroesModel.find({}).exec()
    console.log("console log verif heroes", heroes)
    res.json(heroes)
    // console.log("console log de res app",res)
})

app.get('/heroes/:slug', function (req, res, next) {
    const slug = req.params.slug
    console.log('console log de slug', slug)
    HeroesModel.find({ slug }).exec().then((heroes) => {
        console.log("console log de something", heroes)
        res.json(heroes)
    })
})

app.get('/heroes/:slug/powers', function (req, res, next) {
    const slug = req.params.slug
    console.log("console.log de slug", slug)
    HeroesModel.find({ slug }).exec().then((resultat) => {
        console.log(resultat.power)
        res.json(resultat[0].power)

    })

})

app.post('/heroes',chekUser ,function (req, res, next) {
    console.log(req.body)
    HeroesModel.insertMany([{
        slug: "superman",
        name: "superman",
        power: ["fire"],
        color: "yellow",
        isAlive: true,
        age: 4000000,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.seekpng.com%2Fipng%2Fu2w7r5w7y3r5e6q8_naruto-shippuuden-fond-dcran-entitled-minato-yondaime-hokage%2F&psig=AOvVaw2VChXDzTZKMyKy-NO5MQpd&ust=1651071078824000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCB6pv9sfcCFQAAAAAdAAAAABAD"
    }])
    res.status(201).json({
        message: "héros ajouté ! "
    })
})

app.put('/heroes/:slug/powers', function (req, res, next) {
    const slug = req.params.slug
    console.log(req.body)
    HeroesModel.updateOne({ slug }, { $set: { power: "grappeling" } }).then(result => {
        console.log(result)
        HeroesModel.findOne({ slug }).then(result => {
            console.log(result)
        })
    })
    res.status(201).json({
        message: "power ajouté"
    })
})

function chekUser(req, res, next){
    HeroesModel.find({name:req.body.name}).then(result=>{
        console.log(result)
        if(result.length == 0 ){
            next()
        }else{
            res.json({
                message : "already exist"
            })
        }
    })
}
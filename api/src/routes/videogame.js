const express = require("express")
const axios = require("axios")
const {Videogame,Genre} = require("../db.js")
const router = express.Router()

router.use(express.json())

const {API_KEY} = process.env;

////////////////////////////////////// FUNCION PRIMEROS 100 JUEGOS    ///////////////////////////////////////////////////////

const infodelApi100 = async () =>{
    let juegos = []
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`
    for(let i =0 ; i<5 ; i++){
    const arr = await axios.get(url)
    const apiGames = arr.data.results
    apiGames.map( e => juegos.push({

        id: e.id,
        name: e.name,
        image: e.background_image,
        releaseDate: e.released,
        rating: e.rating,
        description: e.description,
        platforms: e.platforms.map(d => d.platform.name),
        genres: e.genres.map(d=>d.name)

    }))
    url = arr.data.next
}
    return juegos
}

///////////////////////////////// FUNCION BUSQUEDA EN LA API POR NOMBRE (cancelado) //////////////////////////////////////////

const apiByName = async (prop) =>{
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${prop}`
    const arr = await axios.get(url)
    const apiGames = arr.data.results
    let juegos = []
    apiGames.map( e => juegos.push({

        id: e.id,
        name: e.name,
        image: e.background_image,
        releaseDate: e.released,
        rating: e.rating,
        description: e.description,
        platforms: e.platforms.map(d => d.platform.name),
        genres: e.genres.map(d=>d.name)

    }))
    return juegos
}

//////////////////////////////////////   GET BY NAME POR QUERY A LA API  (cancelado)  ///////////////////////////////////////////////////////////

router.get("/", async (req,res)=>{
    const {name} = req.query
    
    if(name !== undefined){
        console.log("entre al if")
        const capo = await apiByName(name)
        if(capo.length !== 0){
        try {
            let arr15 = capo.slice(0,15)
            res.json(arr15)
        } catch (error) {
            res.send(error)
        }} else {
            return res.send("no hay coincidencias por nombre")
        }
    } else{
    try {
        console.log("no entro al if")
        const createdGames = await Videogame.findAll()
        const apiGames = await infodelApi100()
        const capo = createdGames.concat(apiGames)
         res.json(capo)
     } catch (error) {
         res.send(error)
     }}
})


////////////////////////////////////////////// GET CHIQUITO CON API Y DB (Get allGames) ///////////////////////////////////////////////////

router.get("/", async (req,res)=>{
try {
    console.log("entro al get normal")
    const createdGames = await Videogame.findAll({
        include:[{ model: Genre, attributes:["name"],
        through:{attributes:[]} }]
    })
    const apiGames = await infodelApi100()
    const capo = createdGames.concat(apiGames)
     res.json(capo)
 } catch (error) {
     res.send(error)
 }
})

////////////////////////////////////////////  GAME POR ID DESDE :PARAMS (Get detail game) ////////////////////////////////////////////////

router.get("/:id", async (req,res)=>{
    const {id} = req.params
    let str = id.toString()
    if(str.length > 9){
        try {
            const myGame = await Videogame.findOne({
                where:{
                    id: id
                },
                include:[{ model: Genre, attributes:["name"],
        through:{attributes:[]} }]
            })
            
            res.json(myGame)
        } catch (error) {
            res.send(error)
        }
    }
    else{
    let url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    try {
        const game = await axios.get(url)
        const apiGame = { 
            id: game.data.id,
            name: game.data.name,
            image: game.data.background_image,
            releaseDate: game.data.released,
            rating: game.data.rating,
            description: game.data.description_raw,
            platforms: game.data.platforms.map(d => d.platform.name),
            genres: game.data.genres.map(d=>d.name),
            rating_top: game.data.rating_top
        }
        res.json(apiGame)
    } catch (error) {
        res.status(404).send("detail not found")
    }}
})

//////////////////////////////////////////    RUTA POST GAME EN DATA BASE    /////////////////////////////////////////////////////////

router.post("/",async (req,res)=>{
    const {name,description,rating,image,platforms,genre,date} = req.body
    if(!name||!description||!rating||!image||!platforms||!genre){ throw "Falta enviar datos obligatorios"}
    else{

    let juegoExiste = await Videogame.findOne({
        where:{name}
    })

    if(juegoExiste){

        let obj = {name,description,rating,image,platforms,releaseDate:date}
        let genero = await Genre.findAll({
            where:{name:genre}
        })
        try{
        await Videogame.update({name,description,rating,image,platforms,releaseDate:date},{
            where:{name}
         })
        let juegoGenre = await juegoExiste.addGenres(genero)
        res.json(juegoGenre)
        }catch(error){
            res.send(error)
        }
    }else{

        let genero = await Genre.findAll({
            where:{name:genre}
        })
        let obj = {name,description,rating,image,platforms,releaseDate:date}
        try {
            const newGame = await Videogame.create(obj)
            let juegoGenre = await newGame.addGenres(genero)
            console.log("estoy en la creacion del new game", newGame)
            res.json(juegoGenre)
        } catch (error) {
            
            res.send(error)
        }
    }}
})

/////////////////////////////////////////     PARA ALMACENAR EN LA DB  (cancelado)  ////////////////////////////////////////////////////////////

/* router.get("/base", async (req,res)=>{
    
    const apiGames = await infodelApi100()
    
    try {
        const gamesToDb = await Videogame.bulkCreate(apiGames)
         res.json(gamesToDb)
     } catch (error) {
         res.send(error)
     }}
) */



module.exports = router
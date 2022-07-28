const express = require("express")
const axios = require("axios")
const { Genre } = require("../db.js")
const router = express.Router()

router.use(express.json())

const {
    API_KEY
} = process.env;

let url = `https://api.rawg.io/api/genres?key=${API_KEY}`

router.get("/", async (req, res) => {

    const dbGenres = await Genre.findAll()
    
    if (dbGenres.length) {
        try {
            res.json(dbGenres)
        } catch (error) {
            res.send(error)
        }
    } else {
        try {
            const arr = await axios.get(url)
            const apiGenre = arr.data.results
            const myGenres = await Genre.bulkCreate(apiGenre)
            res.json(myGenres)
        } catch (error) {
            res.send(error)
        }
    }
})

module.exports = router
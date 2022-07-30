const { Router } = require('express');
const express = require("express")
const router = Router();

const videogameRoutes = require("./videogame.js")
const genreRoutes = require("./genre.js")

router.use(express.json())



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogameRoutes)
router.use('/genre', genreRoutes)

module.exports = router;

const express = require('express')
const controller = require('../controller/pokedexController')
const router = express.Router()

router.post('/pokedex', controller.creatPokemon)


module.exports = router
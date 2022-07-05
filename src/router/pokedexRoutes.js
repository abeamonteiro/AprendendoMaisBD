const express = require('express')
const controller = require('../controller/pokedexController')
const router = express.Router()

router.post('/pokedex', controller.creatPokemon)
router.get('/pokedex', controller.findAllPokemons)
router.get('/pokedex/:id', controller.findPokemonById)



module.exports = router
const mongoose = require('mongoose')

const PokedexSchema = mongoose.Schema({
    _id: {
     type: mongoose.Schema.Types.ObjectId,
     default: mongoose.Types.ObjectId
    },

    name: {
     type: String,
     required: true
    },

    type: {
     type: [String], //colocando o string entre colchetes se torna entao uma lista de tipos, no caso um array
     required: true
    },

    abilities: {
     type: [String],
     required: true
    },

    description: String,

    coach: { //estamos definindo a relação entre o pokemon e o treinador que está no outro arquivo Model
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     ref: 'coach' // essa referencia faz o link direto com a colection coach, 
     // então se la na variavel Model do coachModel, eu tou chamando a colection 'coach',
     // aqui eu também tenho que chamar pelo mesmo nome, 'coach'.
    }
}, { timestamps: true })

const Model = mongoose.model('pokedex',PokedexSchema)
module.exports = Model
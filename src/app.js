const express = require('express')
const cors = require('cors') //2.1 deixar a api publica //configurando a app
const mongoose = require('./database/mogooseConnect') //3.1 conectar o banco //configurando a app
const coachRoutes = require('./router/couchRoutes')

const app = express() //criando a aplicação

app.use(express.json()) //1. body parser //configurando a app
app.use(cors()) //2.2 deixar a api publica //configurando a app

mongoose.connect() // //3.2 conectar o banco //configurando a app

app.use("/", coachRoutes) // somente depois que o banco conectar; somente configuração de api



module.exports = app
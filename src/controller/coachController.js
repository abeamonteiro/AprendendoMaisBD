const CoachModel = require('../models/coachModel') //a Model nao é uma variavel normal, mas uma classe, portanto usamos PascalCase

/*post > criar um treinador
get (All) > visualizar treinadores
get > visualizar um treinador por Id */

/*
const { name, age, team } = req.body  >> é o mesmo que:
const age = req.body.age
const name = req.body.name
const team = req.body.team

que sao os dados do model e sao os dados que precisamos para 
a criar um novo cadastro
 
a const Saved significa que estamos salvando nosso codigo em um 
banco de dados

> para salvar os dados no banco, como ele está em outro ambiente, 
fora da api, isso vai levar um tempo e esse tempo entra no código assícrono, porém, para 
termos agilidade na resposta ao cliente, então para deixar SÍCRONO; como o JS
é Assíncrono por natureza, utilizaremos o assync/await
*/
const creatCoach = async (req, res) => { //o async indica que a função é assícrona, porque tem algo dentro dela que não pertence ao código, que nesse caso é o banco
    try {
       const { name, team, region, age, gender } = req.body // olhar comentário acima
    
       const newCoach = new CoachModel({ //o new so funciona com classe
        name, team, region, age, gender
       })

       const savedCoach = await newCoach.save()
       res.status(201).json(savedCoach) // passamos o atualizado, porque saberemos que foi salvo e ele poderá trazer mais informações pra a gente

    }catch (error){
      console.error(error)
      res.status(500).json({ mesasage: error.message })
    }
}

module.exports = {creatCoach}
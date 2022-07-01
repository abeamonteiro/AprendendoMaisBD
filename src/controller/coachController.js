/*post > criar um treinador
get (All) > visualizar treinadores
get > visualizar um treinador por Id 
patch > um update por id pelo metodo do mongoose
delete > por id pelo metodo do mongoose
*/

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
const CoachModel = require('../models/coachModel') //a Model nao é uma variavel normal, mas uma classe, portanto usamos PascalCase
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

const findAllCoaches = async (req,res) => {
  try {
    const allCoaches = await CoachModel.find()
    res.status(200).json(allCoaches)
  } catch(error) {
    console.error(error)
    res.status(500).json({ message: error.mensage })
  }
}

const findCoachById = async (req, res) => {
   try {
     const findCoach = await CoachModel.findById(req.params.id)
     res.status(200).json(findCoach)
   } catch (error) {
     console.error(error)
     res.status(500).json({ message: error.message })
   }
}

const updateCoach = async (req, res) => {
  try {
    const { name, age, region, team, gender } = req.body
    const updateCoach = await CoachModel.findByIdAndUpdate(req.params.id, {
     name, age, region, team, gender
    })

    res.status(200).json(updateCoach)
  } catch(error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
} 

const deleteCoach = async (req, res) => {
  try {
      const { id } = req.params
      await CoachModel.findByIdAndDelete(id)
      const message = `O treinador com o id ${id} foi deletado com sucesso!`
    res.status(200).json({ message })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  creatCoach, findAllCoaches, findCoachById, updateCoach, deleteCoach
}
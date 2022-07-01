const PokedexModel = require('../models/pokedexModel')
const CoachModel = require('../models/coachModel') /* fazemos isso porque nas regras de negocio temos:
- [ ]  Para criar um novo pokemon, deverá vincular no momento da criação a um treinador já 
existente no sistema, utilizando o numero do id do treinador correspondente no corpo da requisição
SENDO ASSIM, A MODEL DOS TREINADORES PRECISA SER IMPORTADA */

const creatPokemon = async (req, res) => {
  try {
    const { coachId, name, type, abilities, description } = req.body
   
    if (!coachId) { // ! - validação de que o id foi enviado, de que ele nao é nulo nem undefined; 
      //caso o usuario nao mande o nome do coach, retornamos para o front:
      return res.status(404).json({ message: 'É obrigatório o Id do treinador'}) 
      // ^^ sempre que temos um dado errado, se o id for invalido, teremos uma bad request, erro 400
    }

    const findCoach = await CoachModel.findById(coachId) // aqui ele procura o id do treinadador no sistema

    if (!findCoach) {
       return res.status(404).json({ message: 'Treinador não foi encontrado!'}) 
       // caso o id do treinador nao exista no banco
       // ^^ o erro 404 serve para quando o dado não foi encontrado, diferente do anterior(400) que deixou de ser passado
      }

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}



module.exports = {
  creatPokemon
}
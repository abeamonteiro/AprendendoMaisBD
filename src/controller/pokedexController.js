/*
- [ ] POST  "/pokedex"  Deverá criar um pokemon (relacionado com seu treinador);
- [ ] GET "/pokedex" Deverá retornar todos os pokemons cadastrados e os seus treinadores;
- [ ] GET "/pokedex/[id]" Deverá retornar o pokemon com o id informado e o seu treinador;
- [ ] PATCH  "/pokedex/[ID]" Deverá alterar informação específica dentro de um estudio por id específico e retorna o título alterado;
- [ ] DELETE   "/pokedex/[ID]" Deverá deletar um pokemon por id específico e retorna mensagem amigável.
*/

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

  //montando a model:
   const newPokemon = new PokedexModel({
     coach: coachId, 
     name, type, abilities, description
   })

   //salvando no banco:
   const savedPokemon = await newPokemon.save()
   //retorna no body o pokemon salvo:
   res.status(200).json(savedPokemon)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

const findAllPokemons = async (req, res) => {
  try {
    const allPokemons = await PokedexModel.find().populate('coach') //esse populate permite compartilhar outro campo e eu ponho nos parenteses o campo que eu quero 
    res.status(200).json(allPokemons)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const findPokemonById = async (req, res) => {
  try {
    const findPokemon = await PokedexModel
    .findById(req.params.id).populate('coach')

    if (findPokemon == null) {
      return res.status(404).json({ message: "Pokemon não encontrado." }) //tratamento de erro
    }

    res.status(200).json(findPokemon)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/* O que o mongoose faz no findByIdAndUpdate
1. verificar se o pokemon existe
2. verificar se o coachId recebido existe // o mongoose nao valida se o trinador existe se ele nao for ObjectId (ele só ve ObjectId )
3. verificar se o dado recebido é válido
*/
const updatePokemonById = async (req, res) => {
  try {
    const { id } = req.params //2. extraindo o id do parametro
    //processo que o mongoose faz: 1. tentar encontrar o pokemon por id
    const { coachId, name } = req.body

    const findPokemon = await PokedexModel.findById(id) //aqui garantimos que o pokemon existe pra poder ser att

    if (findPokemon == null) {  
      return res.status(404).json({ message: "Pokemon não encontrado." }) //tratamento de erro
    }

    if (coatchId) {
      const findCoach = await CoachModel.findById(coachId) //aqui garantimos que o treinador existe pra poder ser att

      if (findCoach == null) {
        return res.status(404).json({ message: 'Treinador não foi encontrado!'}) 
      }
    }

    findPokemon.name = name || findPokemon.name
    // equivalente a: if (name) { findPokemon.name = name}; para quando tem mais de uma opção. 

  } catch (error) {
    
  }
}


module.exports = {
  creatPokemon, findAllPokemons, findPokemonById

}
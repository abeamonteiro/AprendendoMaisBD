const mongoose = require('mongoose')

// dados do treinador: nome, equipe, insignias, pokemons, região, idade, trofel, genero

const coachSchema = mongoose.Schema({
    _id: { 
      type: mongoose.Schema.Types.ObjectId, //tipo, se é string, number,boolean, date...  
                                            //Esse aqui é um Object Id, um Id do proprio mongoose neste caso
      default: mongoose.Types.ObjectId // informo para o mongoose que eu quero que ele gere um Id para mim automaticamente
    },

    name: {
        type: String, // ou seja, um texto e ficará "entre aspas"
        required: true, // o uso do required sinaliza se o nome vai ser ou não
                        // de preenchimento obrigatório, como usei o true, o nome é obrigatório
        unique: true //unique é uma propriedade do mongoose que estamos usando 
                     //neste caso porque é uma das regras do negócio que cada treindador só tenha 1 nome, ou seja, nome é um dado único
    },

    team: String, // como o time não precisa ser obrigatório para cada treinador (required), nem precisa ser único (unique), o trinador 
                  // poderia ter mais de um, nós só preenchemos o tipo do dado e como é só uma característica, pode ser em uma estreutura 
                  // mais simples (sem as {});
    
    region: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        default: "Não informado"
    }

}, { timestamps: true }) //com essa propriedade o arquivo vai gerar automaticamente a data seja de criação ou atualização).

const Model = mongoose.model('coach', coachSchema) // Model criada e coach é o nome da collection

module.exports = Model //exportando a Model (que tem métodos iguais aos de um array normal), eu estou automaticamente exportando a Schema
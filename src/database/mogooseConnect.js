const { default: mongoose } = require("mongoose")

const DATABASE_URI = "mongodb+srv://abeamonteiro:nWpmdvz07Ydg6Wp6@cluster0.nra9se5.mongodb.net/projeto_db"

//função de conexão com o banco
const connect = async() => {
    try{
      await mongoose.connect(DATABASE_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
      })

      console.log('banco conectado!')
    } catch (error) {
     console.error(error)
    }
}  

module.exports = {
    connect
}
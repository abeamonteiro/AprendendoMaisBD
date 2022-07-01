//1. importar a aplicação/app (api)
const app = require('./src/app')

//2.definir uma porta e ouvi-la
app.listen(8000, () => console.log(`fé no pai que agora vai, porta: 8000`))
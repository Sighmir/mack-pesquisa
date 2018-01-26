var app = require("./config/custom-express")();

var porta = process.env.PORT || 80;

console.log("Porta que será usada %d", porta);

app.listen(porta, function(){
    console.log("Servidor rodando na porta %d", porta);
})
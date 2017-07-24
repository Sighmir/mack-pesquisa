var app = require("./config/custom-express")();

var porta = process.env.PORT || 3000;

app.listen(3000, function(){
    console.log("Servidor rodando na porta %d", porta);
})
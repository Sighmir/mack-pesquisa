var app = require("./config/custom-express")();
var bcrypt = require('bcrypt-nodejs');

var porta = process.env.PORT || 8788;

console.log("Porta que será usada %d", porta);
criaUsuarioAdmin(app);

app.listen(porta, function(){
    console.log("Servidor rodando na porta %d", porta);
})


function criaUsuarioAdmin(app){
	var connection = new app.infra.ConnectionFactory();
    var usuarioDAO = new app.persistencia.UsuarioDAO(connection);
	
	var usuario = {
		nome: "Admin Controladoria",
		email: "admin@controladoria.com",
		senha: "controladoria@123",
		perfil: "ADMIN"
	}
	
			try{
                usuarioDAO.buscarPorEmail(usuario, function(error, resultado){
                    console.log("Entrou no buscar por Email");
                    if(error){
                        console.log("Erro de banco: "+error)
                           var mensagemErro = "Erro ao realizar cadastro!";
                           connection.end();
                           return;
                     }
                    if(!resultado[0]){
						var salt = bcrypt.genSaltSync(5);
                        bcrypt.hash(usuario.senha, salt,null,  function(err, hash) {
                           if(err){
                               var mensagemErro = "Erro ao realizar cadastro!";
                               console.log("Erro: "+err);
                               connection.end();
                               return;
                           }else{

                               usuario.senha = hash;
                               usuario.data_cadastro = new Date();
                               usuarioDAO.inserir(usuario, function(erro, resultado){
                                   if(erro){
                                       console.log("Erro de banco: "+erro)
                                       var mensagemErro = "Erro ao realizar cadastro!";
                                       
                                   }
                                   connection.end();
                               });
                           }
                       });
                    }
               });
            }catch(e){
                console.log(e);
            }
}
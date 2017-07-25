$(function(){
    
    $("#mostrarCadastro").on("click", trocaTela);
    $("#mostrarLogin").on("click", trocaTela);
})

function trocaTela(event){
    if(event != undefined)event.preventDefault();
    $("#login").toggleClass("elemento-escondido");
    $("#cadastro").toggleClass("elemento-escondido");
}

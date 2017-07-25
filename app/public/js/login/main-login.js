$(function(){
    
    $("#mostrarCadastro").on("click", trocaTela);
    $("#mostrarLogin").on("click", trocaTela);
})

function trocaTela(event){
    if(event != undefined)event.preventDefault();
    $("#login").toggleClass("elemento-escondido");
    $("#cadastro").toggleClass("elemento-escondido");
}

$("#cadastrar").click(function(event){
    event.preventDefault();
    var formularioValido = $("#cadastro form")[0].checkValidity();
    if(formularioValido){
        $("#feedback").fadeOut();  
        $("#feedback").toggleClass("elemento-escondido");
    }else{
        $("#feedback").toggleClass("elemento-escondido");
        $("#feedback").hide();
        $("#feedback").fadeIn();    
    }
})
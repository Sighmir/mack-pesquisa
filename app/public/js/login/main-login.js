$(function(){
    
    $("#mostrarCadastro").on("click", trocaTela);
    $("#mostrarLogin").on("click", trocaTela);
})

function trocaTela(event){
    if(event != undefined)event.preventDefault();
    $("#login").toggleClass("elemento-escondido");
    $("#cadastro").toggleClass("elemento-escondido");
    $(".input").val("");
}

$("#cadastrar").click(function(event){
    event.preventDefault();
    var formularioValido = $("#cadastro form")[0].checkValidity();

    var usuario = {
        "nome" : $("#nome").val(),
        "email" : $("#email-cadastro").val(),
        "senha" : $("#senha-cadastro").val(),
    }
    
    if(formularioValido){
       var dialog = {};

        $("#feedback").fadeOut();  
        $("#feedback").addClass("elemento-escondido");

        $.ajax({
            url: "/cadastro",
            method:"post", 
            dataType:"json", 
            data: usuario,
            beforeSend: function(){
                dialog = bootbox.dialog({
                    title: 'Realizando operação',
                    message: '<p><i class="fa fa-spin fa-spinner"></i> Aguarde...</p>'
                });    
            }, success:function(data){
                console.log(data);
                $("#cadastro-sucesso").removeClass("elemento-escondido");
                trocaTela();
                $("#email").val(usuario.email);
            },error:function(error){
                $("#erro-cadastro strong").text(error.responseText);
                $("#erro-cadastro").removeClass("elemento-escondido");
            },complete: function(){
                dialog.modal('hide');
            }

        });
    }else{

        $("#feedback").removeClass("elemento-escondido");
        $("#feedback").hide();
        $("#feedback").fadeIn();    
    }
})
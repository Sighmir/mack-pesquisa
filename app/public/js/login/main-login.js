$(function(){
    
    $("#mostrarCadastro").on("click", trocaTela);
    $("#mostrarLogin").on("click", trocaTela);
    $("#liderPesquisa").hide();
    $("#fechaModal").hide();
    animarTextos();
    permitirAvanco();
})

var animarTextos = function(){
	$(".apresentacao").hide();
	$(".apresentacao").removeClass("elemento-escondido");
	$(".apresentacao").animate({
		"height": "toggle",
	 	"opacity": "toggle" 
	}, "slow");
}


var permitirAvanco = function(){
	$("#inicioQuestionario").on("change", function(){
		if($("#inicioQuestionario").is(":checked")){
			$("#botaoAvanca").attr("disabled", false);
		}else{
			$("#botaoAvanca").attr("disabled", true);			
		}
	})
}

function trocaTela(event){
    if(event != undefined)event.preventDefault();
    $("#login").toggleClass("elemento-escondido");
    $("#cadastro").toggleClass("elemento-escondido");
    $(".input").val("");
}

$("#modalLider").on("click",function(event){
	event.preventDefault();
	$("#liderPesquisa").modal("show");
});

$("#modalTermo").on("click", function(event){
	event.preventDefault();
	$("#termo").modal("show");
})

$("#avanca").click(function(){
	$("#item_1").hide();
	$("#item_2").show();
	$("#avanca").hide();
	$("#fechaModal").show();
})

$("#fechaModal").click(function(){
	setTimeout(function(){
		$("#item_1").show();
		$("#item_2").hide();
		$("#avanca").show();
		$("#fechaModal").hide();
	}, 1000);
})

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
            url: "/controladoria/cadastro",
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
                mostraMensagem("erro-cadastro");
            },complete: function(){
                dialog.modal('hide');
            }

        });
    }else{

        mostraMensagem("feedback"); 
    }
})

function mostraMensagem(id){
    debugger;
    $("#"+id).removeClass("elemento-escondido");

    setTimeout(function(){
        $("#"+id).addClass("elemento-escondido");
    }, 1500);
}

$("#botaoAvanca").click(function(){
    $(".apresentacao").fadeOut(function(){
        $("#login").hide();
        $("#login").removeClass("elemento-escondido");
        $("#login").fadeIn();
    });
    $(this).hide();
});
var indice = 0;
$(function(){
	$("#item_2").hide();
	$("#liderPesquisa").hide();
	$(".apresentacao").hide();
	$("#botoesPerguntas").hide();
	permitirAvanco();
	$(".botao").attr("disabled", true);
	animarTextos();
	$("#fechaModal").hide();
	$(".questionario").hide();
	unicaEscolha();
	$(".voltar").hide();
})


var permitirAvanco = function(){
	$("#inicioQuestionario").on("change", function(){
		if($("#inicioQuestionario").is(":checked")){
			$(".botao").attr("disabled", false);
		}else{
			$(".botao").attr("disabled", true);			
		}
	})
}

var animarTextos = function(){
	$(".apresentacao").animate({
		"height": "toggle",
	 	"opacity": "toggle" 
	}, "slow");
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

$(".botao").click(function(){
	
	if(indice == 0){
		alternarDivs(indice)
	}else{
		
		if(validarCampos()){
			alternarDivs(indice)
		}else{
			alert("Preencha todos os campos");
		}
	}
	indice++;
	$(".botao").hide();
	$("#botoesPerguntas").show();
});

var alternarDivs = function(indice){
	$("#conteudo_"+indice).fadeOut();
	indice++;
	setTimeout(function(){
		$("#conteudo_"+indice).fadeIn();
	}, 370);
}

var unicaEscolha = function(){
	 $('input[type=radio]').click(function () {
		 var td = $(this).closest('td');
         var chks = td.find('INPUT');
         for (i = 0; i < chks.length; i++) {
            chks[i].checked = false;
         }
         if (chks.length > 1)
            $(this)[0].checked = true;
     });
}

$("#botaoFim").click(function(){
	var dialog = bootbox.dialog({
    	message: '<p><i class="fa fa-spin fa-spinner"></i> Calculando resultados...</p>',
		closeButton: false
	});

	setTimeout(function(){
		dialog.modal('hide');
		alternarDivs(indice)
		$(".voltar").show();
		$("#botaoFim").hide();
	}, 2000)
})

$("#modalResultado").click(function(){
	$("#resultado").modal("show");
})

$(".voltar").click(function(){
	location.reload(); 
})
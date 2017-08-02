var indice = 1;
$(function(){
	$("#item_2").hide();
	$("#liderPesquisa").hide();
	permitirAvanco();
	$(".botao").attr("disabled", true);
	animarTextos();
	$("#fechaModal").hide();
	$(".questionario").hide();
	unicaEscolhaVertical();
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
	$(".apresentacao").hide();
	$(".apresentacao").removeClass("elemento-escondido");
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
	$("#inicio").fadeOut(400, function(){
		$(".dados-respondente").hide();
		$(".dados-respondente").removeClass("elemento-escondido");
		$(".dados-respondente").fadeIn();
	})
	$(".botao").hide();
	$("#linha").hide();
	$("#tituloExibido").parent().removeClass("elemento-escondido");
	$("#botoesPerguntas").removeClass("elemento-escondido");
});

$("#botaoAvanca").click(function(){	
	if(validarCampos()){
			alternarDivs(indice)
			indice+=1;
		}else{
			alert("Preencha todos os campos");
		}
});

function alternarDivs(indice){
	console.log(indice)
	$("#conteudo_"+indice).fadeOut(400, function(){
		console.log(indice);
		$("#conteudo_"+(indice+1)).fadeIn();
	});
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

var unicaEscolhaVertical = function(){
	 $('input[type=radio]').click(function () {
		 var td = $(this).closest('div');
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

function validarCampos(){
	debugger;
	var valid = true;
	$(".linha-resposta:visible").each(function(index, value){
		
		var valor = $(value).find("td").find("input:checked").val();
		if(!valor){
			valid =  false;	
		}
	})
	
	if(!$(".linha-resposta-vertical:visible").find("input").is(":checked")){
		valid = false;
	}else{
		var valorVertical = $(".linha-resposta-vertical").find("input:checked").val();
		if(!valorVertical || valorVertical == ""){
			valid =  false;	
		}
	}
	return valid;	
}

$(".outro:visible").on("input", function(){
	$(".recebe-outro:visible").val($(this).val());
})
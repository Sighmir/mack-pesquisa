var indice = 1;
$(function(){
	$("#item_2").hide();
	
	
	$(".botao").attr("disabled", true);
	animarTextos();
	$(".questionario").hide();
	unicaEscolhaVertical();
	unicaEscolha();
	$(".voltar").hide();

	$("body").on("input",".outro:visible", function(){
		$(".recebe-outro:visible").val($(this).val());
	})
	$("#tituloExibido").parent().removeClass("elemento-escondido");
	$("#botoesPerguntas").removeClass("elemento-escondido");
})

var animarTextos = function(){
	$(".dados-respondente").hide();
	$(".dados-respondente").removeClass("elemento-escondido");
	$(".dados-respondente").animate({
		"height": "toggle",
	 	"opacity": "toggle" 
	}, "slow");
}


$("#botaoAvanca").click(function(){	
	$("#botaoAvanca").attr("disabled", true);
	if(validarCampos()){
			alternarDivs(indice)
			indice+=1;
				if(indice == 6){
					mostrarQuestionario();
				}
				if(indice == 10){
					$("#tituloExibido").text("Indicadores");
				}
				if(indice == 15){
					$("#tituloExibido").text("Ferramentas");
					fadeAlternativo("ferramentas", "questionario");
				}
				if(indice ==17){
					$("#botaoFim").parent().removeClass("elemento-escondido");
					$("#botaoAvanca").parent().addClass("elemento-escondido");
				}
		}else{
			alert("Preencha todos os campos");
		}
	setTimeout(function(){
		$("#botaoAvanca").removeAttr("disabled");
	}, 1200);	
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
		 var td = $(this).closest('span');
         var chks = td.find('INPUT');
         for (i = 0; i < chks.length; i++) {
            chks[i].checked = false;
         }
         if (chks.length > 1)
            $(this)[0].checked = true;
     });
}

$("#botaoFim").click(function(){
	var tipo_empresa = obtemValorDadosRespondente("caracteriza-empresa");
	var quantidade_funcionarios = obtemValorDadosRespondente("quantidade-funcionarios");
	var setor = obtemValorDadosRespondente("setor-empresa");
	var setor_usuario = obtemValorDadosRespondente("setor-usuario");
	var nivel_usuario = obtemValorDadosRespondente("nivel-usuario");

	var objetivos = $(".linha-resposta").find(".objetivo");
	var Indicadores = $(".linha-resposta").find(".indicador");

	var mediaObjetivoLongoPrazo = obtemMedia(objetivos, "longo-prazo");
	var mediaObjetivoCurtoPrazo = obtemMedia(objetivos, "curto-prazo");

	var mediaIndicadorMonetario = obtemMedia(Indicadores, "monetario");
	var mediaIndicadorNaoMonetario = obtemMedia(Indicadores, "nao-monetario");
	
	var objeto = {
		"tipo_empresa" : tipo_empresa,
		"quantidade_funcionarios" : quantidade_funcionarios,
		"setor" : setor,
		"setor_usuario" : setor_usuario,
		"nivel_usuario" : nivel_usuario,
		"objetivo":{
			"curto-prazo": mediaObjetivoCurtoPrazo,
			"longo-prazo": mediaObjetivoLongoPrazo
		},
		"indicador" :{
			"monetario" : mediaIndicadorMonetario,
			"nao-monetario" : mediaIndicadorNaoMonetario
		}
	}
	console.log(objeto);

	enquadrar(objeto);

	
})

function obtemMedia(elemento, classe){
	var valor = 0;
	$(elemento).find("."+classe).each(function(index, value){
		valor += $(value).find("td").find("input:checked").val();
	})
	var numeroElementos = $(elemento).find("."+classe).length;

	return valor / numeroElementos;
}

function obtemValorDadosRespondente(id){
	return $("#"+id).find("input:checked").val()
}

function mostrarTelaFinal(dialog){
		dialog.modal('hide');
		$(".ferramentas").addClass("elemento-escondido");
		alternarDivs(indice)
		$("#botaoVolta").parent().removeClass("elemento-escondido");
		$("#botaoFim").hide();
}

$("#modalResultado").click(function(){
	$("#resultado").modal("show");
})

$("#botaoVolta").click(function(){
	location.reload(); 
})

function validarCampos(){
	var valid = true;
	$(".linha-resposta:visible").each(function(index, value){
		
		var valor = $(value).find("td").find("input:checked").val();
		if(!valor){
			valid =  false;	
		}
	})
	if($(".linha-resposta-vertical:visible").length > 0){
		if(!$(".linha-resposta-vertical:visible").find("input").is(":checked")){
			valid = false;
		}else{
			var valorVertical = $(".linha-resposta-vertical:visible").find("input:checked").val();
			console.log(valorVertical)
			if(!valorVertical || valorVertical == ""){
				valid =  false;	
			}
		}
	}
	
	return valid;	
}

function mostrarQuestionario(){
	fadeAlternativo("questionario", "dados-respondente");
	$("#tituloExibido").text("Objetivos");
}

function fadeAlternativo(classeAparecer, classeDesaparecer){
	$("."+classeAparecer).removeClass("elemento-escondido");
	$("."+classeAparecer).hide();
	$("."+classeDesaparecer).fadeToggle(function(){
		$("."+classeAparecer).fadeToggle();
	});
}

function enquadrar(objeto){
	var dialog = bootbox.dialog({
    	message: '<p><i class="fa fa-spin fa-spinner"></i> Calculando resultados...</p>',
		closeButton: false
	});
	$.ajax({
		url:"/controladoria",
		method:"post",
		dataType:"json",
		data:objeto,
		success: function(){
			mostrarTelaFinal(dialog);
		},error: function(){
			dialog.hide();
			alert("erro");
		}
	})
}
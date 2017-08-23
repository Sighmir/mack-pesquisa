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
			bootbox.dialog({message: "Preencha todos os campos"});
		}
	setTimeout(function(){
		$("#botaoAvanca").removeAttr("disabled");
	}, 1200);	
});

function alternarDivs(indice){
	$("#conteudo_"+indice).fadeOut(400, function(){
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
	var tipo_empresa = obtemValorDadosRespondente("caracteriza_empresa");
	var quantidade_funcionarios = obtemValorDadosRespondente("quantidade-funcionarios");
	var setor = obtemValorDadosRespondente("setor-empresa");
	var setor_usuario = obtemValorDadosRespondente("setor-usuario");
	var nivel_usuario = obtemValorDadosRespondente("nivel-usuario");


	var mediaObjetivoLongoPrazo = obtemMedia("linha-resposta.objetivo.longo-prazo");
	var mediaObjetivoCurtoPrazo = obtemMedia("linha-resposta.objetivo.curto-prazo");

	var mediaIndicadorMonetario = obtemMedia("linha-resposta.indicador.monetario");
	var mediaIndicadorNaoMonetario = obtemMedia("linha-resposta.indicador.nao-monetario");

	var objetivos = $(".linha-resposta.objetivo");
	var indicadores = $(".linha-resposta.indicador");
	
	
	var objeto = {
		"tipo_empresa" : tipo_empresa,
		"quantidade_funcionarios" : quantidade_funcionarios,
		"setor" : setor,
		"setor_usuario" : setor_usuario,
		"nivel_usuario" : nivel_usuario,
		"objetivo":{
			"satisfacao_colaboradores" : $(objetivos[0]).find("td").find("input:checked").val(),
			"reducao_custos" : $(objetivos[1]).find("td").find("input:checked").val(),
			"crescimento_vendas" :$(objetivos[2]).find("td").find("input:checked").val(),
			"melhoria_preco" : $(objetivos[3]).find("td").find("input:checked").val(),
			"aumento_ebitda" : $(objetivos[4]).find("td").find("input:checked").val(),
			"indice_qualidade":$(objetivos[5]).find("td").find("input:checked").val(),
			"margem_produto" : $(objetivos[6]).find("td").find("input:checked").val(),
			"reconhecimento_institucional": $(objetivos[7]).find("td").find("input:checked").val(),
			"lucratividade" : $(objetivos[8]).find("td").find("input:checked").val(),
			"rentabilidade" : $(objetivos[9]).find("td").find("input:checked").val(),
			"aquisicao" : $(objetivos[10]).find("td").find("input:checked").val(),
			"novos_mercados" : $(objetivos[11]).find("td").find("input:checked").val(),
			"inovacao" : $(objetivos[12]).find("td").find("input:checked").val(),
			"processos" : $(objetivos[13]).find("td").find("input:checked").val(),
			"endividamento" : $(objetivos[14]).find("td").find("input:checked").val(),
			"media_longo_prazo": mediaObjetivoLongoPrazo,
			"media_curto_prazo": mediaObjetivoCurtoPrazo
		},
		"indicador" :{
			"ciclo_caixa" : $(indicadores[0]).find("td").find("input:checked").val(),
			"processos" : $(indicadores[1]).find("td").find("input:checked").val(),
			"despesas_vendas" : $(indicadores[2]).find("td").find("input:checked").val(),
			"funcionarios" : $(indicadores[3]).find("td").find("input:checked").val(),
			"ambientais": $(indicadores[4]).find("td").find("input:checked").val(),
			"market_share" : $(indicadores[5]).find("td").find("input:checked").val(),
			"eva" : $(indicadores[6]).find("td").find("input:checked").val(),
			"divida_liquida" : $(indicadores[7]).find("td").find("input:checked").val(),
			"ebitda" : $(indicadores[8]).find("td").find("input:checked").val(),
			"inovacao" : $(indicadores[9]).find("td").find("input:checked").val(),
			"lucro_liquido" : $(indicadores[10]).find("td").find("input:checked").val(),
			"qualidade" : $(indicadores[11]).find("td").find("input:checked").val(),
			"fluxo_caixa" : $(indicadores[12]).find("td").find("input:checked").val(),
			"margem_contribuicao" : $(indicadores[13]).find("td").find("input:checked").val(),
			"clientes" : $(indicadores[14]).find("td").find("input:checked").val(),
			"enterprise_value" : $(indicadores[15]).find("td").find("input:checked").val(),
			"margem_bruta" : $(indicadores[16]).find("td").find("input:checked").val(),
			"retorno_investimento" : $(indicadores[17]).find("td").find("input:checked").val(),
			"media_longo_prazo" : mediaIndicadorMonetario,
			"media_curto_prazo" : mediaIndicadorNaoMonetario
		}
	}
	console.log(objeto);

	enquadrar(objeto);

	
})

function obtemMedia(classe){
	var valor = 0;
	$("."+classe).each(function(index, value){
		valor += parseInt($(value).find("td").find("input:checked").val());
	})
	var numeroElementos = $("."+classe).length;

	return (valor / numeroElementos).toFixed(2);
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
		success: function(dados){
			bootbox.dialog({message: dados});
			mostrarTelaFinal(dialog);
		},error: function(erro){
			dialog.modal('hide');
			bootbox.dialog({message: erro.responseText});
		}
	})
}
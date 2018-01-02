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
	$("#tabela-pagina-2").hide();
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
				if(indice == 4){
					mostrarQuestionario();
				}
				if(indice == 8){
					$("#tituloExibido").text("Indicadores");
				}
				if(indice == 13){
					$("#tituloExibido").text("Ferramentas");
					fadeAlternativo("ferramentas", "questionario");
				}
				if(indice ==15){
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
	var ferramentas_utilizacao = $(".ferramenta.utilizacao");
	var ferramentas_importancia = $(".ferramenta.importancia");
	
	
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
		},
		"ferramenta":{
			"balanced_scorecard_utilizacao" : $(ferramentas_utilizacao[0]).find(":selected").val(),
			"balanced_scorecard_importancia" : $(ferramentas_importancia[0]).find(":selected").val(),
			"planejamento_utilizacao": $(ferramentas_utilizacao[1]).find(":selected").val(),
			"planejamento_importancia" : $(ferramentas_importancia[1]).find(":selected").val(),
			"gerenciamento_utilizacao" : $(ferramentas_utilizacao[2]).find(":selected").val(),
			"gerenciamento_importancia" : $(ferramentas_importancia[2]).find(":selected").val(),
			"orcamento_base_zero_utilizacao" : $(ferramentas_utilizacao[3]).find(":selected").val(),
			"orcamento_base_zero_importancia" : $(ferramentas_importancia[3]).find(":selected").val(),
			"orcamento_continuo_utilizacao": $(ferramentas_utilizacao[4]).find(":selected").val(),
			"orcamento_continuo_importancia": $(ferramentas_importancia[4]).find(":selected").val(),
			"gestao_utilizacao" : $(ferramentas_utilizacao[5]).find(":selected").val(),
			"gestao_importancia" : $(ferramentas_importancia[5]).find(":selected").val(),
			"lucratividade_utilizacao" : $(ferramentas_utilizacao[6]).find(":selected").val(),
			"lucratividade_importancia" : $(ferramentas_importancia[6]).find(":selected").val(),
			"custo_utilizacao" : $(ferramentas_utilizacao[7]).find(":selected").val(),
			"custo_importancia" : $(ferramentas_importancia[7]).find(":selected").val(),
			"orcamento_utilizacao" : $(ferramentas_utilizacao[8]).find(":selected").val(),
			"orcamento_importancia" : $(ferramentas_importancia[8]).find(":selected").val(),
			"margem_utilizacao" : $(ferramentas_utilizacao[9]).find(":selected").val(),
			"margem_importancia" : $(ferramentas_importancia[9]).find(":selected").val(),
			"analise_variacoes_utilizacao" : $(ferramentas_utilizacao[10]).find(":selected").val(),
			"analise_variacoes_importancia" : $(ferramentas_importancia[10]).find(":selected").val(),
			"resultado_utilizacao" : $(ferramentas_utilizacao[11]).find(":selected").val(),
			"resultado_importancia" : $(ferramentas_importancia[11]).find(":selected").val()
		}

	}

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
		$("#botaoSair").parent().removeClass("elemento-escondido");
		$("#tituloExibido").text("Teste concluído!");
		$("#botaoFim").hide();
}

$("#modalResultado").click(function(){
	$("#resultado").modal("show");
});

$("#modalFerramenta").click(function(){
	$("#ferramenta").modal("show");
});


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
			mostrarTelaFinal(dialog);
			montarGrafico(objeto);
			montarTabelaFerramentas(objeto.ferramenta);
		},error: function(erro){
			dialog.modal('hide');
			bootbox.dialog({message: erro.responseText});
		}
	})
}

function montarTabelaFerramentas(ferramenta){
	debugger;
	var nomeIcone = getIcon(ferramenta.balanced_scorecard_utilizacao, ferramenta.balanced_scorecard_importancia);
	$("#balanced-scorecard").append($("<i>").addClass("material-icons").text(nomeIcone));
	nomeIcone = getIcon(ferramenta.planejamento_utilizacao, ferramenta.planejamento_importancia);
	$("#planejamento").append($("<i>").addClass("material-icons").text(nomeIcone));
	nomeIcone = getIcon(ferramenta.orcamento_utilizacao, ferramenta.orcamento_importancia);
	$("#orcamento").append($("<i>").addClass("material-icons").text(nomeIcone));
	nomeIcone = getIcon(ferramenta.orcamento_base_zero_utilizacao, ferramenta.orcamento_base_zero_importancia);
	$("#orcamento-base-zero").append($("<i>").addClass("material-icons").text(nomeIcone));
	nomeIcone = getIcon(ferramenta.orcamento_continuo_utilizacao, ferramenta.orcamento_continuo_importancia);
	$("#orcamento-continuo").append($("<i>").addClass("material-icons").text(nomeIcone));
	nomeIcone = getIcon(ferramenta.gestao_utilizacao, ferramenta.gestao_importancia);
	$("#gestao").append($("<i>").addClass("material-icons").text(nomeIcone));
	nomeIcone = getIcon(ferramenta.gerenciamento_utilizacao, ferramenta.gerenciamento_importancia);
	$("#gerenciamento").append($("<i>").addClass("material-icons").text(nomeIcone));
	nomeIcone = getIcon(ferramenta.margem_utilizacao, ferramenta.margem_importancia);
	$("#margem-produtos").append($("<i>").addClass("material-icons").text(nomeIcone));
	nomeIcone = getIcon(ferramenta.analise_variacoes_utilizacao, ferramenta.analise_variacoes_importancia);
	$("#analise-variacoes").append($("<i>").addClass("material-icons").text(nomeIcone));
	nomeIcone = getIcon(ferramenta.lucratividade_utilizacao, ferramenta.lucratividade_importancia);
	$("#lucratividade").append($("<i>").addClass("material-icons").text(nomeIcone));
	nomeIcone = getIcon(ferramenta.resultado_utilizacao, ferramenta.resultado_importancia);
	$("#resultado-unidades").append($("<i>").addClass("material-icons").text(nomeIcone));
	nomeIcone = getIcon(ferramenta.custo_utilizacao, ferramenta.custo_importancia);
	$("#custo").append($("<i>").addClass("material-icons").text(nomeIcone));

}

function getIcon(valor1, valor2){
	if(valor1 > 5 && valor2 > 5){
		return "sentiment_very_satisfied";
	}else if(valor1 > 5 && valor2 < 6){
		return "sentiment_very_dissatisfied";
	}else if(valor1 < 6 && valor2 > 5){
		return "sentiment_very_dissatisfied";
	}else{
		return "sentiment_very_satisfied";
	}
}

function montarGrafico(objeto){
	var objetivo = objeto.objetivo;
	var indicador = objeto.indicador;

	var valorMediaObjetivo = objetivo.media_longo_prazo > objetivo.media_curto_prazo ? objetivo.media_longo_prazo : objetivo.media_curto_prazo*-1;
	var valorMediaIndicador = indicador.media_longo_prazo > indicador.media_curto_prazo ? indicador.media_longo_prazo : indicador.media_curto_prazo*-1;
	console.log(valorMediaObjetivo);
	console.log(valorMediaIndicador)
	
	Highcharts.chart('container', {

    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
	},
	credits:{
		enabled:false
	},
    legend: {
        enabled: false
    },

    title: {
        text: ''
    },

    subtitle: {
        text: ''
    },

    xAxis: {
        gridLineWidth: 1,
        title: {
            text: 'Objetivos'
        },
        labels: {
            format: '{value} '
        },
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 0,
            label: {
                rotation: 0,
                y: 15,
                style: {
                    fontStyle: 'italic'
                },
                text: ''
            },
            zIndex: 3
        }]
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Indicadores'
        },
        labels: {
            format: '{value}'
        },
        maxPadding: 0.2,
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 0,
            label: {
                align: 'right',
                style: {
                    fontStyle: 'italic'
                },
                text: '',
                x: -10
            },
            zIndex: 3
        }]
    },

    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th>{point.texto}</th></tr>'+
			'<tr><th>Média objetivos:</th><td>{point.x}</td></tr>' +
            '<tr><th>Média indicadores:</th><td>{point.y}</td></tr>',
        footerFormat: '</table>',
        followPointer: true
    },
		plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						format: '{point.name}'
					}
				}
			},

    series: [{
        data: [
			{x: 0, y:0, texto:"Origem", name:''},
			{x: 5, y:5, texto:"1º", name:'1º quadrante'},
			{x: 5, y:-5, texto:"4º", name:'4º quadrante'},
			{x: -5, y:5, texto:"2º", name:'2º quadrante'},
			{x: -5, y:-5, texto:"3º", name:'3º quadrante'},
            { x: parseFloat(valorMediaObjetivo), y: parseFloat(valorMediaIndicador), texto:"Sua empresa", name:"Você"}
        ]
	}],
	 exporting: {
        buttons: {
            contextButton: {
                menuItems: [ {
                    text: 'Exportar para PNG',
                    onclick: function () {
                        this.exportChart();
                    },
                    separator: false
                }]
            }
        }
    }

});
}

$("#retornaFerramenta").click(function(event){
	event.preventDefault();
	$("#tabela-pagina-2").fadeOut(function(){
		$("#tabela-pagina-1").fadeIn();
	});
});

$("#avancaFerramenta").click(function(event){
	event.preventDefault();
	$("#tabela-pagina-1").fadeOut(function(){
		$("#tabela-pagina-2").fadeIn();
	});
});
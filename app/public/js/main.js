var indice = 1;
var flagFerramentas = false;
$(function () {
	$("#item_2").hide();


	$(".botao").attr("disabled", true);
	animarTextos();
	$(".questionario").hide();
	unicaEscolhaVertical();
	unicaEscolha();
	$(".voltar").hide();

	$("body").on("input", ".outro:visible", function () {
		$(".recebe-outro:visible").val($(this).val());
	})
	$("#tituloExibido").parent().removeClass("elemento-escondido");
	$("#botoesPerguntas").removeClass("elemento-escondido");
	$("#tabela-pagina-2").hide();
	$("#botaoVolta").parent().addClass("elemento-escondido");
})

var animarTextos = function () {
	$(".dados-respondente").hide();
	$(".dados-respondente").removeClass("elemento-escondido");
	$(".dados-respondente").animate({
		"height": "toggle",
		"opacity": "toggle"
	}, "slow");
}


$("#botaoAvanca").click(function () {
	$("#botaoAvanca").attr("disabled", true);
	if (validarCampos()) {
		alternarDivs(indice, 1)
		indice += 1;
		if (indice > 1) {
			$("#botaoVolta").parent().removeClass("elemento-escondido");
			$("#botaoAvanca").parent().addClass("col-md-6").removeClass("col-md-12");
		}
		if (indice == 4) {
			mostrarQuestionario();
		}
		if (indice == 7) {
			$("#tituloExibido").text("Indicadores");
		}

		if (indice == 9 || indice == 12) {
			$("#botaoFim").parent().removeClass("elemento-escondido");
			$("#controles").addClass("elemento-escondido");
		}

		if(indice > 9){
			$("#botaoVolta").parent().addClass("elemento-escondido");
			$("#botaoAvanca").parent().addClass("col-md-12").removeClass("col-md-6");
		}
	} else {
		bootbox.dialog({ message: "Preencha todos os campos" });
	}
	setTimeout(function () {
		$("#botaoAvanca").removeAttr("disabled");
	}, 1200);
});
$("#botaoVolta").click(function () {

	$("#botaoVolta").attr("disabled", true);

	alternarDivs(indice, -1)
	indice -= 1;

	if (indice == 1) {
		$("#botaoVolta").parent().addClass("elemento-escondido");
		$("#botaoAvanca").parent().addClass("col-md-12").removeClass("col-md-6");
	} else {
		$("#botaoVolta").parent().removeClass("elemento-escondido");
		$("#botaoAvanca").parent().addClass("col-md-6").removeClass("col-md-12");
	}

	if(indice == 3){
		fadeAlternativo("dados-respondente", "questionario");
		$("#tituloExibido").text("");
	}
	if (indice == 6) {
		$("#tituloExibido").text("Objetivos");
	}
	setTimeout(function () {
		$("#botaoVolta").removeAttr("disabled");
	}, 1200);
})

function alternarDivs(indice, id) {
	$("#conteudo_" + indice).fadeOut(400, function () {
		$("#conteudo_" + (indice + id)).fadeIn();
	});
}

var unicaEscolha = function () {
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

var unicaEscolhaVertical = function () {
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

$("#botaoFim").click(function () {
	if(flagFerramentas){
		
	}else{
		avaliarRespostas();
	}
})

function avaliarRespostas(){
	var dialog = {};
	var quantidade_funcionarios = obtemValorDadosRespondente("quantidade-funcionarios");
	var concorrencia = obtemValorDadosRespondente("concorrência");
	var incertezas_ambientais = obtemValorDadosRespondente("incertezas-ambientas");


	var listaObjetivos = [];
	var listaIndicadores = [];

	var objetivos = $(".linha-resposta.objetivo");
	var indicadores = $(".linha-resposta.indicador");

	objetivos.each(function (index, value) {
		var tr = $(value);
		var longoPrazo = tr.find(".longo-prazo").val();

		var objetivo = new Object();
		objetivo.id = tr.find(".id").val();
		objetivo.longoPrazo = longoPrazo;
		objetivo.descricao = $(tr.find("td")[0]).text();
		objetivo.nota = tr.find("td").find("input:checked").val();

		listaObjetivos.push(objetivo);
	})

	indicadores.each(function (index, value) {
		var tr = $(value);
		var longoPrazo = tr.find(".longo-prazo").val();

		var indicador = new Object();
		indicador.id = tr.find(".id").val();
		indicador.longoPrazo = longoPrazo;
		indicador.descricao = $(tr.find("td")[0]).text();
		indicador.nota = tr.find("td").find("input:checked").val();
		listaIndicadores.push(indicador);
	})

	var objeto = {
		quantidade_funcionarios: quantidade_funcionarios,
		incertezas_ambientais: incertezas_ambientais,
		concorrencia: concorrencia,
		listaIndicadores: listaIndicadores,
		listaObjetivos: listaObjetivos
	}
	enquadrar(objeto);


}
function obtemValorDadosRespondente(id) {
	return $("#" + id).find("input:checked").val()
}

function mostrarTelaFinal(dialog) {
	dialog.modal('hide');
	$(".ferramentas").addClass("elemento-escondido");
	alternarDivs(indice)
	$("#botaoSair").parent().removeClass("elemento-escondido");
	$("#tituloExibido").text("Teste concluído!");
	$("#botaoFim").hide();
}

$("#modalResultado").click(function () {
	$("#resultado").modal("show");
});

$("#modalFerramenta").click(function () {
	$("#ferramenta").modal("show");
});

function validarCampos() {
	var valid = true;
	$(".linha-resposta:visible").each(function (index, value) {

		var valor = $(value).find("td").find("input:checked").val();
		if (!valor) {
			valid = false;
		}
	})
	if ($(".linha-resposta-vertical:visible").length > 0) {
		if (!$(".linha-resposta-vertical:visible").find("input").is(":checked")) {
			valid = false;
		} else {
			var valorVertical = $(".linha-resposta-vertical:visible").find("input:checked").val();
			if (!valorVertical || valorVertical == "") {
				valid = false;
			}
		}
	}

	return valid;
}

function mostrarQuestionario() {
	fadeAlternativo("questionario", "dados-respondente");
	$("#tituloExibido").text("Objetivos");
}

function fadeAlternativo(classeAparecer, classeDesaparecer) {
	$("." + classeAparecer).removeClass("elemento-escondido");
	$("." + classeAparecer).hide();
	$("." + classeDesaparecer).fadeToggle(function () {
		$("." + classeAparecer).fadeToggle();
	});
}

function enquadrar(objeto) {
	var dialog = bootbox.dialog({
		message: '<p><i class="fa fa-spin fa-spinner"></i> Calculando resultados...</p>',
		closeButton: false
	});
	$.ajax({
		url: "/controladoria",
		method: "post",
		dataType: "json",
		data: objeto,
		success: function (dados) {
			console.log(dados);
			verificaMedias(dados, dialog);
		}, error: function (erro) {
			dialog.modal('hide');
			bootbox.dialog({ message: "Ocorreu um erro ao processar sua avaliação. Estamos trabalhando para resolver isso. Tente novamente mais tarde" });
		}
	})
}

function montarTabelaFerramentas(ferramenta) {
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

function verificaMedias(objeto, dialog) {
	var objetivos = objeto.listaObjetivos;
	var indicadores = objeto.listaIndicadores;

	var mediaObjetivoCurto = new Media();
	var mediaObjetivoLongo = new Media();
	var mediaIndicadorCurto = new Media();
	var mediaIndicadorLongo = new Media();


	objetivos.forEach(function (objetivo) {
		if (objetivo.longoPrazo === "true") {
			mediaObjetivoLongo.valor += parseInt(objetivo.nota);
			mediaObjetivoLongo.quantidade += 1;
		} else {
			mediaObjetivoCurto.valor += parseInt(objetivo.nota);
			mediaObjetivoCurto.quantidade += 1
		}
	})
	indicadores.forEach(function (indicador) {
		if (indicador.longoPrazo === "true") {
			mediaIndicadorLongo.valor += parseInt(indicador.nota);
			mediaIndicadorLongo.quantidade += 1;
		} else {
			mediaIndicadorCurto.valor += parseInt(indicador.nota);
			mediaIndicadorCurto.quantidade += 1;
		}
	})

	var diferenca = Math.abs(mediaObjetivoCurto.calculaMedia() - mediaObjetivoLongo.calculaMedia());
	diferenca = 3;
	if (diferenca < 4) {
		flagFerramentas = true;
		exibirQuestionarioFerramentas(dialog);
	} else {
		mostrarTelaFinal(dialog);
		//montarGrafico(objeto);
	}

	//mostrarTelaFinal(dialog);
	//montarGrafico(objeto);
	//montarTabelaFerramentas(objeto.ferramenta);
}

function exibirQuestionarioFerramentas(dialog) {
	var tabela = $("#tabela_ferramenta");

	var categoriaEmpresa = $("#quantidade-funcionarios").find("input:checked").data("categoria");

	var empresaGrande = categoriaEmpresa > 2;

	$.ajax({
		url: "/controladoria/ferramenta/" + empresaGrande,
		method: "get",
		dataType: "json",
		success: function (dados) {
			debugger;
			var tbody1 = $("<tbody>")
			tbody1.attr("id", "conteudo_10")

			tbody1 = montaHTMLFerramentas(dados, tbody1, 0, 6);
			tabela.append(tbody1);

			var tbody2 = $("<tbody>")
			tbody2.attr("id", "conteudo_11")
			tbody2.addClass("elemento-escondido");

			tbody2 = montaHTMLFerramentas(dados, tbody2, 6, 12);
			tabela.append(tbody2);

			if (dados.length == 14) {
				var tbody3 = $("<tbody>")
				tbody3.attr("id", "conteudo_12")
				tbody3.addClass("elemento-escondido");

				tbody3 = montaHTMLFerramentas(dados, tbody3, 12, 14);
				tabela.append(tbody3);
			} else {
				var tbody3 = $("<tbody>")
				tbody3.attr("id", "conteudo_12")
				tbody3.addClass("elemento-escondido");

				tbody3 = montaHTMLFerramentas(dados, tbody3, 12, 18);
				tabela.append(tbody3);
			}

			$("#tituloExibido").text("Ferramentas");
			fadeAlternativo("ferramentas", "questionario");

			$("#botaoFim").parent().addClass("elemento-escondido");
			$("#controles").removeClass("elemento-escondido");
			indice += 1;
		}, complete: function () {
			dialog.modal('hide');
		}
	})
}

function montaHTMLFerramentas(dados, tbody, inicio, fim) {
	for (var i = inicio; i < fim; i++) {
		var linha = $("<tr>");
		var primeiraCelula = $("<td>")
		var segundaCelula = $("<td>")

		primeiraCelula.text(dados[i].ferr_desc);
		var select = $("<select>");
		select.addClass("ferramenta").addClass("utilizacao").addClass("form-control");
		for (var j = 1; j <= 10; j++) {
			var option = $("<option>");
			option.val(j);
			option.text(j);
			select.append(option);
		}

		segundaCelula.append(select);

		linha.append(primeiraCelula).append(segundaCelula);
		tbody.append(linha);
	}

	return tbody;
}

function getIcon(valor1, valor2) {
	if (valor1 > 5 && valor2 > 5) {
		return "sentiment_very_satisfied";
	} else if (valor1 > 5 && valor2 < 6) {
		return "sentiment_very_dissatisfied";
	} else if (valor1 < 6 && valor2 > 5) {
		return "sentiment_very_dissatisfied";
	} else {
		return "sentiment_very_satisfied";
	}
}

function montarGrafico(objeto) {
	var objetivo = objeto.objetivo;
	var indicador = objeto.indicador;

	var valorMediaObjetivo = objetivo.media_longo_prazo > objetivo.media_curto_prazo ? objetivo.media_longo_prazo : objetivo.media_curto_prazo * -1;
	var valorMediaIndicador = indicador.media_longo_prazo > indicador.media_curto_prazo ? indicador.media_longo_prazo : indicador.media_curto_prazo * -1;
	console.log(valorMediaObjetivo);
	console.log(valorMediaIndicador)

	Highcharts.chart('container', {

		chart: {
			type: 'bubble',
			plotBorderWidth: 1,
			zoomType: 'xy'
		},
		credits: {
			enabled: false
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
			pointFormat: '<tr><th>{point.texto}</th></tr>' +
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
				{ x: 0, y: 0, texto: "Origem", name: '' },
				{ x: 5, y: 5, texto: "1º", name: '1º quadrante' },
				{ x: 5, y: -5, texto: "4º", name: '4º quadrante' },
				{ x: -5, y: 5, texto: "2º", name: '2º quadrante' },
				{ x: -5, y: -5, texto: "3º", name: '3º quadrante' },
				{ x: parseFloat(valorMediaObjetivo), y: parseFloat(valorMediaIndicador), texto: "Sua empresa", name: "Você" }
			]
		}],
		exporting: {
			buttons: {
				contextButton: {
					menuItems: [{
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

$("#retornaFerramenta").click(function (event) {
	event.preventDefault();
	$("#tabela-pagina-2").fadeOut(function () {
		$("#tabela-pagina-1").fadeIn();
	});
});

$("#avancaFerramenta").click(function (event) {
	event.preventDefault();
	$("#tabela-pagina-1").fadeOut(function () {
		$("#tabela-pagina-2").fadeIn();
	});
});
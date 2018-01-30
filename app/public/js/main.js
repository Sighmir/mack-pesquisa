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

		if (indice > 9) {
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

	if (indice == 3) {
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

	if (flagFerramentas) {
		avaliarFerramentas();
	} else {
		avaliarRespostas();
	}
})

function avaliarFerramentas() {
	var arrayFerramentas = new Array();
	var dialog = bootbox.dialog({
		message: '<p><i class="fa fa-spin fa-spinner"></i> Calculando ferramentas...</p>',
		closeButton: false
	});

	var ferramentas = $(".ferramenta.utilizacao")
	ferramentas.each(function (index, value) {
		var linhaFerramenta = $(value).closest("tr");
		var id = linhaFerramenta.find(".informacoes_ferramenta").data("id");
		var nota = $(value).find(":checked").val();

		arrayFerramentas.push({ id: id, nota: nota })

	});

	$.ajax({
		url: "/controladoria/ferramenta",
		method: "post",
		dataType: "json",
		data: { arrayFerramentas: arrayFerramentas },
		success: function (dados) {
			mostrarTelaFinal(dialog);
			montarTabelaFerramentas(dados.ferramenta);
		}, error: function (erro) {
			dialog.modal('hide');
			bootbox.dialog({ message: "Ocorreu um erro ao processar sua avaliação. Estamos trabalhando para resolver isso. Tente novamente mais tarde" });
		}
	})


}

function montarTabelaFerramentas(ferramentas) {
	if (ferramentas.length > 0) {
		$("#tabela-pagina-1").find("span").text("Você deve melhorar o uso das seguintes ferramentas:");
		ferramentas.forEach(function (ferramenta) {
			var li = $("<li>")
			li.text(ferramenta.ferr_desc)
			$("#tabela-pagina-1").append(li);
		})
	}else{
		$("#tabela-pagina-1").find("span").text("Parabéns! Você demonstrou um bom uso das ferramentas propostas");
	}
}

function avaliarRespostas() {
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

$("#modalResultadoCurto").click(function () {
	$("#resultadoCurto").modal("show");
});

$("#modalResultadoLongo").click(function () {
	$("#resultadoLongo").modal("show");
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
debugger;
	var diferenca = Math.abs(mediaObjetivoCurto.calculaMedia() - mediaObjetivoLongo.calculaMedia());
	montarGrafico(mediaObjetivoCurto, mediaIndicadorCurto, "containerCurto", false);
	montarGrafico(mediaObjetivoLongo, mediaIndicadorLongo, "containerLongo", true);
	if (diferenca < 4) {
		flagFerramentas = true;
		exibirQuestionarioFerramentas(dialog);
	} else {
		mostrarTelaFinal(dialog);
	}

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
		primeiraCelula.attr("data-id", dados[i].ferr_id)
		primeiraCelula.addClass("informacoes_ferramenta");
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

function montarGrafico(mediaObjetivo, mediaIndicador, id, longoPrazo) {
	var texto = defineTexto(mediaObjetivo.calculaMedia(), mediaIndicador.calculaMedia(), longoPrazo)
	Highcharts.chart(id, {

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
				{ x: parseFloat(mediaObjetivo.calculaMedia()), y: parseFloat(mediaIndicador.calculaMedia), texto: "Sua empresa", name: "Você" }
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

function defineTexto(mediaObjetivo, mediaIndicador, longoPrazo){
	var texto = "";
		if(mediaObjetivo > 6.67 && mediaIndicador > 6.67){//1
			if(longoPrazo){
				texto = "A sua empresa tem altos objetivos de longo prazo e usa os indicadores adequados para atingir esses objetivos, parabéns"
			}else{
				texto = "A sua empresa tem altos objetivos de curto prazo e usa os indicadores adequados para atingir esses objetivos, parabéns"
			}
		}else if(mediaObjetivo > 3.34 && mediaIndicador > 6.67){//9
			texto = "Você deve rever o uso dos indicadores. Parece em excesso"
		}else if(mediaObjetivo <= 3.34 && mediaIndicador > 6.67){//2
			if(longoPrazo){
				texto = "A sua empresa não tem muito foco em atingir objetivos de longo prazo, o que pode ser considerado um risco. Reavalie sua situação. Caso seja isso mesmo, reveja o uso dos seus indicadores. O perfil é desalinhado e com potenciais riscos a longo prazo ou desperdício de tempo"
			}else{
				texto = "A sua empresa não tem muito foco em atingir objetivos de curto prazo, o que pode ser considerado um risco. Reavalie sua situação. Caso seja isso mesmo, reveja o uso dos seus indicadores. O perfil é desalinhado e com potenciais riscos a longo prazo ou desperdício de tempo"
			}
		}else if(mediaObjetivo > 6.67 && mediaIndicador > 3.34){//7
			if(longoPrazo){
				texto = "A sua empresa tem objetivos de longo prazo elevados. Parece que ainda tem alguns indicadores listados que podem ser úteis"
			}else{
				texto = "A sua empresa tem objetivos de curto prazo elevados. Parece que ainda tem alguns indicadores listados que podem ser úteis"
			}
		}else if(mediaObjetivo > 3.34 && mediaIndicador > 3.34){//5
			texto = "A sua empresa está bem alinhada, considere revisar alguns objetivos"
		}else if(mediaObjetivo <=3.34 && mediaIndicador > 3.34){//8
			if(longoPrazo){
				texto = "A sua empresa não enfatiza objetivos de longo prazo, o que pode ser um risco. Você pode estar desperdiçando tempo - reveja seus indicadores"
			}else{
				texto = "A sua empresa não enfatiza objetivos de curto prazo, o que pode ser um risco. Você pode estar desperdiçando tempo - reveja seus indicadores"
			}
		}else if(mediaObjetivo > 6.67 && mediaIndicador <= 3.34){//4
			texto = "Sua empresa corre um grande risco de não atingir os objetivos. Reveja seus indicadores"
		}else if(mediaObjetivo > 3.34 && mediaIndicador <=3.34){//6
			if(longoPrazo){
				texto = "Sua empresa tem ênfase em objetivos de longo prazo, mas não usa os indicadores adequados."
			}else{
				texto = "Sua empresa tem ênfase em objetivos de curto prazo, mas não usa os indicadores adequados."
			}
		}else if(mediaObjetivo <=3.34 && mediaIndicador <=3.34){//3
			texto = "A sua empresa não enfatiza objetivos, o que pode ser um risco. Reavalie sua situação. Se for isso mesmo, você está alinhado"
		}
	return texto;
}
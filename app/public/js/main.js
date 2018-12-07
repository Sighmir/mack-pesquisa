var indice = 0;

var tabela_dos_setes =['até 12%', 'de 12,01% a 24%','de 24,01% a 36%','de 36,01% a 48%','de 48,01% a 60%','de 60,01% a 72%','de 72,01% a 84%','acima de 84%']
var grauDeDiversificacao
var margemDeSeguranca
var conhecimentoFerramentas
var grauDeVolatilidade

$(function () {
	$("#item_2").hide();

	$("#botaoAvanca").attr("disabled", true);
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
	permitirAvanco();
})

var animarTextos = function () {
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

$("#modalLider").on("click",function(event){
	event.preventDefault();
	$("#liderPesquisa").modal("show");
});

$("#botaoAvanca").click(function () {
	$("#botaoAvanca").attr("disabled", true);
	if (validarCampos()) {
		alternarDivs(indice, 1)
		indice += 1;
		if (indice == 1) {
			$("#tituloExibido").text("Questionario");
			fadeAlternativo("dados-respondente", "apresentacao");
		}
		if (indice > 0) {
			$("#botaoVolta").parent().removeClass("elemento-escondido");
			$("#botaoAvanca").parent().addClass("col-md-6").removeClass("col-md-12");
		}

		if (indice == 10) {
			$("#botaoFim").parent().removeClass("elemento-escondido");
			$("#controles").addClass("elemento-escondido");
		}

		if (indice > 10) {
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

	if (indice == 0) {
		$("#botaoVolta").parent().addClass("elemento-escondido");
		$("#botaoAvanca").parent().addClass("col-md-12").removeClass("col-md-6");
		fadeAlternativo("apresentacao", "dados-respondente");
	} else {
		$("#botaoVolta").parent().removeClass("elemento-escondido");
		$("#botaoAvanca").parent().addClass("col-md-6").removeClass("col-md-12");
	}

	if (indice == 3) {
		fadeAlternativo("dados-respondente", "questionario");
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
	avaliarRespostas();
})

function avaliarRespostas() {
	var dialog = {};
	var faturamento_empresa = obtemValorDadosRespondente("faturamento-empresa");
	var regiao_empresa = obtemValorDadosRespondente("regiao-empresa");
	var segmento_empresa = obtemValorDadosRespondente("segmento-empresa");
	var conhecimento_ferramentas = obtemValorDadosRespondente("conhecimento-ferramentas");
	var grau_volatilidade = obtemValorDadosRespondente("grau-volatilidade");
	var margem_contribuicao = obtemValorDadosRespondente("contribuicao-percentual");
	var percentual_equilibrio = obtemValorDadosRespondente("faturamento-percentual");
	var margem_seguranca = obtemValorDadosRespondente("margem-percentual");
	var diversificacao_clientes = obtemValorDadosRespondente("representatividade-percentual");
	var nome = $('#nome').val();
	var email = $('#email').val();
	var empresa = $('#empresa').val();

	var objeto = {
		nome: nome,
		email: email,
		empresa: empresa,
		faturamento_empresa: faturamento_empresa,
		regiao_empresa: regiao_empresa,
		segmento_empresa: segmento_empresa,
		margem_contribuicao: margem_contribuicao,
		percentual_equilibrio: percentual_equilibrio,
		margem_seguranca: margem_seguranca,
		diversificacao_clientes: diversificacao_clientes,
		conhecimento_ferramentas: conhecimento_ferramentas,
		grau_volatilidade: grau_volatilidade
	}
	enquadrar(objeto);


}
function obtemValorDadosRespondente(id) {
	return $("#" + id).find("input:checked").val()
}

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

		let inputText = $(".linha-resposta-vertical:visible").find("input[type=text]")
		if (inputText.length > 0) {
			valid = true
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
			debugger;
			verificaQuadrantes(dados, dialog);
		}, error: function (erro) {
			dialog.modal('hide');
			console.log(erro);
			bootbox.dialog({ message: "Ocorreu um erro ao processar sua avaliação. Estamos trabalhando para resolver isso. Tente novamente mais tarde" });
		}
	})
}


function verificaQuadrantes(objeto, dialog) {

	grauDeDiversificacao = Number(objeto.diversificacao_clientes);
	margemDeSeguranca = Number(objeto.margem_seguranca);

	conhecimentoFerramentas = Number(objeto.conhecimento_ferramentas);
	grauDeVolatilidade = Number(objeto.grau_volatilidade);

	let quadrante = 0;
	if (grauDeDiversificacao > 3.5 && margemDeSeguranca > 3.5) quadrante = 1;
	else if (grauDeDiversificacao < 3.5 && margemDeSeguranca > 3.5) quadrante = 2;
	else if (grauDeDiversificacao < 3.5 && margemDeSeguranca < 3.5) quadrante = 3;
	else if (grauDeDiversificacao > 3.5 && margemDeSeguranca < 3.5) quadrante = 4;

	defineTexto(quadrante);
	mostrarTelaFinal(dialog);

}

function mostrarTelaFinal(dialog) {
	montarGrafico(grauDeDiversificacao, margemDeSeguranca, "container", 'Resultados');

	dialog.modal('hide');
	alternarDivs(indice, 1)

	indice += 1;
	$("#botaoSair").parent().removeClass("elemento-escondido");
	$("#tituloExibido").text("Autodiagnóstico terminado");
	$("#botaoFim").hide();
}

$("#modalResultado").click(function () {
	$("#resultado").modal("show");
});

function montarGrafico(xValue, yValue, id, texto) {
	$("#texto-feedback").text(texto)
	Highcharts.chart(id, {

		chart: {
			type: 'bubble',
			plotBorderWidth: 1,
			spacing: [15,15,15,15]
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
		},

		title: {
			text: 'Veja o alinhamento da sua organização.'
		},

		subtitle: {
			text: ''
		},

		xAxis: {
			title: {
				text: 'Grau de Diversificação'
			},
			min: -1,
			max: 8,
			tickPositions: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8],
			startOnTick: true,
			endOnTick: true,
			showFirstLabel: false,
			showLastLabel: false,
			labels: {
				step: 1,
			},
			plotLines: [{
				color: 'black',
				dashStyle: 'dot',
				width: 2,
				value: 3.5,
				zIndex: 3
			}]
		},

		yAxis: {
			title: {
				text: 'Margem de Segurança'
			},
			min: -1,
			max: 8,
			tickPositions: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8],
			startOnTick: true,
			endOnTick: true,
			showFirstLabel: false,
			showLastLabel: false,
			labels: {
				step: 1,
			},
			plotLines: [{
				color: 'black',
				dashStyle: 'dot',
				width: 2,
				value: 3.5,
				zIndex: 3
			}]
		},

		tooltip: {
			useHTML: true,
			headerFormat: '<table>',
			pointFormat: '<tr><th>{point.texto}</th></tr>' +
				'<tr><th>Grau de Diversificação:</th><td>{point.x}</td></tr>' +
				'<tr><th>Margem de Segurança:</th><td>{point.y}</td></tr>',
			footerFormat: '</table>',
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
				{ x: xValue, y: yValue, texto: "Sua empresa", name: "Você" },
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
					},
					{
						text: 'Exportar para PDF',
						onclick: function () {
							var doc = new jsPDF();
							doc.setFontSize(30);
							doc.text(12, 25, "DIAGNÓSTICO E RECOMENDAÇÕES");
							var imageData = this.createCanvas();
							doc.addImage(imageData, 'JPEG', 10, 45, 185, 125);
							doc.setFontSize(10)
							var splitText = doc.splitTextToSize($("#textoResultado").html().replace(/<br>/g, '\n'), 190);
							doc.text(10, 185, splitText);
							doc.save('chart.pdf');
						},
						separator: false
					}]
				}
			}
		}

	});
}

function defineTexto(quadrante){
	recomendacao = ''
	switch(quadrante) {
		case 1:
			recomendacao = 'Parabéns, verificamos que sua Empresa possui boa margem de segurança em relação ao ponto de equilíbrio e também possui uma boa diversificação de clientes, possuindo desta forma maior segurança nas projeções financeiras e em seu planejamento.'
			break;
		case 2:
			recomendacao = 'Sua Empresa possui uma boa margem de segurança porém a diversificação de clientes está baixa. Nossa recomendação é para que realizem uma força tarefa com o objetivo de ampliar a diversificação de clientes, pulverizando desta forma suas receitas de modo que a perda de um cliente chave não tenha um impacto muito representativo no resultado de sua Empresa.'
			break;
		case 3:
		recomendacao = 'Verificamos que sua Empresa possui baixa margem de segurança e também uma baixa diversificação de clientes, sendo assim, nossa recomendação é para que sua Empresa realizem uma força tarefa com o objetivo de ampliar a diversificação de clientes, pulverizando desta forma suas receitas, já para a margem de segurança, recomendamos que a mesma seja maior, afim de trazer maior segurança no planejamento operacional de sua Empresa.'
		break;
		case 4:
		recomendacao = 'Sua Empresa possui uma diversificação de clientes relevante, porém verificamos que a margem de segurança utilizada para as projeções gerenciais está baixa, nossa recomendamos é para que aumentem a margem de segurança, trazendo desta forma maior segurança no planejamento operacional de sua Empresa.'
			break;
	}
	if (conhecimentoFerramentas == 0) {
		recomendacao = recomendacao + '<br><br>Notamos também que em sua resposta relacionada ao nível do seu conhecimento sobre as ferramentas gerenciais tratadas nesta ferramenta que seriam sobre a margem de segurança e ponto de equilíbrio é de nenhum conhecimento, sendo assim, recomendamos que você busque o conhecimento destas ferramentas gerencias e passe a utiliza-las em suas análises gerenciais, pois elas são os pilares inicias para bom planejamento.'
	} else if (conhecimentoFerramentas == 1) {
		recomendacao = recomendacao + '<br><br>Notamos também que em sua resposta relacionada ao nível do seu conhecimento sobre as ferramentas gerenciais tratadas nesta ferramenta que seriam sobre a margem de segurança e ponto de equilíbrio é de que possui conhecimento porém não utiliza tais ferramentas, sendo assim, recomendamos que você verifique se tais ferramentas podem lhe auxiliar em suas projeções gerenciais.'
	}
	if (grauDeVolatilidade == 1 && margemDeSeguranca<2) {
		recomendacao = recomendacao + '<br><br>Adicionalmente, notamos que a volatilidade de seu faturamento é em torno de 25%, e que sua margem de segurança informada é '+tabela_dos_setes[margemDeSeguranca]+', alertamos que para que se tenha uma maior segurança nas projeções gerenciais é importante que a margem de segurança projetada seja superior ao índice de volatilidade das receitas mensais apuradas.'
	} else if (grauDeVolatilidade == 2 && margemDeSeguranca<4) {
		recomendacao = recomendacao + '<br><br>Adicionalmente, notamos que a volatilidade de seu faturamento é em torno de 25% a 50%, e que sua margem de segurança informada é '+tabela_dos_setes[margemDeSeguranca]+', alertamos que para que se tenha uma maior segurança nas projeções gerenciais é importante que a margem de segurança projetada seja superior ao índice de volatilidade das receitas mensais apuradas.'
	} else if (grauDeVolatilidade == 3 && margemDeSeguranca < 4) {
		recomendacao = recomendacao + '<br><br>Adicionalmente, notamos que a volatilidade de seu faturamento acima de 50%, e que sua margem de segurança informada é '+tabela_dos_setes[margemDeSeguranca]+', alertamos que para que se tenha uma maior segurança nas projeções gerenciais é importante que a margem de segurança projetada seja superior ao índice de volatilidade das receitas mensais apuradas.'
	} else if (grauDeVolatilidade == 4) {
		recomendacao = recomendacao + '<br><br>Alertamos que a volatilidade de suas receitas devem ser levadas em consideração no momento da definição de sua margem de segurança, sendo assim, recomendamos que verifique o faturamento mensal dos últimos meses, e veja se existe variação nos totais de receita auferida entre os meses, uma vez possuindo picos ou quedas de receita relevante, leia-se variações, tais percentuais devem ser levados em consideração para a definição de sua margem de segurança.'
	}
	$("#textoResultado").html(recomendacao);
}

// create canvas function from highcharts example http://jsfiddle.net/highcharts/PDnmQ/
(function (H) {
	H.Chart.prototype.createCanvas = function (divId) {
		var svg = this.getSVG(),
			width = parseInt(svg.match(/width="([0-9]+)"/)[1]),
			height = parseInt(svg.match(/height="([0-9]+)"/)[1]),
			canvas = document.createElement('canvas');

		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);

		if (canvas.getContext && canvas.getContext('2d')) {

			canvg(canvas, svg);

			return canvas.toDataURL("image/jpeg");

		}
		else {
			alert("Your browser doesn't support this feature, please use a modern browser");
			return false;
		}

	}
}(Highcharts));
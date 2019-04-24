var indice = 0;

var tabela7 =['até 12%', 'de 12,01% a 24%','de 24,01% a 36%','de 36,01% a 48%','de 48,01% a 60%','de 60,01% a 72%','de 72,01% a 84%','acima de 84%']
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

function obtemCategoriaDadosRespondente(id) {
	return $("#" + id).find("input:checked").data('category')
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
		url: "/controladoria-2018/dados",
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
	let quadrante = 0;

	grauDeDiversificacao = Number(obtemCategoriaDadosRespondente("representatividade-percentual"));
	margemDeSeguranca = Number(obtemCategoriaDadosRespondente("margem-percentual"));

	conhecimentoFerramentas = Number(obtemCategoriaDadosRespondente("conhecimento-ferramentas"));
	grauDeVolatilidade = Number(obtemCategoriaDadosRespondente("grau-volatilidade"));

	if (grauDeDiversificacao > 3.5 && margemDeSeguranca > 3.5) quadrante = 1; // boa margem e boa diversificacao
	else if (grauDeDiversificacao < 3.5 && margemDeSeguranca > 3.5) quadrante = 2; // boa margem e baixa diversificacao
	else if (grauDeDiversificacao < 3.5 && margemDeSeguranca < 3.5) quadrante = 3; // baixa margem e baixa diversificacao
	else if (grauDeDiversificacao > 3.5 && margemDeSeguranca < 3.5) quadrante = 4; // baixa margem e boa diversificacao

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
							var text = $("#textoResultado").html().replace(/<br>/g, '\n').replace(/\n.*<table(.*\n)*.*table>\n/g, '').split('\n\n\n')
							var imageData = this.createCanvas();
							doc.addImage(imageData, 'JPEG', 10, 40, 185, 125);
							doc.setFontSize(11)
							var splitText = doc.splitTextToSize(text[0], 190);
							doc.text(10, 175, splitText);
							if (text.length == 2) {
								var image = new Image();
								image.src = '/controladoria-2018/img/tabela.jpg';
								image.onload = () => {
									doc.addImage(image, 'JPEG', 60, 200, 85, 50);
									splitText = doc.splitTextToSize(text[1], 190);
									doc.text(10, 260, splitText);
									doc.save('chart.pdf');
								}
							} else {
								doc.save('chart.pdf');
							}
						},
						separator: false
					}]
				}
			}
		}

	});
}

function defineTexto(quadrante){
	recomendacao = {}
	switch (quadrante) {
		case 1: // boa margem e boa diversificacao
			recomendacao = 'Parabéns, verificamos que sua Empresa possui boa margem de segurança em relação ao ponto de equilíbrio e também possui uma boa diversificação de clientes, o que resulta em maior segurança nas projeções financeiras e em seu planejamento conforme recomendado pela Literatura sobre o assunto.'
			break;
		case 2: // boa margem e baixa diversificacao
			recomendacao = 'Sua Empresa possui boa margem de segurança, porém a diversificação de clientes está baixa, ou seja, sua empresa está com o faturamento muito concentrado em poucos clientes. A Literatura recomenda que quanto menor a diversificação de clientes, maior deve ser a margem de segurança. Em sendo assim, a recomendação é aumentar a diversificação, ou seja, aumentar a participação do número de clientes no faturamento total para que se tenha uma maior segurança operacional em sua Empresa, conforme exemplo a seguir:'
			recomendacao = recomendacao + `<br><br>
			<table style="border-collapse: collapse; margin-left: auto; margin-right: auto;">
				<tr style="border: 1px solid black; text-align: left; padding: 8px;">
					<th style="padding-left: 5px;">Antes da diversificação em percentual</th>
					<th></th>
				</tr>
				<tr style="border-left: 1px solid black; border-right: 1px solid black; text-align: left; padding: 8px;">
					<td style="padding-left: 5px;">Cliente 1</td>
					<td style="padding-right: 5px; text-align: right;">25%</td>
				<tr/>
				<tr style="border-left: 1px solid black; border-right: 1px solid black; text-align: left; padding: 8px;">
					<td style="padding-left: 5px;">Cliente 2</td>
					<td style="padding-right: 5px; text-align: right;">20%</td>
				</tr>
				<tr style="border-left: 1px solid black; border-right: 1px solid black; text-align: left; padding: 8px;">
					<td style="padding-left: 5px;">Cliente 3</td>
					<td style="padding-right: 5px; text-align: right;">15%</td>
				</tr>
				<tr style="border-left: 1px solid black; border-right: 1px solid black; text-align: left; padding: 8px;">
					<td style="padding-left: 5px; white-space:pre;">Demais clientes (todos com menos de 19% cada)     </td>
					<td style="padding-right: 5px; text-align: right;">40%</td>
				</tr>
				<tr style="border: 1px solid black; text-align: left; padding: 8px;">
					<th style="padding-left: 5px;">Após diversificação em percentual</th>
					<th></th>
				</tr>
				<tr style="border-left: 1px solid black; border-right: 1px solid black; text-align: left; padding: 8px;">
					<td style="padding-left: 5px;">Cliente 1</td>
					<td style="padding-right: 5px; text-align: right;">15%</td>
				</tr>
				<tr style="border-left: 1px solid black; border-right: 1px solid black; text-align: left; padding: 8px;">
					<td style="padding-left: 5px;">Cliente 2</td>
					<td style="padding-right: 5px; text-align: right;">12%</td>
				</tr>
				<tr style="border-left: 1px solid black; border-right: 1px solid black; text-align: left; padding: 8px;">
					<td style="padding-left: 5px;">Cliente 3</td>
					<td style="padding-right: 5px; text-align: right;">5%</td>
				</tr>
				<tr style="border-bottom: 1px solid black; border-left: 1px solid black; border-right: 1px solid black; text-align: left; padding: 8px;">
					<td style="padding-left: 5px;">Demais clientes (todos com menos de 5% cada)</td>
					<td style="padding-right: 5px; text-align: right;">70%</td>
				</tr>
			</table>`
			break;
		case 3: // baixa margem e baixa diversificacao
		recomendacao = 'Verificamos que sua Empresa possui baixa margem de segurança e baixa diversificação de clientes. A literatura recomenda que para uma maior segurança nas projeções gerenciais e menor exposição a riscos de incorrer em prejuízos, deve haver uma relação inversa entre diversificação de clientes e margem de segurança, ou seja, quanto menor a diversificação de clientes, maior deve ser a margem de segurança, e quanto menor a margem de segurança maior deve ser a diversificação de clientes. Atualmente sua empresa encontra-se muito vulnerável e deve concentrar seus esforços em corrigir essa situação, seja aumentando a diversificação (aumentar o número de clientes) , seja aumentando a margem de segurança (aumento de preços ou redução).'
		break;
		case 4: // baixa margem e boa diversificacao
			recomendacao = 'Sua Empresa possui uma diversificação de clientes alta, porém verificamos que a margem de segurança está baixa, a literatura recomenda que para uma maior segurança no planejamento de sua Empresa é necessária uma margem de segurança mais representativa em seu faturamento. Os esforços de sua força de vendas devem ser canalizados para esse objetivo.'
			break;
	}
	if (conhecimentoFerramentas == 0) {
		recomendacao = recomendacao + '<br><br>Notamos também que em sua resposta relacionada ao nível do seu conhecimento sobre as ferramentas gerenciais tratadas ao longo do questionário, ou seja, margem de segurança e ponto de equilíbrio, é de nenhum conhecimento. Sendo assim, recomenda-se uma leitura na literatura sobre as ferramentas gerenciais em questão.'
	} else if (conhecimentoFerramentas == 1) {
		recomendacao = recomendacao + '<br><br>Notamos também que em sua resposta relacionada ao nível do seu conhecimento sobre as ferramentas gerenciais tratadas ao longo do questionário, ou seja, margem de segurança e ponto de equilíbrio é de que possui conhecimento, porém não utiliza tais ferramentas. Por se tratar de ferramentas importantes conforme informado na Literatura, recomenda-se a utilização destas ferramentas junto a sua Empresa.'
	} else if (conhecimentoFerramentas == 2) {
		recomendacao = recomendacao + '<br><br>Notamos também que em sua resposta relacionada ao nível do seu conhecimento sobre as ferramentas gerenciais tratadas ao longo do questionário, ou seja, margem de segurança e ponto de equilíbrio é de que possui conhecimento e utiliza estas ferramentas. Parabéns, continue utilizando.'
	}
	if (grauDeVolatilidade == 0) {
		recomendacao = recomendacao + '<br><br>Adicionalmente, a volatilidade de seu faturamento é estável, isso é bom. Tente não se afastar dessa situação.'
	} else if (grauDeVolatilidade == 1 && margemDeSeguranca > 2) {
		recomendacao = recomendacao + '<br><br>Adicionalmente, a volatilidade de seu faturamento está em torno de 25%, e que sua margem de segurança informada é maior que a volatilidade de seu faturamento. Isso é bom, procure manter sempre uma margem de segurança maior que a volatilidade.'
	} else if (grauDeVolatilidade == 1 && margemDeSeguranca < 2) {
		recomendacao = recomendacao + '<br><br>Adicionalmente, notamos que a volatilidade de seu faturamento está em torno de 25%, e que sua margem de segurança informada é de '+tabela7[margemDeSeguranca]+', e, portanto, abaixo dos 25%.  A literatura recomenda que para ter uma maior segurança nas projeções gerenciais e menor risco operacional é importante que a margem de segurança projetada seja superior ao índice de volatilidade das receitas mensais apuradas.'
	} else if (grauDeVolatilidade == 2 && margemDeSeguranca > 4) {
		recomendacao = recomendacao + '<br><br>Adicionalmente, a volatilidade de seu faturamento está em torno de 50%, e que sua margem de segurança informada é maior que a volatilidade de seu faturamento. Isso é bom, procure manter sempre uma margem de segurança maior que a volatilidade.'
	} else if (grauDeVolatilidade == 2 && margemDeSeguranca < 4) {
		recomendacao = recomendacao + '<br><br>Adicionalmente, notamos que a volatilidade de seu faturamento está entre 25% a 50%, e que sua margem de segurança informada é '+tabela7[margemDeSeguranca]+', e, portanto, abaixo da volatilidade.   A literatura recomenda que para ter uma maior segurança nas projeções gerenciais e menor risco operacional é importante que a margem de segurança projetada seja superior ao índice de volatilidade das receitas mensais apuradas.'
	} else if (grauDeVolatilidade == 3 && margemDeSeguranca > 4) {
		recomendacao = recomendacao + '<br><br>Adicionalmente, a volatilidade de seu faturamento é acima de 50%, e que sua margem de segurança informada é maior que a volatilidade de seu faturamento. Isso é bom, procure manter sempre uma margem de segurança maior que a volatilidade.'
	} else if (grauDeVolatilidade == 3 && margemDeSeguranca < 4) {
		recomendacao = recomendacao + '<br><br>Adicionalmente, notamos que a volatilidade de seu faturamento acima de 50%, e que sua margem de segurança informada é '+tabela7[margemDeSeguranca]+', e, portanto, abaixo da volatilidade. A Literatura recomenda que para ter uma maior segurança nas projeções gerenciais e menor risco operacional é importante que a margem de segurança projetada seja superior ao índice de volatilidade das receitas mensais apuradas.'
	} else if (grauDeVolatilidade == 4) {
		recomendacao = recomendacao + '<br><br>Estudos e a Literatura demonstram que o risco operacional de sua Empresa está também relacionado a variação de suas receitas e margem de segurança, pois as variações de receita devem ser levadas em consideração no momento da definição de sua margem de segurança.'
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
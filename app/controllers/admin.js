var addSubtractDate = require("add-subtract-date");
var moment = require('moment');
var nodeExcel=require('excel-export');
module.exports = function(app){
            app.get("/controladoria/admin/home", function(req, res){

            var dataLogin =  createDateAsUTC(new Date(req.session.loggedTime));
            var dataAtual = new Date();

            var dataLimite = createDateAsUTC(addSubtractDate.subtract(dataAtual, 30, "minutes"));
        
            if(dataLimite > dataLogin){
                req.session.destroy();
                res.redirect("/controladoria/login");
                return;
            }

            var connection = new app.infra.ConnectionFactory();
            var usuarioDAO = new app.persistencia.UsuarioDAO(connection);

            usuarioDAO.listar(function(erro, resultado){
                if(erro){
                    res.render("home/admin", {lista:undefined, moment:moment});
                    return;
                }
                 res.render("home/admin", {lista:resultado, moment});
            });
            connection.end();
        });

        app.put("/controladoria/admin/acesso", function(req, res){
            var objeto = req.body;

            var connection = new app.infra.ConnectionFactory();
            var usuarioDAO = new app.persistencia.UsuarioDAO(connection);
            console.log(objeto)
            if(req.session.email != objeto.email){
                usuarioDAO.atualizaAcesso(objeto, function(erro, resultado){
                    if(erro){
                        res.status(500).json("Erro");
                        return;
                    }else{
                        res.status(200).json("Operação realizada com sucesso");
                    }
                });
            }else{
                res.status(500).json("Erro");
            }

            connection.end();
        })

        app.get("/controladoria/admin/excel", function(req,res){
             var conf={}
            conf.cols= montaColunasExcel();

            var connection = new app.infra.ConnectionFactory();
            var excelDAO = new app.persistencia.ExcelDAO(connection);

            excelDAO.extrairDados(function(erro, linhas){
                if(erro){
                    res.status(500);
                    res.end("Erro ao realizar download");
                    return;
                }
                var arrayLinhas = [];
                for(i=0; i<linhas.length;i++){
                    var a = [i+1, linhas[i].nome, linhas[i].email, linhas[i].satisfacao_colaboradores, linhas[i].reducao_custos,linhas[i].crescimento_vendas, linhas[i].melhoria_preco, linhas[i].aumento_ebitda, linhas[i].indice_qualidade, linhas[i].margem_produto, linhas[i].reconhecimento_institucional, linhas[i].lucratividade, linhas[i].rentabilidade, linhas[i].aquisicao,linhas[i].novos_mercados, linhas[i].inovacao, linhas[i].processos, linhas[i].endividamento, linhas[i].ciclo_caixa,linhas[i].processos, linhas[i].despesas_vendas, linhas[i].funcionarios, linhas[i].ambientais, linhas[i].market_share, linhas[i].eva,linhas[i].divida_liquida, linhas[i].ebitda, linhas[i].inovacao, linhas[i].lucro_liquido, linhas[i].qualidade, linhas[i].fluxo_caixa, linhas[i].margem_contribuicao, linhas[i].clientes, linhas[i].enterprise_value, linhas[i].margem_bruta, linhas[i].retorno_investimento, linhas[i].obj_curto_prazo,linhas[i].obj_longo_prazo, linhas[i].ind_curto_prazo,linhas[i].ind_longo_prazo ];
                    arrayLinhas.push(a);
                }
                    conf.rows = arrayLinhas;
                    var result=nodeExcel.execute(conf);
                    res.setHeader('Content-Type','application/vnd.openxmlformates');
                    res.setHeader("Content-Disposition","attachment;filename="+"dados.xlsx");
                    res.end(result,'binary');
            })
            
        })

}

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function montaColunasExcel(){
  return  [{
                caption:'Id',
                type:'number',
                width:3
            },
            {
                caption:'Nome',
                type:'string',
                width:50
            },
            {
                caption:'email',
                type:'string',
                width:15
            },
            {
                caption:'Melhorar a satisfacao dos colaboradores',
                type:'number',
                width:3,
            },
            {
                caption:'Redução de Custos',
                type:'number',
                width:3,
            },
            {
                caption:'Crescimento de Vendas',
                type:'number',
                width:3,
            },
            {
                caption:'Melhoria do Preço da Ação',
                type:'number',
                width:3,
            },
            {
                caption:'Aumento da EBITDA',
                type:'number',
                width:3,
            },
            {
                caption:'Melhoriar índices relacionados a qualidade',
                type:'number',
                width:3,
            },
            {
                caption:'Melhoria da margem de produtos',
                type:'number',
                width:3,
            },
            {
                caption:'Melhorar o reconhecimento institucional da empresa',
                type:'number',
                width:3,
            },
            {
                caption:'Melhoria da lucratividade',
                type:'number',
                width:3,
            },
            {
                caption:'Melhoria da rentabilidade do capital empregado(ROI)',
                type:'number',
                width:3,
            },
            {
                caption:'Crescer por aquisição',
                type:'number',
                width:3,
            },
            {
                caption:'Conquistar novos mercados',
                type:'number',
                width:3,
            },
            {
                caption:'Inovação de produtos e serviços',
                type:'number',
                width:3,
            },
            {
                caption:'Melhoria dos Processos',
                type:'number',
                width:3,
            },
            {
                caption:'Diminuir o endividamento',
                type:'number',
                width:3,
            },
            {
                caption:'Ciclo de caixa em dias',
                type:'number',
                width:3,
            },
            {
                caption:'Processos (produtividade, segurança e tempo)',
                type:'number',
                width:3,
            },
            {
                caption:'SG&A - Despesas com vendas e administrativas em % das receita',
                type:'number',
                width:3,
            },
            {
                caption:'Funcionários (atratividade, retenção, satisfação)',
                type:'number',
                width:3,
            },
            {
                caption:'Ambientais (emissão de CO2, acidentes ambientais)',
                type:'number',
                width:3,
            },
            {
                caption:'Market share',
                type:'number',
                width:3,
            },
            {
                caption:'EVA (lucro econômico)',
                type:'number',
                width:3,
            },
            {
                caption:'Dívida líquida (EBITDA)',
                type:'number',
                width:3,
            },
            {
                caption:'EBITDA',
                type:'number',
                width:3,
            },
            {
                caption:'Inovação (P&D, Tempo de Desenvolvimento de Produto/Serviço, índice de sucesso de novos produtos)',
                type:'number',
                width:3,
            },
            {
                caption:'Lucro líquido',
                type:'number',
                width:3,
            },
            {
                caption:'Qualidade (índice de conformidade)',
                type:'number',
                width:3,
            },
            {
                caption:'Fluxo de caixa',
                type:'number',
                width:3,
            },
            {
                caption:'Margem de contribuição em $ ou %',
                type:'number',
                width:3,
            },
            {
                caption:'Clientes (por exemplo, retenção, satisfação)',
                type:'number',
                width:3,
            },
            {
                caption:'Enterprise value / EBITDA',
                type:'number',
                width:3,
            },
            {
                caption:'Margem bruta em %',
                type:'number',
                width:3,
            },
            {
                caption:'ROI ou ROIC (retorno sobre investimento',
                type:'number',
                width:3,
            },
            {
                caption:'Média de objetivos longo prazo',
                type:'number',
                width:3,
            },
            {
                caption:'Média de objetivos curto prazo',
                type:'number',
                width:3,
            },
            {
                caption:'Média indicadores longo prazo',
                type:'number',
                width:3,
            },
            {
                caption:'Média indicadores curto prazo',
                type:'number',
                width:3,
            }
            
        ];
}
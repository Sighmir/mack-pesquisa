$(function(){
    $("#tabela").DataTable({
        searching:false,
        language:{
            infoEmpty: "Não há registros salvos",
            paginate: {
                "previous": "Anterior",
                "next": "Próximo"
            },
            
        },
        pageLength: 5
    });
    $("#tabela_length").hide();
    $("#tabela_info").hide();
})

$(".concedeAcesso").click(function(){
    var email = $(this).closest("tr").find(".email").text();
    acesso = "ADMIN";
    realizaRequisicao(email, acesso, "Permissão de administrador concedida");
});

$(".revogaAcesso").click(function(){
    var email = $(this).closest("tr").find(".email").text();
    acesso = "";
    realizaRequisicao(email, acesso, "Permissão de administrador revogada");
})


function realizaRequisicao(email, acesso, mensagem){
    var dialog = bootbox.dialog({
    	message: '<p><i class="fa fa-spin fa-spinner"></i> Calculando resultados...</p>',
		closeButton: false
    });
    
    $.ajax({
        url:"/controladoria/admin/acesso",
        data:{email:email, acesso:acesso},
        dataType:"json",
        method:"PUT",
        success:function(){
            dialog.modal("hide");
            bootbox.dialog({message: mensagem})
            setTimeout(function(){
                location.reload();
            }, 2000);
        },
        error:function(){
            dialog.modal("hide");
            bootbox.dialog({message:"Erro ao executar operação"})
        }
    })
}
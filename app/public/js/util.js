function GrauDeDiversificacao() {
    this.top5 = 0;
    this.periodo = 1;
}

GrauDeDiversificacao.prototype.calculaGrau = function () {
    return (this.top5 * this.periodo / 100) * (this.top5 * this.periodo / 100);
}


function MargemDeSeguranca() {
    this.projetada = 0;
    this.minima = 0;
}

MargemDeSeguranca.prototype.calculaMargem = function(){
    return ((projetada - minima) / minima);
}
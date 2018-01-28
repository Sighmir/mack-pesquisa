function Media(){
    this.valor = 0;
    this.quantidade = 0;
}

Media.prototype.calculaMedia = function(){
    return Math.round(this.valor / this.quantidade);
}
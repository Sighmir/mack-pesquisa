function Media(){
    this.valor = 0;
    this.quantidade = 0;
}

Media.prototype.calculaMedia = function(){
    var media =  (this.valor / this.quantidade)
    return parseFloat(media.toFixed(2));
}
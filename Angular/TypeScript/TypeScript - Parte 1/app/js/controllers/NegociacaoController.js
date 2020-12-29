class NegociacaoController {
    constructor() {
        this._inputData = document.getElementById('data');
        this._inputQuantidade = document.getElementById('quantidade');
        this._inputValor = document.getElementById('valor');
    }
    add(event) {
        event.preventDefault();
        const negociacao = new Negociacao(new Date(this._inputData.value.replace(/-/g, '/')), +this._inputQuantidade.value, +this._inputValor.value);
        console.log(negociacao);
    }
}

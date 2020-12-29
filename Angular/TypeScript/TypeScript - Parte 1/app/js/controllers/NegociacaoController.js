class NegociacaoController {
    constructor() {
        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._mensagemView = new MensagemView('#mensagemView');
        this._inputData = document.getElementById('data');
        this._inputQuantidade = document.getElementById('quantidade');
        this._inputValor = document.getElementById('valor');
        this._negociacoesView.update(this._negociacoes);
    }
    add(event) {
        event.preventDefault();
        const negociacao = new Negociacao(new Date(this._inputData.value.replace(/-/g, '/')), +this._inputQuantidade.value, +this._inputValor.value);
        this._negociacoes.add(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }
}

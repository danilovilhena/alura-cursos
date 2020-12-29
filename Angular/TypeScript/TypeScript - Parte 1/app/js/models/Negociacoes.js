class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    add(negociacao) {
        this._negociacoes.push(negociacao);
    }
    paraArray() {
        return [].concat(this._negociacoes);
    }
}

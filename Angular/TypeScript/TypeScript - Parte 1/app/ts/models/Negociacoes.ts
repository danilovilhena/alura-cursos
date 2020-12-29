class Negociacoes {
    private _negociacoes: Array<Negociacao> = []

    add(negociacao: Negociacao): void{
        this._negociacoes.push(negociacao)
    }

    paraArray(): Negociacao[] {
        return [].concat(this._negociacoes)
    }
}
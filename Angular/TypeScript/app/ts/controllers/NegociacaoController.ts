import { Negociacao, Negociacoes } from '../models/index'
import { MensagemView, NegociacoesView } from '../views/index'
import { domInject } from '../helpers/decorators/index'
export class NegociacaoController {
    @domInject('#data')
    private _inputData: JQuery

    @domInject('#quantidade')
    private _inputQuantidade: JQuery

    @domInject('#valor')
    private _inputValor: JQuery

    private _negociacoes = new Negociacoes()
    private _negociacoesView = new NegociacoesView('#negociacoesView')
    private _mensagemView = new MensagemView('#mensagemView')

    constructor() {
        this._negociacoesView.update(this._negociacoes)
    }

    add(event: Event): void{
        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, '/'))

        if(!this.diaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return 
        }

        const negociacao = new Negociacao(
            data,
            +this._inputQuantidade.val(), 
            +this._inputValor.val()
        )

        this._negociacoes.add(negociacao)
        this._negociacoesView.update(this._negociacoes)
        this._mensagemView.update('Negociação adicionada com sucesso!')
    }

    private diaUtil(data: Date): boolean {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}
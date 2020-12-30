import { Negociacao, Negociacoes } from '../models/index'
import { MensagemView, NegociacoesView } from '../views/index'
import { domInject, throttle } from '../helpers/decorators/index'
import { NegociacaoService } from '../services/index'
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

    private _service = new NegociacaoService()

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
    
    @throttle()
    importData() {
        function isOk(res: Response){
            if(res.ok)
                return res
            else
                throw new Error(res.statusText)
        }

        this._service
            .obterNegociacoes(isOk)
            .then(negociacoes => {
                negociacoes.forEach((negociacao: Negociacao) => this._negociacoes.add(negociacao))
                this._negociacoesView.update(this._negociacoes)
            })
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
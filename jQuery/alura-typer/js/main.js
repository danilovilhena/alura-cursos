const tempoInicial = $('#tempo-digitacao').text()
const campo = $('.campo-digitacao')

$(function() {
    atualizarTamanhoFrase()
    inicializarContadores()
    inicializarInterval()
    inicializarMarcadores()
    $("#botao-reiniciar").click(reiniciarJogo)
})

// Relacionado à introdução
function atualizarTamanhoFrase() {
    let frase = $(".frase").text()
    let numPalavras = frase.split(' ').length
    let tamanhoFrase = $('#tamanho-frase')
    tamanhoFrase.text(numPalavras)
}

// Relacionado à digitação
function inicializarContadores() {
    let contadorCaracteres = $('#contador-caracteres')
    let contadorPalavras = $('#contador-palavras')
    campo.on('input', function () {
        let conteudo = campo.val()

        let qntdPalavras = conteudo.split(/\S+/).length - 1
        $('#contador-palavras').text(qntdPalavras)

        let qntdCaracteres = conteudo.length
        $('#contador-caracteres').text(qntdCaracteres)
    })
}

// Relacionado ao game over
function inicializarInterval() {
    let tempoRestante = $('#tempo-digitacao').text()
    campo.one('focus', function () {
        let intervalID = setInterval(() => {
            tempoRestante--
            $('#tempo-digitacao').text(tempoRestante)
            if(tempoRestante == 0){
                finalizarJogo()
                clearInterval(intervalID)
            }
        }, 1000);
    })
}

// Relacionado ao restart
function reiniciarJogo(){
    campo.attr('disabled', false)
    campo.val('')
    $('#contador-palavras').text('0')
    $('#contador-caracteres').text('0')
    $('#tempo-digitacao').text(tempoInicial)
    inicializarInterval()
    campo.removeClass("campo-desativado")
    campo.removeClass('borda-certa')
    campo.removeClass('borda-errada')
}

// Relacionado ao fim do jogo
function finalizarJogo() {
    campo.attr("disabled", true);
    campo.removeClass("campo-desativado");
    inserirPlacar();
}

// Relacionado à modificar a cor da borda
function inicializarMarcadores(){
    let frase = $(".frase").text()
    campo.on("input", function() {
        let digitado = campo.val()
        let comparavel = frase.substr(0, digitado.length)
    
        if (digitado == comparavel){
            campo.addClass('borda-certa')
            campo.removeClass('borda-errada')
        } else {
            campo.addClass('borda-errada')
            campo.removeClass('borda-certa')
        }
    })
}
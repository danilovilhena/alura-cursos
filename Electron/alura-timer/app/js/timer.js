const { ipcRenderer } = require('electron')
const moment = require('moment');

let segundos = 0;
let timer;
let tempo;

function iniciar(el){
    tempo = moment.duration(el.textContent)
    segundos = tempo.asSeconds()
    clearInterval(timer)
    timer = setInterval(() => {
        segundos++
        el.textContent = segundosParaTempo(segundos)
    }, 1000);
}

function parar(curso){
    clearInterval(timer)
    let tempoEstudado = segundosParaTempo(segundos)
    ipcRenderer.send('curso-parado', curso, tempoEstudado)
}

function segundosParaTempo(segundos){
    return moment().startOf('day').seconds(segundos).format("HH:mm:ss")
}

module.exports = {
    iniciar,
    parar
}
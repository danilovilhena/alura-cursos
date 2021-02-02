const { ipcRenderer } = require('electron');
const timer = require('./timer')
const data = require('../../data')

let linkSobre = document.querySelector('#link-sobre')
let botaoPlay = document.querySelector('.botao-play')
let curso = document.querySelector('.curso')
let tempo = document.querySelector('.tempo')

window.onload = () => {
    data.pegaDados(curso.textContent)
        .then((dados)=>{
            tempo.textContent = dados.tempo;
        });
}

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
})

let imgs = ['img/play-button.svg', 'img/stop-button.svg']
let play = false

botaoPlay.addEventListener('click', function(){
    imgs = imgs.reverse()
    botaoPlay.src = imgs[0]
    play ? timer.parar(curso.textContent) : timer.iniciar(tempo)
    play = !play
})

ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
    data.pegaDados(nomeCurso).then((dados) => {
        tempo.textContent = dados.tempo
        curso.textContent = nomeCurso;
    })
})
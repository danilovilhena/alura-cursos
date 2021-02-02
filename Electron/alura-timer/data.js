const jsonfile = require('jsonfile-promised')
const fs = require('fs')

function salvaDados(curso, tempoEstudado){
    let arquivoDoCurso = __dirname + '/data/' + curso + '.json';
    if(fs.existsSync(arquivoDoCurso)){
        //Salvar Dados
        this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
    }else{
        // Criar Arquivo 
        this.criaArquivoDeCurso(arquivoDoCurso, {})
            .then(()=>{
                // Salvar Dados
                this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
            })
    }
}

function adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado){
    let dados = {
        ultimoEstudo: new Date().toString(),
        tempo: tempoEstudado
    }

    jsonfile.writeFile(arquivoDoCurso, dados, {spaces: 2})
        .then(()=>{
            console.log('Tempo salvo com sucesso')
        }).catch((err) => {
            console.log(err);
        })
}

function criaArquivoDeCurso(nomeArquivo,conteudoArquivo){
    return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
        .then(()=>{
            console.log('Arquivo Criado');
        }).catch((err) => {
            console.log(err);
        })
}

function pegaDados(curso){
    let arquivoDoCurso = __dirname + '/data/' + curso + '.json';
    return jsonfile.readFile(arquivoDoCurso);
}

function pegaNomeDosCursos(){
    let arquivos = fs.readdirSync(__dirname + '/data/')
    return arquivos.map((arquivo) => {
        return arquivo.split('.')[0]
    })
}

module.exports = {
    salvaDados,
    adicionaTempoAoCurso,
    criaArquivoDeCurso,
    pegaDados,
    pegaNomeDosCursos
}
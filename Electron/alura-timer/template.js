const data = require('./data')
function geraTrayTemplate(window) {
    let template = [
        {'label': 'Cursos'},
        {'type': 'separator'},
    ]
    let cursos = data.pegaNomeDosCursos();
    cursos.forEach((curso) => {
        let menuItem = {label: curso, type: 'radio', click: () => {window.send('curso-trocado', curso)}}
        template.push(menuItem)
    })
    return template;
}

module.exports = {
    geraTrayTemplate
}
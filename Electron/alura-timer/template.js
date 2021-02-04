const data = require('./data')
const { ipcMain } = require('electron')

module.exports = {
    templateInicial: null,
    geraTrayTemplate (window){
        let template = [
            {'label': 'Cursos'},
            {'type': 'separator'},
        ]
        let cursos = data.pegaNomeDosCursos();
        cursos.forEach((curso) => {
            let menuItem = {label: curso, type: 'radio', click: () => {window.send('curso-trocado', curso)}}
            template.push(menuItem)
        })
        this.templateInicial = template;
        return template;
    },
    adicionaCursoNoTray(curso, win) {
        this.templateInicial.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('curso-trocado', curso);
            }
        });

        return this.templateInicial;
    },
    geraMenuPrincipalTemplate (app){
        let templateMenu = [
            {label: 'View',
                submenu: [
                    { role: 'reload' },
                    { role: 'toggledevtools' }
                ]
            },
            {label: 'Window',
                submenu: [
                    { role: 'minimize' },
                    { role: 'close' }
                ]
            },
            {label: 'Sobre',
                submenu: [
                    { 
                        label: 'Sobre o Alura Timer',
                        accelerator: 'CommandOrControl+I',
                        click: () => { ipcMain.emit('abrir-janela-sobre'); }
                    }
                ]
            }
        ];
        
        if(process.platform == 'darwin') {
            templateMenu.unshift({
                label: app.getName(),
                submenu: [
                    { label: 'Estou rodando no Mac!' }
                ]
            });
        }

        return templateMenu
    }
}
const controller = new NegociacaoController();

document.getElementsByTagName('form')[0].addEventListener('submit', controller.add.bind(controller))
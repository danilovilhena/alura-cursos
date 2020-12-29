const controller = new NegociacaoController();

$('form').submit(controller.add.bind(controller))
;(function (window, document, undefined) {
  var Gutenberg = window.Gutenberg || {};
  // local methods
  var template = null;
  var run = null;
  
  template = Gutenberg.template = require('./module/template');

  function gutenbergRunHandler () {
    var board = document.getElementById('board');
    var ctx = { message: 'Olá, comece por aqui...' };
    var content = template( board.getAttribute('placeholder') || '' );

    board.setAttribute( 'placeholder', content.compile( ctx ) );

    return Gutenberg;
  }
  run = Gutenberg.run = gutenbergRunHandler;

  run();
})(window, document, undefined);

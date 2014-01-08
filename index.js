;(function (window, document, undefined) {
  var Gutenberg = window.Gutenberg || {};
  // 3 modules
  var timestamp = require('monotonic-timestamp');
  var gui = require('nw.gui');
  // messages
  var config = require('./config');
  // local methods
  var template = null;
  var run = null;

  var saveButton = null;
  
  template = Gutenberg.template = require('./module/template');

  function gutenbergSetMenuHandler () {
    var main = new gui.Menu({
      type: 'menubar'  
    });  
    var file = new gui.MenuItem({
      label: 'Arquivo'  
    });
    var itemSave = saveButton = new gui.MenuItem({
      label: 'Salvar'  
    });
    var fileSubmenu = new gui.Menu();

    main.append( file );
    fileSubmenu.append( itemSave );
    file.submenu = fileSubmenu;
    gui.Window.get().menu = main;

    return Gutenberg;
  }

  function gutenbergSetBoardHandler () {
    var board = document.getElementById('board');
    var ctx = { message: config.message };
    var content = template( board.getAttribute('placeholder') || '' );

    board.setAttribute( 'placeholder', content.compile( ctx ) );
    board.focus();

    return Gutenberg;
  }

  function gutenbergEnableSaveAsHandler () {
    var saveBtn = saveButton;
    var board = document.getElementById('board');
    var content = '';
    var blob = null;
    var filename = null;

    function saveBtnClickHandler () {
      content += board.value;
      blob = new Blob( [ content ], { type: 'text/plain;charset=utf-8' } );
      filename = window.prompt('Qual o nome do arquivo?');
      if ( !filename ) filename = timestamp();
      filename += '.txt';
      saveAs( blob, filename );
    }
    saveBtn.click = saveBtnClickHandler;

    return Gutenberg;  
  }

  function gutenbergRunHandler () {
    gutenbergSetMenuHandler();
    gutenbergSetBoardHandler();
    gutenbergEnableSaveAsHandler();

    return Gutenberg;
  }
  run = Gutenberg.run = gutenbergRunHandler;

  run();
})(window, document, undefined);

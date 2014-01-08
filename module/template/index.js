var root = this; 
var template = null;
// identifiers
var s = '{{';
var e = '}}';

function templateDelimiterHandler ( content, pointer ) {
  var out = [];
  var start = s;
  var end = e;
  var pointer = ( pointer || 0 );

  out.push( content.indexOf( start, pointer ) );
  out.push( content.indexOf( end, pointer + 1 ) );
  out.push( content.slice( out[0] + start.length, out[1] ) );

  return out;
}
root.delimiter = templateDelimiterHandler;

function templateReplaceHandler ( content, ctx ) {
  var out = content;
  var keys = Object.keys( ctx );

  function keyMapHandler ( item, idx, c ) {
    var self = this;

    while ( out.match( item ) ) {
      out = out.replace( item, self[ item ] );
    }
  }
  keys.map( keyMapHandler.bind( ctx ) );
  
  return out;
}
root.replace = templateReplaceHandler;

function templateCompileHandler ( ctx ) {
  var self = this;
  var out = self.content;
  var piece = null;
  var delimitation = null;
  var content = null;
  var start = s;
  var end = e;

  while ( root.delimiter( out )[0] !== -1 ) {
    delimitation = root.delimiter( out );
    content = delimitation[2];
    delimitation[2] = root.replace( content, ctx );

    out = out.replace( start + content + end, delimitation[2] );
  }

  return out;
}

function templateMainHandler ( content ) {
  var self = {};
  var ctx = {};

  ctx.content = content;

  self.compile = templateCompileHandler.bind( ctx );

  return self;
}
template = templateMainHandler;

template.delimiter = root.delimiter;
template.replace = root.replace;

module.exports = exports = template;

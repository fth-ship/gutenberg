var should = require('should');
var template = require('./');

describe('Template', function () {
  it('delimiter', function () {
    var actual = '{{ hello }}';  
    var expected = [
      0, 9, ' hello '
    ];

    template
      .delimiter( actual )
      .should
      .eql( expected );
  });

  it('delimiter forward', function () {
    var actual = '{{ hello }} {{ world }}';  
    var expected = [
      12, 21, ' world '
    ];

    template
      .delimiter( actual, 9 )
      .should
      .eql( expected );
  });

  it('replace', function () {
    var actual = ' hello ';  
    var expected = ' buzz ';
    var ctx = {
      hello: 'buzz'  
    };

    template
      .replace( actual, ctx )
      .should
      .eql( expected );
  });

  it('replace forward', function () {
    var actual = ' hello, hello ';  
    var expected = ' buzz, buzz ';
    var ctx = {
      hello: 'buzz'  
    };

    template
      .replace( actual, ctx )
      .should
      .eql( expected );
  });

  it('context', function () {
    var actual = '{{ hello }} {{ world }}';
    var expected = ' fizz   buzz ';
    var ctx = {
      hello: 'fizz',
      world: 'buzz'
    };
    var current = template( actual );

    current
      .compile( ctx )
      .should
      .eql( expected );
  });  
});

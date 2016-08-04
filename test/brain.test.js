var brain = require('../index');
var expect = require('chai').expect;

describe('Brain', function() {
  it('should generate css from flat array', function() {
    var input = {
      item1: [50,50,100,100]
    }

    var elementSize = {
      width: 100,
      height: 100
    };

    var namespace = 'mynamespace';
    var mixinName = 'the-sass-mixin-name';

    var expectedOutput = [
      '@keyframes mynamespace-item1 {',
      '\t0% { transform: translate(0%, 0%); }',
      '\t100% { transform: translate(50.00%, 50.00%); }',
      '}',
      '.animated-mynamespace-item1 {',
      '\t@include the-sass-mixin-name(mynamespace-item1);',
      '}'
    ].join('\n');

    var output = brain.generateCss(input, namespace, elementSize.width, elementSize.height, mixinName);
    expect(output).to.equal(expectedOutput);
  });

  it('should interpolate', function() {
    var input = {
      item1: [50,50,100,100, 400, 500, 600, 700]
    }

    var elementSize = {
      width: 100,
      height: 100
    };

    var namespace = 'mynamespace';
    var mixinName = 'the-sass-mixin-name';

    var output = brain.generateCss(input, namespace, elementSize.width, elementSize.height, mixinName);
    expect(output.split('\n').length).to.be.above(30);
  });
});
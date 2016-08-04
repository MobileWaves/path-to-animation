var expect = require('chai').expect;
var css = require('../css');

describe('CSS', function() {
  it('should create keyframes for 2 items only', function() {
    var sourcePathInPercentages = [
      ['0%', '0%'],
      ['50%', '70%']
    ];

    var expectedKeyframes = [
      '0% { transform: translate(0%, 0%); }',
      '100% { transform: translate(50%, 70%); }'
    ];

    expect(css.createKeyframes(sourcePathInPercentages)).to.eql(expectedKeyframes);
  });

  it('should create keyframes for more than 2 items', function() {
    var sourcePathInPercentages = [
      ['0%', '0%'],
      ['100%', '200%'],
      ['50%', '70%']
    ];

    var expectedKeyframes = [
      '0% { transform: translate(0%, 0%); }',
      '33% { transform: translate(100%, 200%); }',
      '67% { transform: translate(50%, 70%); }',
      '100% { transform: translate(50%, 70%); }'
    ];

    expect(css.createKeyframes(sourcePathInPercentages)).to.eql(expectedKeyframes);
  });

  it('should generate css class name', function() {
    var namespace = 'namespace';
    var itemName = 'element20';

    var expectedName = 'animated-namespace-element20';

    expect(css.generateClassName(namespace, itemName)).to.equal(expectedName);
  });

  it('should generate css @keyframes', function() {
    var namespace = 'namespace';
    var itemName = 'element20';
    var keyframesValues = [
      '0% { transform: translate(0%, 0%); }',
      '100% { transform: translate(50%, 70%); }'
    ];

    var expectedName = 'namespace-element20';

    var expectedResult = [
      '@keyframes ' + expectedName + ' {',
      '\t0% { transform: translate(0%, 0%); }',
      '\t100% { transform: translate(50%, 70%); }',
      '}\n'
    ].join('\n');

    expect(css.generateCssKeyframes(keyframesValues, namespace, itemName)).to.equal(expectedResult);
  });

  it('should generate css class with content', function() {
    var namespace = 'namespace';
    var itemName = 'item1';
    var animationName = 'customname-animation';

    var expectedResult = [
      '.animated-namespace-item1 {',
      '\t@include customname-animation(namespace-item1);',
      '}'
    ].join('\n');

    expect(css.generateCssClass(namespace, itemName, animationName)).to.equal(expectedResult);
  });
});
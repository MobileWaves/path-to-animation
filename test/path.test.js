var path = require('../path');
var expect = require('chai').expect;

describe('Path', function() {

  var nestedPath;
  var notNestedPath;

  beforeEach(function() {
    nestedPath = [
      [1,2],
      [2,3],
      [3,4]
    ];

    notNestedPath = [1,2,3,4,5,6];
  });

  it('should read one leveled path', function() {
    var sourcePath = nestedPath;
    expect(path.isNested(sourcePath)).to.be.ok;
  });

  it('should read nested path', function() {
    var sourcePath = notNestedPath;
    expect(path.isNested(sourcePath)).not.to.be.ok;
  });

  it('should nest the path', function() {
    var sourcePath = notNestedPath;
    var expectedPath = [
      [1,2],
      [3,4],
      [5,6]
    ];

    expect(path.nest(sourcePath)).to.eql(expectedPath);
  });

  it('should interpolate', function() {
    var sourcePath = nestedPath;
    expect(path.interpolate(sourcePath).length).to.be.above(30);
  });

  it('should NOT interpolate', function() {
    var sourcePath = [
      [50,50],
      [100,100]
    ];

    expect(path.interpolate(sourcePath).length).to.be.equal(sourcePath.length);
  });

  it('should add offset', function() {
    var sourcePath = nestedPath;
    var offsetX = 100;
    var offsetY = 100;
    var expectedPath = [
      [101, 102],
      [102, 103],
      [103, 104]
    ];

    expect(path.addOffset(sourcePath, offsetX, offsetY)).to.eql(expectedPath);
  });

  it('should get css values in percentages', function() {
    var relativeElementWidth = 100;
    var relativeElementHeight = 100;
    var sourcePath = [
      [50,50],
      [100,100]
    ];

    var expectedPath = [
      ['0%', '0%'],
      ['50.00%', '50.00%']
    ];

    var pathInPercentages = path.toPercentages(sourcePath, relativeElementWidth, relativeElementHeight);
    expect(pathInPercentages).to.eql(expectedPath);
  });
});
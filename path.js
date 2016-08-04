var bezier = require('bezier-curve');

var path = {
  isLinear: function(sourcePath) {
    if (path.isNested) {
      return (sourcePath.length === 2);
    } else {
      return (path.nest(sourcePath).length === 2);
    }
  },

  isNested: function(sourcePath) {
    return sourcePath.every(function(item) {
      return item instanceof Array;
    });
  },

  nest: function(sourcePath) {
    var xAndY = [];
    return sourcePath.reduce(function(all, item, index) {
      xAndY.push(item);

      if (index % 2 === 1) {
        all.push(xAndY);
        xAndY = [];
      }

      return all;
    }, []);
  },

  interpolate: function(sourcePath) {
    if (path.isLinear(sourcePath)) {
      return sourcePath;
    }

    var result = [];
    for(var t=0; t<1; t+=0.01) {
      result.push(bezier(t, sourcePath));
    }

    return result;
  },

  addOffset: function(sourcePath, offsetX, offsetY) {
    return sourcePath.map(function(xAndY) {
      var x = xAndY[0];
      var y = xAndY[1];

      return [x + offsetX, y + offsetY];
    });
  },

  toPercentages: function(sourcePath, relativeElementWidth, relativeElementHeight) {

    if (!(sourcePath instanceof Array)) {
      throw new Error('toPercentages: sourcePath must be an array');
    }

    if (typeof relativeElementWidth === 'undefined' || typeof relativeElementHeight === 'undefined') {
      throw new Error('toPercentages: relativeElementWidth and relativeElementHeight must be provided');
    }

    var firstPositionX = sourcePath[0][0];
    var firstPositionY = sourcePath[0][1];

    relativeElementWidth = Number.parseInt(relativeElementWidth);
    relativeElementHeight = Number.parseInt(relativeElementHeight);

    return sourcePath.map(function(xAndY, index) {
      var x = xAndY[0];
      var y = xAndY[1];

      if (index === 0) {
        return ['0%','0%'];
      } else {
        return [
          ((x.toFixed(3) - firstPositionX) / relativeElementWidth * 100).toFixed(2) + '%',
          ((y.toFixed(3) - firstPositionY) / relativeElementHeight * 100).toFixed(2) + '%'
        ];
      }
    });
  }
};

module.exports = path;
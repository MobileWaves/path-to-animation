var path = require('./path');
var css = require('./css');

var brain = {
  generateCss: function(input, namespace, elementWidth, elementHeight, mixinName) {

    if (typeof elementWidth != 'number' && typeof elementWidth != 'string') {
      throw new Error('elementWidth should be either a number or a string');
    }

    if (typeof elementHeight != 'number' && typeof elementHeight != 'string') {
      throw new Error('elementHeight should be either a number or a string');
    }

    // there should be a default value for mixinName
    mixinName = mixinName || 'curved-animation';

    return Object.keys(input).map(function(itemName) {
      var output = input[itemName];

      if (!path.isNested(output)) {
        output = path.nest(output);
      }

      var interpolatedPath = path.interpolate(output);
      var pathWithPercentages = path.toPercentages(interpolatedPath, elementWidth, elementHeight);
      var keyframesValues = css.createKeyframes(pathWithPercentages);
      var cssKeyframes = css.generateCssKeyframes(keyframesValues, namespace, itemName);
      var cssClass = css.generateCssClass(namespace, itemName, mixinName);
      return cssKeyframes + cssClass;
    }).join('\n');
  }
};

module.exports = brain;
var path = require('./path');
var css = require('./css');

var brain = {
  generateCss: function(input, namespace, elementWidth, elementHeight, mixinName) {
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
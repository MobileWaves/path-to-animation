var keyframeTemplate = '%percent%% { transform: translate(%x%, %y%); }';
var cssClassTemplate = [
  '.%className% {',
  '\t@include %animationName%(%keyframeAnimation%);',
  '}'
].join('\n');

function calculatePercentages(number, length) {
  return (number / length * 100).toFixed(0);
}

var css = {

  /**
   * Generates array of css keyframes
   * 
   * @param  {Array} sourcePathInPercentages Nested array in percentages
   * @return {Array}                         CSS keyframes
   */
  createKeyframes: function(sourcePathInPercentages) {
    var itemsCount = sourcePathInPercentages.length;

    var keyframes = sourcePathInPercentages.map(function(xAndY, index) {
      var keyframeNumber = calculatePercentages(index, itemsCount);

      if (itemsCount === 2) {
        if (index === 1) {
          keyframeNumber = '100';
        }
      }

      return keyframeTemplate
        .replace('%percent%', keyframeNumber)
        .replace('%x%', xAndY[0])
        .replace('%y%', xAndY[1]);

    });

    // the map doesn't generate the 100% keyframe so we copy it from the latest generated keyframe
    var lastItem = sourcePathInPercentages[itemsCount - 1];
    if (itemsCount > 2) {
      keyframes.push(keyframeTemplate
        .replace('%percent%', '100')
        .replace('%x%', lastItem[0])
        .replace('%y%', lastItem[1])
      );
    }

    return keyframes;
  },

  generateClassName: function(namespace, itemName) {
    return 'animated-' + namespace + '-' + itemName;
  },

  generateCssKeyframes: function(keyframesValues, namespace, itemName) {
    return [ '@keyframes ' + namespace + '-' + itemName + ' {']
    // we want to have tabulation before the keyframe number
    .concat(keyframesValues.map(function(item) {
      return '\t' + item;
    }))
    .concat('}\n')
    .join('\n');
  },

  generateCssClass: function(namespace, itemName, animationName) {
    return cssClassTemplate
      .replace('%className%', css.generateClassName(namespace, itemName))
      .replace('%animationName%', animationName)
      .replace('%keyframeAnimation%', namespace + '-' + itemName)
  }
};

module.exports = css;
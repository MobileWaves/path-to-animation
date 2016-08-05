# path-to-animation

## synopsis
This module is meant to do only one thing - having an object of paths as an input and returning a generated @keyframes and css classes output.

This tool is free of automated task runners like `gulp` and `grunt`. You could use it in your nodejs project without setting automated tools.

### Why would you need this?
* Do you want to have smooth css animations you don't want to handle by java script?
* Do you need to pause them?
* Do you need to resize and keep the animated element's position?
* Do you want to write such animation manually? And rewrite them every time the client changes the design?
* Animations using translate instead of top/left positioning are considered as better performance and calculating translate movement manually could be painfully sometimes.

`path-to-animation` needs just an object containing animations paths you would need and it will interpolate them and generate predefined `@keyframes` animations you need in a string.

## usage

```js
var pathToAnimation = require('path-to-animation');

var generatedCssContent = pathToAnimation.generateCss(
	arrayOfPaths,
	namespace,
	elementWidth,
	elementHeight
	[, sassMixin]
);
```
## pathToAnimation.generateCss(arguments)

### return:
* Description: Generated css content
* Type: `String`
* Example:

```
@keyframes namespace-name-animation1 {
	0% { transform: translate(0%, 0%); }
	100% { transform: translate(100.00%, 100.00%); }
}

.animated-namespace-name-animation1 {
	@include curved-animation(namespace-name-animation1);
}
```

### arguments:
#### path
* Description: The object containing the animation paths. This array will be interpolated.
* Type: `Object`
* Example:

```js
{
	// the array with the animation points could be flat: [x, y, x, y]
	"animation1" : [100, 100, 200, 200],
	
	// it could be nested path as well: [[x,y], [x,y]]
	"animation2": [ [100,100], [200,200] ]
}
```
#### namespace
* Description: The namespace is used to generate the @keyframes and css class name
* Type: `String`

#### elementWidth
* Description: Animated element's width. It's needed in order to calculate the path related to its size in percentages.
* Type: `Number|String`

#### elementHeight
* Description: Animated element's height. It's needed in order to calculate the path related to its size in percentages.
* Type: `Number|String`

#### sassMixin
* Description: The name of the sass mixin to be used for the generated css class.
* **optional**
* Type: `String`
* Default: `curved-animation`

## Dependancies
We depend on SASS. We expect the developers to use SASS in the project they plan to use `path-to-animation`

We will generate sass content and you will be able to save it into your project. We expect you to have defined sass mixin which name you could provide via the arguments described above. The default is mixin name is `curved-animation`.

## Test
In order to asure everything works as expected, run:

```
npm install
npm test
```

## Other tools:
* [path-to-animation](https://github.com/MobileWaves/path-to-animation)
* [grunt-path-to-animation](https://github.com/MobileWaves/grunt-path-to-animation)
* [gulp-path-to-animation](https://github.com/MobileWaves/gulp-path-to-animation)

# Contributions
If you have any suggestions or the tool doesn't cover your needs, don't hasitate to fork us or send us an email <opensource@mobilewaves.com>. Every comment or contribution will be very appreciated.


# MIT License

Copyright (c) 2016 Mobile Wave Solutions (<opensource@mobilewaves.com>)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
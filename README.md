# path-to-animation

## synopsis
This module is meant to do only one thing. To have an object of paths as an input and to give you a generated @keyframes and css classes as an output.

 
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

We will generate sass file and you will be able to `import` it into your project. We expect you to have defined sass mixin which name you could provide via the arguments described above. The default is mixin name is `curved-animation`.

## Test
In order to asure everything works as expected, run:

```
npm install
npm test
```

# Contributions
If you have any suggestions or the tool doesn't cover your needs, don't hasitate to fork us or send us an email <opensource@mobilewaves.com>. Every comment or contribution will be very appreciated.


# MIT License

Copyright (c) 2016 Mobile Wave Solutions (<opensource@mobilewaves.com>)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
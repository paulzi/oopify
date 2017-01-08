# Oopify

[![NPM version](http://img.shields.io/npm/v/oopify.svg?style=flat)](https://www.npmjs.org/package/oopify)
![Bower version](http://img.shields.io/bower/v/oopify.svg?style=flat)
[![Build Status](https://img.shields.io/travis/paulzi/oopify/master.svg)](https://travis-ci.org/paulzi/oopify)
[![Downloads](https://img.shields.io/npm/dt/oopify.svg)](https://www.npmjs.org/package/oopify)
![License](https://img.shields.io/npm/l/express.svg)

Class implementation with protected, multiple inheritance, getters/setters and mixins.

[Russian readme](https://github.com/paulzi/oopify/blob/master/README.ru.md)

## Install

Install via NPM
```sh
npm install oopify
```

Install via Bower
```sh
bower install oopify
```

Or install manually.

## Get started

### Browsers

Select standalone or separate method:

#### standalone (build-in [WeakMap Shim](https://github.com/Benvie/WeakMap))

Include on page complete build of `oopify.all.min.js`:

```html
<script src="/node_modules/oopify/dist/oopify.all.min.js"></script>
```

#### separate (without [WeakMap Shim](https://github.com/Benvie/WeakMap))

Include on page [WeakMap Shim](https://github.com/Benvie/WeakMap) (if you want support old browsers) and `oopify.min.js`:

```html
<script src="/node_modules/weakmap/weakmap.min.js"></script>
<script src="/node_modules/oopify/dist/oopify.min.js"></script>
```

### Node.js

```javascript
var Class = require('oopify').Class;
```

### ES6 Modules

```javascript
import { Class } from 'oopify';
```

## Usage

```javascript
var Figure = Class.create(function ($public, $protected, _) {
    $protected.id = 123;
    $public.getId = function () {
        return ('00000' + _(this).id).slice(-5);
    };
});

var Circle = Class.create(Figure, function ($public, $protected, _) {
    $public.radius = 10;
    $protected.init = function () {
        _(this).id = 456;
    };
});

var circle = new Circle();
console.log(circle.id); // '00456'
```

## Features

### public, protected and private

Use `$public` for define public members, `$protected` for define protected members.
Use `_(this)` to access protected and private members of a class.
Not declared as protected members of the class are considered as private.

`this` in protected methods (except `init()`) points to a protected storage. To access the object use `this.self`.

Use `this.property = ` in init class to implement static members.

```javascript

var Figure = Class.create(function ($public, $protected, _) {
    $public.x = 0;
    $public.y = 0;
    $protected.name = 'figure';
    $protected.init = function (x, y) {
        _(this).id = 123; // private
        this.x = x;
        this.y = y;
    };
    $protected.protectedMethod = function () {
        console.log('protectedMethod: ', this.id, this.name, this.self.x, this.self.y);
    };
});

var Circle = Class.create(Figure, function ($public, $protected, _) {
    $public.radius = 10;
    $public.publicMethod = function () {
        console.log('publicMethod: ', _(this).id, _(this).name, this.radius);
        _(this).protectedMethod();
    };
    this.square = function (circle) {
        return 2 * Math.PI * circle.radius;
    }
});

var circle = new Circle(2, 7);
circle.radius = 5;
circle.publicMethod(); // publicMethod: undefined figure 5 / protectedMethod: 123 figure 2 7
console.log(Circle.square(circle)); // 31.415926536
```

### Basic inheritance, call super

Use `$super.get(Class)` to access parent members:

```javascript
var Animal = Class.create(function ($public, $protected, _) {
    $public.category = 'generic';
    $protected.name = null;
    $protected.init = function (name) {
        _(this).name = name;
    }
});

var Dog = Class.create(Animal, function ($public, $protected, _, $super) {
    $protected.breed = null;
    $protected.init = function (name, breed) {
        $super.get(Animal).init.apply(this, arguments);
        _(this).breed = breed;
    }
});
```

### Multiple class inheritance

When name conflict used the implementation of the first class that contains that member.
To implement all parenting methods, override them with a call `$super` for each class.

Only the first class is used for standard JavaScript chain of prototypes, and it can be checked by `instanceof`.

```javascript
var Layer = Class.create(function ($public, $protected, _) {
    $protected.uid = null;
    $protected.init = function () {
        _(this).uid = Date.now();
    }
});

var Movable = Class.create(function ($public, $protected, _) {
    $public.x = 0;
    $public.y = 0;
    $protected.init = function (x, y) {
        this.x = x;
        this.y = y;
    }
    $public.move = function () {
        this.x++;
        this.y++;
    }
});

var MovableLayer = Class.create([Layer, Movable], function ($public, $protected, _, $super) {
    $protected.init = function (x, y) {
        $super.get(Layer).init.apply(this, arguments);
        $super.get(Movable).init.apply(this, arguments);
    }
});
```

### Class.is()

`instanceof` not working with multiple inheritance class for all non-first base classes. To solve this problem, use `Class.is()`:

```javascript
var layer = new MovableLayer(); // see previous example
console.log(layer instanceof Layer, layer instanceof Movable); // true false
console.log(Class.is(layer, Layer), Class.is(layer, Movable)); // true true
```


### Getters/setters

If a member is not defined in the public/protected prototype, and while there are methods `get*` or a `set*`, it automatically creates the getter/setter for this property.

```javascript
var Human = Class.create(function ($public, $protected, _) {
    $protected.birthday = null;
    $public.getBirthday = function () {
        return _(this).birthday;
    };
    $public.setBirthday = function (day) {
        _(this).birthday = day;
    };
    $public.getAge = function () {
        var date = new Date(_(this).birthday);
        return Math.floor((Date.now() - date.getTime()) / (1000 * 3600 * 24 * 365));
    };
});

var human = new Human();
human.birthday = '1975-05-01';
console.log(human.age);
```

### Mixins

Mixin is simple function, which is called as implementation of class. All members is copied as if they were in the class.

```javascript
var SortableMixin = function ($public, $protected, _) {
    $public.sort = function () {
        _(this).data.sort();
    };
};

var Archive = Class.create(null, SortableMixin, function ($public, $protected, _) {
    $protected.init = function () {
        _(this).data = [3, 9, 7, 2];
    };
    $public.outData = function () {
        console.log(_(this).data);
    };
});

var archive = new Archive();
archive.sort();
archive.outData(); // [2, 3, 7, 9]
```

## Testing and building

Install dependency:

```sh
npm install
```

Build:

```sh
npm run-script build:dev
npm run-script build:dist
```

To run test in node.js use:

```sh
npm test
```

To run test in browsers open `test/index.html` page.

## Browser support

With WeakMap Shim:

- Internet Explorer 9+
- Chrome 5+
- Firefox 4+
- Opera 12.1+
- Safari 5+
- Firefox Mobile 4+
- Android Browser 2.3+
- iOS Safari 5.1+

Without WeakMap Shim:

- Internet Explorer 11+
- Chrome 36+
- Firefox 6+
- Opera 23+
- Safari 7.1+
- Firefox Mobile 6+
- iOS Safari 8+
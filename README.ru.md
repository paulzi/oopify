# Oopify

[![NPM version](http://img.shields.io/npm/v/oopify.svg?style=flat)](https://www.npmjs.org/package/oopify)
![Bower version](http://img.shields.io/bower/v/oopify.svg?style=flat)
[![Build Status](https://img.shields.io/travis/paulzi/oopify/master.svg)](https://travis-ci.org/paulzi/oopify)
[![Downloads](https://img.shields.io/npm/dt/oopify.svg)](https://www.npmjs.org/package/oopify)
![License](https://img.shields.io/npm/l/express.svg)

Реализация классов с protected, множественным наследованием, геттерами/сеттерами и примесями.

[English readme](https://github.com/paulzi/oopify/)

## Установка

Учстановка через NPM
```sh
npm install oopify
```

Учтановка через Bower
```sh
bower install oopify
```

Или установите вручную.

## С чего начать

### Браузеры

Выберите вариант подключения скрипта:

#### всё-в-одном (встроенный [WeakMap Shim](https://github.com/Benvie/WeakMap))

Подключите на страницу `oopify.all.min.js`:

```html
<script src="/node_modules/oopify/dist/oopify.all.min.js"></script>
```

#### раздельный  (без встроенного [WeakMap Shim](https://github.com/Benvie/WeakMap))

Подключите на страницу [WeakMap Shim](https://github.com/Benvie/WeakMap) (если нужна поддержка старых браузеров) и `oopify.min.js`:

```html
<script src="/node_modules/weakmap/weakmap.min.js"></script>
<script src="/node_modules/oopify/dist/oopify.min.js"></script>
```

### Node.js

```javascript
var Class = require('oopify').Class;
```

### ES6 модули

```javascript
import { Class } from 'oopify';
```

## Использование

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

## Возможности

### public, protected и private доступ к членам класса

Используйте `$public` для объявления публичных свойств и методов, `$protected` для объявления защищённых свойств и методов.
Используйте функцию `_(this)` для доступа к protected и private членам класса.
Не объявленные как защищённые свойста и методы будут считаться private.

`this` в защищённых методах (кроме `init()`) указывает на защищённое хранилище. Для доступа к самому объекту используйте `this.self`.

Используйте `this.property = ` для реализации статических свойств и методов класса.

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
    this.square = function (circle) {
        return 2 * Math.PI * circle.radius;
    }
});

var Circle = Class.create(Figure, function ($public, $protected, _) {
    $public.radius = 10;
    $public.publicMethod = function () {
        console.log('publicMethod: ', _(this).id, _(this).name, this.radius);
        _(this).protectedMethod();
    };
});

var circle = new Circle(2, 7);
circle.radius = 5;
circle.publicMethod(); // publicMethod: undefined figure 5 / protectedMethod: 123 figure 2 7
console.log(Circle.square(circle)); // 31.415926536
```

### Простое наследование, вызов родительских методов (super)

Используйте `$super.get(Class)` для доступа к родительским методам:

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

### Множественное наследование

При возникновении конфликта имён используется реализация первого класса, в котором данные метод объявлен.
Для реализации всех родительских методов, переопределите метод, и вызовите через `$super` реализацию для каждого класса.

Только первый класс будет использоваться для стандартной цепочки прототипов JavaScript, и может быть проверен с использованием `instanceof`.

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

`instanceof` не работает при множественном наследовании для вторичных классов. Для решения этой проблемы, используйте `Class.is()`:

```javascript
var layer = new MovableLayer(); // смотрите предыдущий пример
console.log(layer instanceof Layer, layer instanceof Movable); // true false
console.log(Class.is(layer, Layer), Class.is(layer, Movable)); // true true
```


### Геттеры/сеттеры

Если свойство не объявлено в public/protected прототипе, у существуют методы `get*` или `set*`, автоматически будут созданы геттеры/сеттеры для данного свойства.

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

### Примеси

Примеси - это простые функции, которые будут вызываться как реализация класса. Все члены класса будут скопированы как если бы были реализованы в самом классе.

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

## Тестирование и сборка

Установите зависимости:

```sh
npm install
```

Сборка:

```sh
npm run-script build:dev
npm run-script build:dist
```

Для запуска тестов в node.js используйте:

```sh
npm test
```

Для запуска тестов в браузере перейдите на страницу `test/index.html`.

## Поддержка браузерами

Вместе с WeakMap Shim:

- Internet Explorer 9+
- Chrome 5+
- Firefox 4+
- Opera 12.1+
- Safari 5+
- Firefox Mobile 4+
- Android Browser 2.3+
- iOS Safari 5.1+

Без WeakMap Shim:

- Internet Explorer 11+
- Chrome 36+
- Firefox 6+
- Opera 23+
- Safari 7.1+
- Firefox Mobile 6+
- iOS Safari 8+
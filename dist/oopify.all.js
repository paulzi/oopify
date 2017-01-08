(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(exports, "Class", function() { return Class; });
var map;

/**
 * @param {Object} data
 * @param {Object} object
 * @returns {Object}
 */
var getProtected = function (data, object) {
    var result;
    result = data.storage.get(object);
    if (!result) {
        result = Object.create(data.proto);
        data.storage.set(object, result);
    }
    return result;
};


/**
 * @param {Object} object
 * @returns {Object}
 */
var getData = function (object) {
    var proto, result;
    proto  = Object.getPrototypeOf(object);
    result = map.get(proto);
    if (!result) {
        throw new Error('Object is not instance of Class');
    }
    return result;
};

/**
 * @param {Object} data
 * @param {String} prop
 * @returns {Function}
 */
var getProtectedGetter = function (data, prop) {
    if (!data.getters) {
        data.getters = {};
    }
    if (!data.getters[prop]) {
        data.getters[prop] = function () {
            var _protected = getProtected(data, this.self);
            return _protected[prop];
        };
    }
    return data.getters[prop];
};

/**
 * @param {Object} data
 * @param {String} prop
 * @returns {Function}
 */
var getProtectedSetter = function (data, prop) {
    if (!data.setters) {
        data.setters = {};
    }
    if (!data.setters[prop]) {
        data.setters[prop] = function (value) {
            var _protected = getProtected(data, this.self);
            _protected[prop] = value;
        };
    }
    return data.setters[prop];
};

/**
 * @param {WeakMap} storage
 * @param {Object} data
 * @returns {Function}
 */
var makePrivateFn = function (storage, data) {
    return function (object) {
        var i, prop, common, dataObj, result, _protected, descriptor;
        result = storage.get(object);
        if (!result) {
            dataObj = getData(object);
            common = data.list.filter(function (item) {
                return dataObj.list.indexOf(item) !== -1;
            });
            if (common.length) {
                common = common.map(function (item) {
                    return map.get(item).proto;
                });
                _protected = getProtected(dataObj, object);
                result     = { self: object };
                descriptor = {};
                for (prop in _protected) {
                    for (i = 0; i < common.length; i++) {
                        if (common[i][prop] !== undefined) {
                            descriptor[prop] = {
                                get: getProtectedGetter(dataObj, prop),
                                set: getProtectedSetter(dataObj, prop),
                                enumerable: true,
                            };
                            break;
                        }
                    }
                }
                Object.defineProperties(result, descriptor);
                descriptor = makeAccessors(result);
                if (descriptor) {
                    Object.defineProperties(result, descriptor);
                }
                storage.set(object, result);
            } else {
                throw new Error('Can not access to other class');
            }
        }
        return result;
    };
};


/**
 * @param {Object} object
 * @returns {Object|null}
 */
var makeAccessors = function (object) {
    var result, props, prop, tri, name, ucName, descriptor, count, i;
    result = {};
    count  = 0;
    props  = [];
    for (prop in object) {
        props.push(prop);
    }
    for (i = 0; i < props.length; i++) {
        prop = props[i];
        if (prop.length > 3) {
            tri = prop.substr(0, 3);
            if (tri === 'get' || tri === 'set') {
                ucName = prop.substr(3);
                name   = ucName.charAt(0).toLowerCase() + ucName.slice(1);
                if (name !== ucName && props.indexOf(name) === -1) {
                    count++;
                    descriptor = result[name] = result[name] || {};
                    if (tri === 'get') {
                        descriptor.get = object[prop];
                    }
                    if (tri === 'set') {
                        descriptor.set = object[prop];
                    }
                }
            }
        }
    }
    return count ? result : null;
};


/**
 * @namespace
 */
var Class = {
    /**
     * @param {constructor|constructor[]|Function} baseClass
     * @param {Function|Function[]} [mixins]
     * @param {Function} [init]
     * @returns {constructor}
     */
    create: function (baseClass, mixins, init) {
        var baseClasses, constructor, privateMap, data, parent, item, superItem, $public, $protected, $super, _, i, prop;
        if (!map) {
            map = new WeakMap();
        }
        privateMap = new WeakMap();

        // normalize arguments
        if (!init) {
            init      = mixins || baseClass;
            baseClass = mixins ? baseClass : undefined;
            mixins    = undefined;
        }
        if (baseClass) {
            if (typeof baseClass === 'function') {
                baseClasses = [baseClass];
            } else {
                baseClasses = baseClass;
                baseClass   = baseClasses[0];
            }
        }
        mixins = typeof mixins === 'function' ? [mixins] : mixins;

        // constructor
        constructor = function () {
            var data, _protected;
            data       = getData(this);
            _protected = getProtected(data, this);
            if (_protected.init) {
                _protected.init.apply(this, arguments);
            }
            if (data.accessors) {
                Object.defineProperties(this, data.accessors);
            }
        };

        // inheritance
        data = { storage: new WeakMap() };
        if (baseClass) {
            $public = Object.create(baseClass.prototype);
            $super  = new WeakMap();
            constructor.prototype = $public;
            data.list = [];
            for (i = 0; i < baseClasses.length; i++) {
                item   = baseClasses[i];
                parent = map.get(item.prototype);
                if (!parent) {
                    throw new Error('Base class is not created by Class');
                }
                data.list = data.list.concat(parent.list);
                if (i === 0) {
                    $protected = Object.create(parent.proto);
                }
                superItem = {};
                for (prop in parent.proto) {
                    superItem[prop] = parent.proto[prop];
                    if ($protected[prop] === undefined) {
                        $protected[prop] = parent.proto[prop];
                    }
                }
                for (prop in item.prototype) {
                    superItem[prop] = item.prototype[prop];
                    if ($public[prop] === undefined) {
                        $public[prop] = item.prototype[prop];
                    }
                }
                $super.set(item, superItem);
            }
        } else {
            data.list = [];
            $public    = constructor.prototype;
            $protected = {};
        }
        $public.constructor = constructor;
        data.list.push($public);
        data.proto = $protected;
        map.set($public, data);

        // _ function
        _ = makePrivateFn(privateMap, data);

        // init
        if (mixins) {
            for (i = 0; i < mixins.length; i++) {
                mixins[i].call(constructor, $public, $protected, _, $super);
            }
        }
        init.call(constructor, $public, $protected, _, $super);

        // make getters and setters
        data.accessors = makeAccessors($public);

        return constructor;
    },

    /**
     * @param {Object} object
     * @param {constructor} targetClass
     * @returns {boolean}
     */
    is: function (object, targetClass) {
        var proto, data;
        proto = Object.getPrototypeOf(object);
        data  = map.get(proto);
        return data && data.list.indexOf(targetClass.prototype) !== -1;
    }
};




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return WeakMap; });
var WeakMap = __webpack_require__(2);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

/* (The MIT License)
 *
 * Copyright (c) 2012 Brandon Benvie <http://bbenvie.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the 'Software'), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included with all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY  CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Original WeakMap implementation by Gozala @ https://gist.github.com/1269991
// Updated and bugfixed by Raynos @ https://gist.github.com/1638059
// Expanded by Benvie @ https://github.com/Benvie/harmony-collections

void function(global, undefined_, undefined){
  var getProps = Object.getOwnPropertyNames,
      defProp  = Object.defineProperty,
      toSource = Function.prototype.toString,
      create   = Object.create,
      hasOwn   = Object.prototype.hasOwnProperty,
      funcName = /^\n?function\s?(\w*)?_?\(/;


  function define(object, key, value){
    if (typeof key === 'function') {
      value = key;
      key = nameOf(value).replace(/_$/, '');
    }
    return defProp(object, key, { configurable: true, writable: true, value: value });
  }

  function nameOf(func){
    return typeof func !== 'function'
          ? '' : 'name' in func
          ? func.name : toSource.call(func).match(funcName)[1];
  }

  // ############
  // ### Data ###
  // ############

  var Data = (function(){
    var dataDesc = { value: { writable: true, value: undefined } },
        datalock = 'return function(k){if(k===s)return l}',
        uids     = create(null),

        createUID = function(){
          var key = Math.random().toString(36).slice(2);
          return key in uids ? createUID() : uids[key] = key;
        },

        globalID = createUID(),

        storage = function(obj){
          if (hasOwn.call(obj, globalID))
            return obj[globalID];

          if (!Object.isExtensible(obj))
            throw new TypeError("Object must be extensible");

          var store = create(null);
          defProp(obj, globalID, { value: store });
          return store;
        };

    // common per-object storage area made visible by patching getOwnPropertyNames'
    define(Object, function getOwnPropertyNames(obj){
      var props = getProps(obj);
      if (hasOwn.call(obj, globalID))
        props.splice(props.indexOf(globalID), 1);
      return props;
    });

    function Data(){
      var puid = createUID(),
          secret = {};

      this.unlock = function(obj){
        var store = storage(obj);
        if (hasOwn.call(store, puid))
          return store[puid](secret);

        var data = create(null, dataDesc);
        defProp(store, puid, {
          value: new Function('s', 'l', datalock)(secret, data)
        });
        return data;
      }
    }

    define(Data.prototype, function get(o){ return this.unlock(o).value });
    define(Data.prototype, function set(o, v){ this.unlock(o).value = v });

    return Data;
  }());


  var WM = (function(data){
    var validate = function(key){
      if (key == null || typeof key !== 'object' && typeof key !== 'function')
        throw new TypeError("Invalid WeakMap key");
    }

    var wrap = function(collection, value){
      var store = data.unlock(collection);
      if (store.value)
        throw new TypeError("Object is already a WeakMap");
      store.value = value;
    }

    var unwrap = function(collection){
      var storage = data.unlock(collection).value;
      if (!storage)
        throw new TypeError("WeakMap is not generic");
      return storage;
    }

    var initialize = function(weakmap, iterable){
      if (iterable !== null && typeof iterable === 'object' && typeof iterable.forEach === 'function') {
        iterable.forEach(function(item, i){
          if (item instanceof Array && item.length === 2)
            set.call(weakmap, iterable[i][0], iterable[i][1]);
        });
      }
    }


    function WeakMap(iterable){
      if (this === global || this == null || this === WeakMap.prototype)
        return new WeakMap(iterable);

      wrap(this, new Data);
      initialize(this, iterable);
    }

    function get(key){
      validate(key);
      var value = unwrap(this).get(key);
      return value === undefined_ ? undefined : value;
    }

    function set(key, value){
      validate(key);
      // store a token for explicit undefined so that "has" works correctly
      unwrap(this).set(key, value === undefined ? undefined_ : value);
    }

    function has(key){
      validate(key);
      return unwrap(this).get(key) !== undefined;
    }

    function delete_(key){
      validate(key);
      var data = unwrap(this),
          had = data.get(key) !== undefined;
      data.set(key, undefined);
      return had;
    }

    function toString(){
      unwrap(this);
      return '[object WeakMap]';
    }

    try {
      var src = ('return '+delete_).replace('e_', '\\u0065'),
          del = new Function('unwrap', 'validate', src)(unwrap, validate);
    } catch (e) {
      var del = delete_;
    }

    var src = (''+Object).split('Object');
    var stringifier = function toString(){
      return src[0] + nameOf(this) + src[1];
    };

    define(stringifier, stringifier);

    var prep = { __proto__: [] } instanceof Array
      ? function(f){ f.__proto__ = stringifier }
      : function(f){ define(f, stringifier) };

    prep(WeakMap);

    [toString, get, set, has, del].forEach(function(method){
      define(WeakMap.prototype, method);
      prep(method);
    });

    return WeakMap;
  }(new Data));

  var defaultCreator = Object.create
    ? function(){ return Object.create(null) }
    : function(){ return {} };

  function createStorage(creator){
    var weakmap = new WM;
    creator || (creator = defaultCreator);

    function storage(object, value){
      if (value || arguments.length === 2) {
        weakmap.set(object, value);
      } else {
        value = weakmap.get(object);
        if (value === undefined) {
          value = creator(object);
          weakmap.set(object, value);
        }
      }
      return value;
    }

    return storage;
  }


  if (true) {
    module.exports = WM;
  } else if (typeof exports !== 'undefined') {
    exports.WeakMap = WM;
  } else if (!('WeakMap' in global)) {
    global.WeakMap = WM;
  }

  WM.createStorage = createStorage;
  if (global.WeakMap)
    global.WeakMap.createStorage = createStorage;
}((0, eval)('this'));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WeakMap__ = __webpack_require__(1);
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "WeakMap", function() { return __WEBPACK_IMPORTED_MODULE_0__WeakMap__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Class__ = __webpack_require__(0);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "Class", function() { return __WEBPACK_IMPORTED_MODULE_1__Class__["Class"]; });




/***/ }
/******/ ]);
});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
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




/***/ }
/******/ ]);
});
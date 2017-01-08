'use strict';

var expect = chai.expect;

describe("Class getters/setters test suite", function() {
    it('Check getters/setters in public', function () {
        var Figure = Class.create(function ($public) {
            $public._id = 3;
            $public.getId = function () {
                return this._id - 1;
            };
            $public.setId = function (value) {
                this._id = value * value;
            };
        });

        var figure = new Figure();
        expect(figure.id).to.be.equal(2);
        figure.id = 3;
        expect(figure._id).to.be.equal(9);
        expect(figure.id).to.be.equal(8);
    });


    it('Check getters/setters in protected', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $protected.init  = function () {
                _(this)._id = 3;
            };
            $protected.getId = function () {
                return _(this.self)._id - 1;
            };
            $protected.setId = function (value) {
                _(this.self)._id = value * value;
            };
            $public.test = function () {
                expect(_(this).id).to.be.equal(2);
                _(this).id = 3;
                expect(_(this)._id).to.be.equal(9);
                expect(_(this).id).to.be.equal(8);
            };
        });

        var figure = new Figure();
        figure.test();
    });


    it('Check getters/setters inheritance in public', function () {
        var Figure = Class.create(function ($public) {
            $public._id = 3;
            $public.getId = function () {
                return this._id - 1;
            };
            $public.setId = function (value) {
                this._id = value * value;
            };
        });

        var Ellipse = Class.create(Figure, function ($public) {
            $public._id = 4;
        });

        var ellipse = new Ellipse();
        expect(ellipse.id).to.be.equal(3);
        ellipse.id = 4;
        expect(ellipse._id).to.be.equal(16);
        expect(ellipse.id).to.be.equal(15);
    });


    it('Check getters/setters inheritance in protected', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $protected._id = 3;
            $protected.getId = function () {
                return _(this.self)._id - 1;
            };
            $protected.setId = function (value) {
                _(this.self)._id = value * value;
            };
        });

        var Ellipse = Class.create(Figure, function ($public, $protected, _) {
            $protected._id = 4;
            $public.test = function () {
                expect(_(this).id).to.be.equal(3);
                _(this).id = 4;
                expect(_(this)._id).to.be.equal(16);
                expect(_(this).id).to.be.equal(15);
            };
        });

        var ellipse = new Ellipse();
        ellipse.test();
    });


    it('Check getters/setters override in public', function () {
        var Figure = Class.create(function ($public) {
            $public._id = 3;
            $public.getId = function () {
                return this._id - 1;
            };
            $public.setId = function (value) {
                this._id = value * value;
            };
        });

        var Ellipse = Class.create(Figure, function ($public) {
            $public._id = 4;
            $public.getId = function () {
                return this._id + 1;
            };
            $public.setId = function (value) {
                this._id = value * value - 2;
            };
        });

        var ellipse = new Ellipse();
        expect(ellipse.id).to.be.equal(5);
        ellipse.id = 4;
        expect(ellipse._id).to.be.equal(14);
        expect(ellipse.id).to.be.equal(15);
    });


    it('Check getters/setters override in protected', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $protected._id = 3;
            $protected.getId = function () {
                return _(this.self)._id - 1;
            };
            $protected.setId = function (value) {
                _(this.self)._id = value * value;
            };
        });

        var Ellipse = Class.create(Figure, function ($public, $protected, _) {
            $protected._id = 4;
            $protected.getId = function () {
                return _(this.self)._id + 1;
            };
            $protected.setId = function (value) {
                _(this.self)._id = value * value - 2;
            };
            $public.test = function () {
                expect(_(this).id).to.be.equal(5);
                _(this).id = 4;
                expect(_(this)._id).to.be.equal(14);
                expect(_(this).id).to.be.equal(15);
            };
        });

        var ellipse = new Ellipse();
        ellipse.test();
    });
});
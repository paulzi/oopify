'use strict';

var expect = chai.expect;

describe("Class mixin test suite", function() {
    it('Check mixins', function () {
        var Movable = function ($public, $protected, _) {
            $protected.speed = 10;
            $public.move = function () {
                this.x += _(this).speed;
            };
        };

        var Figure = Class.create(function ($public, $protected, _) {
            $public.x = 0;
            $public.y = 0;
            $public.out = function () {
                return this.x + ', ' + this.y;
            };
        });

        var Ellipse = Class.create(Figure, [Movable], function ($public, $protected, _) {
            $public.test = function () {
                this.move();
                expect(this.out()).to.be.equal('10, 0');
            };
        });

        var ellipse = new Ellipse();
        ellipse.test();
    });
});
'use strict';

var expect = chai.expect;

describe("Class super test suite", function() {
    it('Check super in child', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $protected.type = 'figure';
            $protected.init = function () {
                _(this).id = 1;
            };
            $protected.update = function () {
                return 3;
            };
            $public.move = function () {
                return _(this).id;
            };
        });

        var Ellipse = Class.create(Figure, function ($public, $protected, _, $super) {
            $public.name    = 'ellipse1';
            $protected.type = 'ellipse';
            $protected.update = function () {
                return $super.get(Figure).update.apply(this, arguments) + 2;
            };
            $public.move = function () {
                return $super.get(Figure).move.apply(this, arguments) + 6;
            };
            $public.test = function () {
                expect($super.get(Figure).id).to.be.equal(undefined);
                expect($super.get(Figure).name).to.be.equal('figure1');
                expect($super.get(Figure).type).to.be.equal('figure');
                expect($super.get(Figure).update.apply(this, arguments)).to.be.equal(3);
                expect($super.get(Figure).move.apply(this, arguments)).to.be.equal(1);
                expect(_(this).update()).to.be.equal(5);
                expect(this.move()).to.be.equal(7);
            };
        });

        var ellipse = new Ellipse();
        ellipse.test();
    });

    it('Check super in desendant', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $public.group   = 'generic';
            $protected.type = 'figure';
            $protected.uid  = 'newuid';
            $protected.init = function () {
                _(this).id = 1;
            };
            $protected.update = function () {
                return 3;
            };
            $protected.generateUid = function () {
                return 'secret';
            };
            $public.move = function () {
                return _(this).id;
            };
            $public.testGetName = function () {
                return this.name;
            };
        });

        var Ellipse = Class.create(Figure, function ($public, $protected, _, $super) {
            $public.name    = 'ellipse1';
            $protected.type = 'ellipse';
            $protected.update = function () {
                return $super.get(Figure).update.apply(this, arguments) + 2;
            };
            $public.move = function () {
                return $super.get(Figure).move.apply(this, arguments) + 6;
            };
            $public.test = function () {
                expect($super.get(Figure).id).to.be.equal(undefined);
                expect($super.get(Figure).name).to.be.equal('figure1');
                expect($super.get(Figure).type).to.be.equal('figure');
                expect(_(this).update()).to.be.equal(5);
                expect(this.move()).to.be.equal(7);
            };
        });

        var Circle = Class.create(Ellipse, function ($public, $protected, _, $super) {
            $public.name    = 'circle1';
            $public.group   = 'rounded';
            $protected.type = 'circle';
            $protected.uid  = 'circleuid';
            $protected.update = function () {
                return $super.get(Ellipse).update.apply(this, arguments) + 5;
            };
            $protected.generateUid = function () {
                return $super.get(Ellipse).generateUid.apply(this, arguments) + '12345';
            };
            $public.move = function () {
                return $super.get(Ellipse).move.apply(this, arguments) - 2;
            };
            $public.testGetName = function () {
                return $super.get(Ellipse).testGetName.apply(this, arguments) + '!';
            };
            $public.test = function () {
                expect($super.get(Ellipse).id).to.be.equal(undefined);
                expect($super.get(Ellipse).name).to.be.equal('ellipse1');
                expect($super.get(Ellipse).group).to.be.equal('generic');
                expect($super.get(Ellipse).type).to.be.equal('ellipse');
                expect($super.get(Ellipse).uid).to.be.equal('newuid');
                expect(_(this).update()).to.be.equal(10);
                expect(this.move()).to.be.equal(5);
                expect(_(this).generateUid()).to.be.equal('secret12345');
                expect(this.testGetName()).to.be.equal('circle1!');
            };
        });

        var circle = new Circle();
        circle.test();
    });
});
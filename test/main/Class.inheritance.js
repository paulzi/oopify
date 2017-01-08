'use strict';

var expect = chai.expect;

describe("Class inheritance test suite", function() {
    it('Check access from external', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $protected.type = 'figure';
            $protected.init = function () {
                _(this).id = 1;
            };
            $public.fillSecond = function () {
                this.name    = 'figure2';
                _(this).id   = 2;
                _(this).type = 'ellipse';
            };
        });

        var figure1 = new Figure();
        var figure2 = new Figure();
        figure2.fillSecond();
        expect(figure1.name).to.be.equal('figure1');
        expect(figure1.id)  .to.be.equal(undefined);
        expect(figure1.type).to.be.equal(undefined);
        expect(figure2.name).to.be.equal('figure2');
        expect(figure2.id)  .to.be.equal(undefined);
        expect(figure2.type).to.be.equal(undefined);
    });


    it('Check access from public method', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $protected.type = 'figure';
            $protected.init = function () {
                _(this).id = 1;
            };
            $public.fillSecond = function () {
                this.name    = 'figure2';
                _(this).id   = 2;
                _(this).type = 'ellipse';
            };
            $public.test1 = function () {
                expect(this.name).to.be.equal('figure1');
                expect(_(this).id)  .to.be.equal(1);
                expect(_(this).type).to.be.equal('figure');
            };
            $public.test2 = function () {
                expect(this.name).to.be.equal('figure2');
                expect(_(this).id)  .to.be.equal(2);
                expect(_(this).type).to.be.equal('ellipse');
            };
        });

        var figure1 = new Figure();
        var figure2 = new Figure();
        figure2.fillSecond();
        figure1.test1();
        figure2.test2();
    });


    it('Check access from protected method', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $protected.type = 'figure';
            $protected.init = function () {
                _(this).id = 1;
            };
            $protected.run1 = function () {
                expect(this.self.name).to.be.equal('figure1');
                expect(this.id)       .to.be.equal(1);
                expect(this.type)     .to.be.equal('figure');
            };
            $protected.run2 = function () {
                expect(this.self.name).to.be.equal('figure2');
                expect(this.id)       .to.be.equal(2);
                expect(this.type)     .to.be.equal('ellipse');
            };
            $public.fillSecond = function () {
                this.name    = 'figure2';
                _(this).id   = 2;
                _(this).type = 'ellipse';
            };
            $public.test1 = function () {
                _(this).run1();
            };
            $public.test2 = function () {
                _(this).run2();
            };
        });

        var figure1 = new Figure();
        var figure2 = new Figure();
        figure2.fillSecond();
        figure1.test1();
        figure2.test2();
    });


    it('Check inheritance of child class', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $protected.type = 'figure';
            $protected.init = function () {
                _(this).id = 1;
            };
            $protected.method = function () {
                return 'method ' + this.type;
            };
            $public.fillSecond = function () {
                this.name    = 'figure2';
                _(this).id   = 2;
                _(this).type = 'ellipse';
            };
        });
        var Circle = Class.create(Figure, function ($public, $protected, _) {
            $public.test1 = function () {
                expect(this.name)       .to.be.equal('figure1');
                expect(_(this).id)      .to.be.equal(undefined);
                expect(_(this).type)    .to.be.equal('figure');
                expect(_(this).method()).to.be.equal('method figure');
            };
            $public.test2 = function () {
                expect(this.name)       .to.be.equal('figure2');
                expect(_(this).id)      .to.be.equal(undefined);
                expect(_(this).type)    .to.be.equal('ellipse');
                expect(_(this).method()).to.be.equal('method ellipse');
            };
        });

        var circle1 = new Circle();
        var circle2 = new Circle();
        circle2.fillSecond();
        circle1.test1();
        circle2.test2();
    });


    it('Check inheritance overwrite of child class', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $protected.type = 'figure';
            $protected.init = function () {
                _(this).id = 1;
            };
            $protected.method = function () {
                return 'method ' + this.type;
            };
            $public.fillSecond = function () {
                this.name    = 'figure2';
                _(this).id   = 2;
                _(this).type = 'ellipse';
            };
        });
        var Circle = Class.create(Figure, function ($public, $protected, _) {
            $public.name    = 'circle1';
            $protected.type = 'circle';
            $protected.init = function () {
                _(this).r = 10;
            };
            $protected.method = function () {
                return 'move ' + this.type;
            };
            $public.fillSecond = function () {
                this.name    = 'figure2';
                _(this).id   = 2;
                _(this).type = 'ellipse';
                _(this).r    = 20;
            };
            $public.test1 = function () {
                expect(this.name)       .to.be.equal('circle1');
                expect(_(this).r)       .to.be.equal(10);
                expect(_(this).type)    .to.be.equal('circle');
                expect(_(this).method()).to.be.equal('move circle');
            };
            $public.test2 = function () {
                expect(this.name)       .to.be.equal('figure2');
                expect(_(this).r)       .to.be.equal(20);
                expect(_(this).type)    .to.be.equal('ellipse');
                expect(_(this).method()).to.be.equal('move ellipse');
            };
        });

        var circle1 = new Circle();
        var circle2 = new Circle();
        circle2.fillSecond();
        circle1.test1();
        circle2.test2();
    });


    it('Check the independence of child from parent', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $protected.type = 'figure';
            $protected.init = function () {
                _(this).id = 1;
            };
            $public.testGetId = function () {
                return _(this).id;
            };
            $public.testGetType = function () {
                return _(this).type;
            };
            $public.fillParent = function () {
                this.name    = 'figure2';
                _(this).id   = 2;
                _(this).type = 'ellipse';
            };
            $public.test = function (circle) {
                expect(this.name)         .to.be.equal('figure1');
                expect(_(this).id)        .to.be.equal(1);
                expect(_(this).type)      .to.be.equal('figure');
                expect(this.testGetId())  .to.be.equal(1);
                expect(this.testGetType()).to.be.equal('figure');
                expect(_(circle).id)      .to.be.equal(2);
                expect(_(circle).uid)     .to.be.equal(undefined);
                expect(_(circle).type)    .to.be.equal('circle');
                expect(_(circle).radius)  .to.be.equal(undefined);
            };
        });
        var Circle = Class.create(Figure, function ($public, $protected, _) {
            $protected.radius = 5;
            $public.fillChild = function () {
                this.name      = 'figure3';
                _(this).id     = 3;
                _(this).uid    = 'secret_uid';
                _(this).type   = 'circle';
                _(this).radius = 10;
            };
            $public.test = function (figure) {
                expect(this.name)         .to.be.equal('figure3');
                expect(_(this).id)        .to.be.equal(3);
                expect(_(this).type)      .to.be.equal('circle');
                expect(this.testGetId())  .to.be.equal(2);
                expect(this.testGetType()).to.be.equal('circle');
                expect(_(figure).type)    .to.be.equal('figure');
                expect(_(figure).id)      .to.be.equal(undefined);
                expect(_(figure).uid)     .to.be.equal(undefined);
                expect(_(figure).radius)  .to.be.equal(undefined);
            };
        });

        var figure = new Figure();
        var circle = new Circle();
        circle.fillParent();
        circle.fillChild();
        figure.test(circle);
        circle.test(figure);
    });


    it('Check the independence of one class from other', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $protected.type = 'figure';
            $protected.init = function () {
                _(this).id = 1;
            };
            $protected.method = function () {
                return 'method ' + this.type;
            };
            $public.test = function (animal) {
                expect(this.name)       .to.be.equal('figure1');
                expect(_(this).id)      .to.be.equal(1);
                expect(_(this).type)    .to.be.equal('figure');
                expect(_(this).method()).to.be.equal('method figure');
                expect(function () { return _(animal); }).to.be.throw(Error);
            };
        });
        var Animal = Class.create(function ($public, $protected, _) {
            $public.name        = 'animal1';
            $protected.type     = 'animal';
            $protected.category = 'flora';
            $protected.init = function () {
                _(this).id  = 10;
                _(this).uid = 'secret_uid';
            };
            $protected.method = function () {
                return 'jump ' + this.type;
            };
            $public.test = function (figure) {
                expect(this.name)       .to.be.equal('animal1');
                expect(_(this).id)      .to.be.equal(10);
                expect(_(this).type)    .to.be.equal('animal');
                expect(_(this).method()).to.be.equal('jump animal');
                expect(function () { return _(figure); }).to.be.throw(Error);
            };
        });

        var figure = new Figure();
        var animal = new Animal();
        figure.test(animal);
        animal.test(figure);
    });


    it('Check inheritance of descendant class', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $protected.type = 'figure';
            $protected.init = function () {
                _(this).id = 1;
            };
            $protected.method = function () {
                return 'method ' + this.type;
            };
            $public.fillSecond = function () {
                this.name    = 'figure2';
                _(this).id   = 2;
                _(this).type = 'ellipse';
            };
        });
        var Ellipse = Class.create(Figure, function () {});
        var Circle = Class.create(Ellipse, function ($public, $protected, _) {
            $public.test1 = function () {
                expect(this.name)       .to.be.equal('figure1');
                expect(_(this).id)      .to.be.equal(undefined);
                expect(_(this).type)    .to.be.equal('figure');
                expect(_(this).method()).to.be.equal('method figure');
            };
            $public.test2 = function () {
                expect(this.name)       .to.be.equal('figure2');
                expect(_(this).id)      .to.be.equal(undefined);
                expect(_(this).type)    .to.be.equal('ellipse');
                expect(_(this).method()).to.be.equal('method ellipse');
            };
        });

        var circle1 = new Circle();
        var circle2 = new Circle();
        circle2.fillSecond();
        circle1.test1();
        circle2.test2();
    });


    it('Check inheritance overwrite of descendant class', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name      = 'figure1';
            $public.category  = 'generic';
            $protected.type   = 'figure';
            $protected.angles = 'none';
            $protected.init = function () {
                _(this).id  = 1;
                _(this).uid = 'secret_uid';
            };
            $protected.method = function () {
                return 'method ' + this.type;
            };
            $protected.scale = function () {
                return 'scale ' + this.type;
            };
            $public.fillFigure = function () {
                this.name      = 'figure2';
                this.category  = 'generic2';
                _(this).id     = 2;
                _(this).uid    = 'secret_uid_2';
                _(this).type   = 'figure_';
                _(this).angles = 'none2';
            };
        });
        var Ellipse = Class.create(Figure, function ($public, $protected, _) {
            $public.name      = 'ellipse1';
            $public.category  = 'rounded';
            $protected.type   = 'ellipse';
            $protected.angles = 'zero';
            $protected.init = function () {
                _(this).id = 20;
                _(this).rx = 10;
                _(this).ry = 20;
            };
            $protected.method = function () {
                return 'move ' + this.type;
            };
            $public.fillEllipse = function () {
                this.name      = 'ellipse2';
                this.category  = 'rounded2';
                _(this).id     = 3;
                _(this).uid    = 'secret_uid_3';
                _(this).type   = 'ellipse';
                _(this).angles = 'zero2';
                _(this).rx     = 30;
                _(this).ry     = 40;
            };
        });
        var Circle = Class.create(Ellipse, function ($public, $protected, _) {
            $public.name    = 'circle1';
            $protected.type = 'circle';
            $protected.init = function () {
                _(this).id = 30;
                _(this).r  = 30;
            };
            $protected.method = function () {
                return 'move ' + this.type;
            };
            $public.fillCircle = function () {
                this.name      = 'circle2';
                _(this).id     = 3;
                _(this).type   = 'circle_';
                _(this).r      = 50;
            };
            $public.test1 = function () {
                expect(this.name)       .to.be.equal('circle1');
                expect(this.category)   .to.be.equal('rounded');
                expect(_(this).type)    .to.be.equal('circle');
                expect(_(this).angles)  .to.be.equal('zero');
                expect(_(this).id)      .to.be.equal(30);
                expect(_(this).uid)     .to.be.equal(undefined);
                expect(_(this).rx)      .to.be.equal(undefined);
                expect(_(this).r)       .to.be.equal(30);

            };
            $public.test2 = function () {
                expect(this.name)       .to.be.equal('circle2');
                expect(this.category)   .to.be.equal('rounded2');
                expect(_(this).type)    .to.be.equal('circle_');
                expect(_(this).angles)  .to.be.equal('zero2');
                expect(_(this).id)      .to.be.equal(3);
                expect(_(this).uid)     .to.be.equal(undefined);
                expect(_(this).rx)      .to.be.equal(undefined);
                expect(_(this).r)       .to.be.equal(50);
            };
        });

        var circle1 = new Circle();
        var circle2 = new Circle();
        circle2.fillFigure();
        circle2.fillEllipse();
        circle2.fillCircle();
        circle1.test1();
        circle2.test2();
    });


    it('Check the independence of descendant class', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $protected.type = 'figure';
            $protected.init = function () {
                _(this).id = 1;
            };
            $protected.method = function () {
                return 'method ' + this.type;
            };
            $public.test = function (circle) {
                expect(this.name)         .to.be.equal('figure1');
                expect(_(this).id)        .to.be.equal(1);
                expect(_(this).type)      .to.be.equal('figure');
                expect(_(this).method())  .to.be.equal('method figure');
                expect(_(this).category)  .to.be.equal(undefined);
                expect(_(this).radius)    .to.be.equal(undefined);
                expect(_(circle).id)      .to.be.equal(undefined);
                expect(_(circle).type)    .to.be.equal('circle');
                expect(_(circle).category).to.be.equal(undefined);
                expect(_(circle).radius)  .to.be.equal(undefined);
                expect(_(circle).method()).to.be.equal('zoom circle');
            };
        });
        var Ellipse = Class.create(Figure, function ($public, $protected, _) {
            $public.name        = 'ellipse1';
            $protected.type     = 'ellipse';
            $protected.category = 'rounded';
            $protected.init = function () {
                _(this).id = 2;
                _(this).rx = 6;
                _(this).ry = 7;
            };
            $protected.method = function () {
                return 'move ' + this.type;
            };
            $public.test = function (circle) {
                expect(this.name)         .to.be.equal('ellipse1');
                expect(_(this).id)        .to.be.equal(2);
                expect(_(this).type)      .to.be.equal('ellipse');
                expect(_(this).method())  .to.be.equal('move ellipse');
                expect(_(circle).id)      .to.be.equal(undefined);
                expect(_(circle).type)    .to.be.equal('circle');
                expect(_(circle).category).to.be.equal('rounded');
                expect(_(circle).radius)  .to.be.equal(undefined);
                expect(_(circle).method()).to.be.equal('zoom circle');
            };
        });
        var Circle = Class.create(Ellipse, function ($public, $protected, _) {
            $public.name      = 'circle1';
            $protected.type   = 'circle';
            $protected.radius = 10;
            $protected.init = function () {
                _(this).id = 3;
                _(this).r  = 20;
            };
            $protected.method = function () {
                return 'zoom ' + this.type;
            };
            $public.test = function (figure) {
                expect(this.name)         .to.be.equal('circle1');
                expect(_(this).id)        .to.be.equal(3);
                expect(_(this).type)      .to.be.equal('circle');
                expect(_(this).method())  .to.be.equal('zoom circle');
                expect(_(figure).type)    .to.be.equal('figure');
                expect(_(figure).id)      .to.be.equal(undefined);
                expect(_(figure).category).to.be.equal(undefined);
                expect(_(figure).rx)      .to.be.equal(undefined);
                expect(_(figure).radius)  .to.be.equal(undefined);
            };
        });

        var figure  = new Figure();
        var ellipse = new Ellipse();
        var circle  = new Circle();
        figure.test(circle);
        ellipse.test(circle);
        circle.test(figure);
    });


    it('Check the independence of other child class', function () {
        var Figure = Class.create(function ($public, $protected, _) {
            $public.name    = 'figure1';
            $protected.type = 'figure';
            $protected.init = function () {
                _(this).id = 1;
            };
            $protected.method = function () {
                return 'method ' + this.type;
            };
        });
        var Ellipse = Class.create(Figure, function ($public, $protected, _) {
            $public.name        = 'ellipse1';
            $protected.type     = 'ellipse';
            $protected.category = 'rounded';
            $protected.width    = '1px';
            $protected.init = function () {
                _(this).id = 2;
                _(this).rx = 6;
                _(this).ry = 7;
            };
            $protected.method = function () {
                return 'move ' + this.type;
            };
            $public.test = function (rect) {
                expect(this.name)         .to.be.equal('ellipse1');
                expect(_(this).id)        .to.be.equal(2);
                expect(_(this).type)      .to.be.equal('ellipse');
                expect(_(this).category)  .to.be.equal('rounded');
                expect(_(this).width)     .to.be.equal('1px');
                expect(_(this).rounded)   .to.be.equal(undefined);
                expect(_(this).method())  .to.be.equal('move ellipse');
                expect(_(this).rx)        .to.be.equal(6);
                expect(_(this).w)         .to.be.equal(undefined);
                expect(_(rect).id)        .to.be.equal(undefined);
                expect(_(rect).type)      .to.be.equal('rectangle');
                expect(_(rect).category)  .to.be.equal(undefined);
                expect(_(rect).width)     .to.be.equal(undefined);
                expect(_(rect).rounded)   .to.be.equal(undefined);
                expect(_(rect).method())  .to.be.equal('zoom rectangle');
                expect(_(rect).rx)        .to.be.equal(undefined);
                expect(_(rect).w)         .to.be.equal(undefined);
            };
        });
        var Rectangle = Class.create(Figure, function ($public, $protected, _) {
            $public.name        = 'rectangle1';
            $protected.type     = 'rectangle';
            $protected.category = 'generic';
            $protected.rounded  = '0px';
            $protected.init = function () {
                _(this).id = 3;
                _(this).w  = 20;
                _(this).h  = 40;
            };
            $protected.method = function () {
                return 'zoom ' + this.type;
            };
            $public.test = function (ellipse) {
                expect(this.name)          .to.be.equal('rectangle1');
                expect(_(this).id)         .to.be.equal(3);
                expect(_(this).type)       .to.be.equal('rectangle');
                expect(_(this).category)   .to.be.equal('generic');
                expect(_(this).width)      .to.be.equal(undefined);
                expect(_(this).rounded)    .to.be.equal('0px');
                expect(_(this).method())   .to.be.equal('zoom rectangle');
                expect(_(this).rx)         .to.be.equal(undefined);
                expect(_(this).w)          .to.be.equal(20);
                expect(_(ellipse).id)      .to.be.equal(undefined);
                expect(_(ellipse).type)    .to.be.equal('ellipse');
                expect(_(ellipse).category).to.be.equal(undefined);
                expect(_(ellipse).width)   .to.be.equal(undefined);
                expect(_(ellipse).rounded) .to.be.equal(undefined);
                expect(_(ellipse).method()).to.be.equal('move ellipse');
                expect(_(ellipse).rx)      .to.be.equal(undefined);
                expect(_(ellipse).w)       .to.be.equal(undefined);
            };
        });

        var figure    = new Figure();
        var ellipse   = new Ellipse();
        var rectangle = new Rectangle();
        ellipse.test(rectangle);
        rectangle.test(ellipse);
    });
});
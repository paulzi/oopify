'use strict';

var expect = chai.expect;

var Figure     = Class.create(function () {});
var Ellipse    = Class.create(Figure, function () {});
var Circle     = Class.create(Ellipse, function () {});
var Rectangle  = Class.create(Figure, function () {});
var Square     = Class.create(Rectangle, function () {});
var Animal     = Class.create(function () {});
var Dog        = Class.create(Animal, function () {});
var Movable    = Class.create(function () {});
var MFigure    = Class.create([Figure, Movable], function () {});
var MEllipse   = Class.create([Ellipse, Movable], function () {});
var MCircle    = Class.create(MEllipse, function () {});
var MRectangle = Class.create(MFigure, function () {});
var MSquare    = Class.create(MRectangle, function () {});
var MAnimal    = Class.create([Movable, Animal], function () {});
var MDog       = Class.create(MAnimal, function () {});

var figure     = new Figure();
var ellipse    = new Ellipse();
var circle     = new Circle();
var rectangle  = new Rectangle();
var square     = new Square();
var animal     = new Animal();
var dog        = new Dog();
var mFigure    = new MFigure();
var mEllipse   = new MEllipse();
var mCircle    = new MCircle();
var mRectangle = new MRectangle();
var mSquare    = new MSquare();
var mAnimal    = new MAnimal();
var mDog       = new MDog();

describe("Class.is test suite", function() {
    it('Check single class', function () {
        expect(Class.is(figure, Figure)).to.be.equal(true);
        expect(Class.is(figure, Animal)).to.be.equal(false);
        expect(Class.is(animal, Figure)).to.be.equal(false);
        expect(Class.is(animal, Animal)).to.be.equal(true);
    });

    it('Check single child', function () {
        expect(Class.is(ellipse, Figure))   .to.be.equal(true);
        expect(Class.is(ellipse, Ellipse))  .to.be.equal(true);
        expect(Class.is(ellipse, Rectangle)).to.be.equal(false);
        expect(Class.is(ellipse, Animal))   .to.be.equal(false);
        expect(Class.is(ellipse, Dog))      .to.be.equal(false);
    });

    it('Check single parent-child', function () {
        expect(Class.is(figure,    Ellipse)).to.be.equal(false);
        expect(Class.is(rectangle, Ellipse)).to.be.equal(false);
        expect(Class.is(animal,    Ellipse)).to.be.equal(false);
        expect(Class.is(dog,       Ellipse)).to.be.equal(false);
    });

    it('Check single descendant', function () {
        expect(Class.is(circle, Figure))   .to.be.equal(true);
        expect(Class.is(circle, Ellipse))  .to.be.equal(true);
        expect(Class.is(circle, Circle))   .to.be.equal(true);
        expect(Class.is(circle, Rectangle)).to.be.equal(false);
        expect(Class.is(circle, Square))   .to.be.equal(false);
        expect(Class.is(circle, Animal))   .to.be.equal(false);
        expect(Class.is(circle, Dog))      .to.be.equal(false);
    });

    it('Check single parent-descendant', function () {
        expect(Class.is(figure,    Circle)).to.be.equal(false);
        expect(Class.is(ellipse,   Circle)).to.be.equal(false);
        expect(Class.is(rectangle, Circle)).to.be.equal(false);
        expect(Class.is(square,    Circle)).to.be.equal(false);
        expect(Class.is(animal,    Circle)).to.be.equal(false);
        expect(Class.is(dog,       Circle)).to.be.equal(false);
    });

    it('Check multi class', function () {
        expect(Class.is(mFigure, Movable)).to.be.equal(true);
        expect(Class.is(mFigure, Figure)) .to.be.equal(true);
        expect(Class.is(mFigure, MFigure)).to.be.equal(true);
        expect(Class.is(mFigure, Animal)) .to.be.equal(false);
        expect(Class.is(mFigure, MAnimal)).to.be.equal(false);
        expect(Class.is(figure,  MFigure)).to.be.equal(false);
    });

    it('Check multi class flip order', function () {
        expect(Class.is(mAnimal, Movable)).to.be.equal(true);
        expect(Class.is(mAnimal, Figure)) .to.be.equal(false);
        expect(Class.is(mAnimal, MFigure)).to.be.equal(false);
        expect(Class.is(mAnimal, Animal)) .to.be.equal(true);
        expect(Class.is(mAnimal, MAnimal)).to.be.equal(true);
        expect(Class.is(animal,  MAnimal)).to.be.equal(false);
    });

    it('Check multi child', function () {
        expect(Class.is(mEllipse, Movable))   .to.be.equal(true);
        expect(Class.is(mEllipse, Figure))    .to.be.equal(true);
        expect(Class.is(mEllipse, Ellipse))   .to.be.equal(true);
        expect(Class.is(mEllipse, Rectangle)) .to.be.equal(false);
        expect(Class.is(mEllipse, Animal))    .to.be.equal(false);
        expect(Class.is(mEllipse, Dog))       .to.be.equal(false);
        expect(Class.is(mEllipse, MFigure))   .to.be.equal(false);
        expect(Class.is(mEllipse, MEllipse))  .to.be.equal(true);
        expect(Class.is(mEllipse, MRectangle)).to.be.equal(false);
        expect(Class.is(mEllipse, MAnimal))   .to.be.equal(false);
        expect(Class.is(mEllipse, MDog))      .to.be.equal(false);
    });

    it('Check multi child 2', function () {
        expect(Class.is(mRectangle, Movable))   .to.be.equal(true);
        expect(Class.is(mRectangle, Figure))    .to.be.equal(true);
        expect(Class.is(mRectangle, Ellipse))   .to.be.equal(false);
        expect(Class.is(mRectangle, Rectangle)) .to.be.equal(false);
        expect(Class.is(mRectangle, Animal))    .to.be.equal(false);
        expect(Class.is(mRectangle, Dog))       .to.be.equal(false);
        expect(Class.is(mRectangle, MFigure))   .to.be.equal(true);
        expect(Class.is(mRectangle, MEllipse))  .to.be.equal(false);
        expect(Class.is(mRectangle, MRectangle)).to.be.equal(true);
        expect(Class.is(mRectangle, MAnimal))   .to.be.equal(false);
        expect(Class.is(mRectangle, MDog))      .to.be.equal(false);
    });

    it('Check multi child flip order', function () {
        expect(Class.is(mDog, Movable))   .to.be.equal(true);
        expect(Class.is(mDog, Figure))    .to.be.equal(false);
        expect(Class.is(mDog, Ellipse))   .to.be.equal(false);
        expect(Class.is(mDog, Rectangle)) .to.be.equal(false);
        expect(Class.is(mDog, Animal))    .to.be.equal(true);
        expect(Class.is(mDog, Dog))       .to.be.equal(false);
        expect(Class.is(mDog, MFigure))   .to.be.equal(false);
        expect(Class.is(mDog, MEllipse))  .to.be.equal(false);
        expect(Class.is(mDog, MRectangle)).to.be.equal(false);
        expect(Class.is(mDog, MAnimal))   .to.be.equal(true);
        expect(Class.is(mDog, MDog))      .to.be.equal(true);
    });

    it('Check multi parent-child', function () {
        expect(Class.is(figure,     MEllipse)).to.be.equal(false);
        expect(Class.is(ellipse,    MEllipse)).to.be.equal(false);
        expect(Class.is(rectangle,  MEllipse)).to.be.equal(false);
        expect(Class.is(animal,     MEllipse)).to.be.equal(false);
        expect(Class.is(dog,        MEllipse)).to.be.equal(false);
        expect(Class.is(mFigure,    MEllipse)).to.be.equal(false);
        expect(Class.is(mRectangle, MEllipse)).to.be.equal(false);
        expect(Class.is(mAnimal,    MEllipse)).to.be.equal(false);
        expect(Class.is(mDog,       MEllipse)).to.be.equal(false);
    });

    it('Check multi parent-child 2', function () {
        expect(Class.is(figure,    MRectangle)).to.be.equal(false);
        expect(Class.is(ellipse,   MRectangle)).to.be.equal(false);
        expect(Class.is(rectangle, MRectangle)).to.be.equal(false);
        expect(Class.is(animal,    MRectangle)).to.be.equal(false);
        expect(Class.is(dog,       MRectangle)).to.be.equal(false);
        expect(Class.is(mFigure,   MRectangle)).to.be.equal(false);
        expect(Class.is(mEllipse,  MRectangle)).to.be.equal(false);
        expect(Class.is(mAnimal,   MRectangle)).to.be.equal(false);
        expect(Class.is(mDog,      MRectangle)).to.be.equal(false);
    });

    it('Check multi parent-child flip order', function () {
        expect(Class.is(figure,     MDog)).to.be.equal(false);
        expect(Class.is(ellipse,    MDog)).to.be.equal(false);
        expect(Class.is(rectangle,  MDog)).to.be.equal(false);
        expect(Class.is(animal,     MDog)).to.be.equal(false);
        expect(Class.is(dog,        MDog)).to.be.equal(false);
        expect(Class.is(mFigure,    MDog)).to.be.equal(false);
        expect(Class.is(mEllipse,   MDog)).to.be.equal(false);
        expect(Class.is(mRectangle, MDog)).to.be.equal(false);
        expect(Class.is(mAnimal,    MDog)).to.be.equal(false);
    });

    it('Check multi descendant', function () {
        expect(Class.is(mCircle, Movable))   .to.be.equal(true);
        expect(Class.is(mCircle, Figure))    .to.be.equal(true);
        expect(Class.is(mCircle, Ellipse))   .to.be.equal(true);
        expect(Class.is(mCircle, Circle))    .to.be.equal(false);
        expect(Class.is(mCircle, Rectangle)) .to.be.equal(false);
        expect(Class.is(mCircle, Square))    .to.be.equal(false);
        expect(Class.is(mCircle, Animal))    .to.be.equal(false);
        expect(Class.is(mCircle, Dog))       .to.be.equal(false);
        expect(Class.is(mCircle, MFigure))   .to.be.equal(false);
        expect(Class.is(mCircle, MEllipse))  .to.be.equal(true);
        expect(Class.is(mCircle, MCircle))   .to.be.equal(true);
        expect(Class.is(mCircle, MRectangle)).to.be.equal(false);
        expect(Class.is(mCircle, MSquare))   .to.be.equal(false);
        expect(Class.is(mCircle, MAnimal))   .to.be.equal(false);
        expect(Class.is(mCircle, MDog))      .to.be.equal(false);
    });

    it('Check multi descendant 2', function () {
        expect(Class.is(mSquare, Movable))   .to.be.equal(true);
        expect(Class.is(mSquare, Figure))    .to.be.equal(true);
        expect(Class.is(mSquare, Ellipse))   .to.be.equal(false);
        expect(Class.is(mSquare, Circle))    .to.be.equal(false);
        expect(Class.is(mSquare, Rectangle)) .to.be.equal(false);
        expect(Class.is(mSquare, Square))    .to.be.equal(false);
        expect(Class.is(mSquare, Animal))    .to.be.equal(false);
        expect(Class.is(mSquare, Dog))       .to.be.equal(false);
        expect(Class.is(mSquare, MFigure))   .to.be.equal(true);
        expect(Class.is(mSquare, MEllipse))  .to.be.equal(false);
        expect(Class.is(mSquare, MCircle))   .to.be.equal(false);
        expect(Class.is(mSquare, MRectangle)).to.be.equal(true);
        expect(Class.is(mSquare, MSquare))   .to.be.equal(true);
        expect(Class.is(mSquare, MAnimal))   .to.be.equal(false);
        expect(Class.is(mSquare, MDog))      .to.be.equal(false);
    });

    it('Check multi parent-descendant', function () {
        expect(Class.is(figure,     MCircle)).to.be.equal(false);
        expect(Class.is(ellipse,    MCircle)).to.be.equal(false);
        expect(Class.is(circle,     MCircle)).to.be.equal(false);
        expect(Class.is(rectangle,  MCircle)).to.be.equal(false);
        expect(Class.is(square,     MCircle)).to.be.equal(false);
        expect(Class.is(animal,     MCircle)).to.be.equal(false);
        expect(Class.is(dog,        MCircle)).to.be.equal(false);
        expect(Class.is(mFigure,    MCircle)).to.be.equal(false);
        expect(Class.is(mEllipse,   MCircle)).to.be.equal(false);
        expect(Class.is(mRectangle, MCircle)).to.be.equal(false);
        expect(Class.is(mSquare,    MCircle)).to.be.equal(false);
        expect(Class.is(mAnimal,    MCircle)).to.be.equal(false);
        expect(Class.is(mDog,       MCircle)).to.be.equal(false);
    });

    it('Check multi parent-descendant 2', function () {
        expect(Class.is(figure,     MSquare)).to.be.equal(false);
        expect(Class.is(ellipse,    MSquare)).to.be.equal(false);
        expect(Class.is(circle,     MSquare)).to.be.equal(false);
        expect(Class.is(rectangle,  MSquare)).to.be.equal(false);
        expect(Class.is(square,     MSquare)).to.be.equal(false);
        expect(Class.is(animal,     MSquare)).to.be.equal(false);
        expect(Class.is(dog,        MSquare)).to.be.equal(false);
        expect(Class.is(mFigure,    MSquare)).to.be.equal(false);
        expect(Class.is(mEllipse,   MSquare)).to.be.equal(false);
        expect(Class.is(mCircle,    MSquare)).to.be.equal(false);
        expect(Class.is(mRectangle, MSquare)).to.be.equal(false);
        expect(Class.is(mAnimal,    MSquare)).to.be.equal(false);
        expect(Class.is(mDog,       MSquare)).to.be.equal(false);
    });
});
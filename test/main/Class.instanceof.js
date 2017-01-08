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

describe("Class instanceof test suite", function() {
    it('Check single class', function () {
        expect(figure instanceof Figure).to.be.equal(true);
        expect(figure instanceof Animal).to.be.equal(false);
        expect(animal instanceof Figure).to.be.equal(false);
        expect(animal instanceof Animal).to.be.equal(true);
    });
    
    it('Check single child', function () {
        expect(ellipse instanceof Figure)   .to.be.equal(true);
        expect(ellipse instanceof Ellipse)  .to.be.equal(true);
        expect(ellipse instanceof Rectangle).to.be.equal(false);
        expect(ellipse instanceof Animal)   .to.be.equal(false);
        expect(ellipse instanceof Dog)      .to.be.equal(false);
    });

    it('Check single parent-child', function () {
        expect(figure    instanceof Ellipse).to.be.equal(false);
        expect(rectangle instanceof Ellipse).to.be.equal(false);
        expect(animal    instanceof Ellipse).to.be.equal(false);
        expect(dog       instanceof Ellipse).to.be.equal(false);
    });

    it('Check single descendant', function () {
        expect(circle instanceof Figure)   .to.be.equal(true);
        expect(circle instanceof Ellipse)  .to.be.equal(true);
        expect(circle instanceof Circle)   .to.be.equal(true);
        expect(circle instanceof Rectangle).to.be.equal(false);
        expect(circle instanceof Square)   .to.be.equal(false);
        expect(circle instanceof Animal)   .to.be.equal(false);
        expect(circle instanceof Dog)      .to.be.equal(false);
    });

    it('Check single parent-descendant', function () {
        expect(figure    instanceof Circle).to.be.equal(false);
        expect(ellipse   instanceof Circle).to.be.equal(false);
        expect(rectangle instanceof Circle).to.be.equal(false);
        expect(square    instanceof Circle).to.be.equal(false);
        expect(animal    instanceof Circle).to.be.equal(false);
        expect(dog       instanceof Circle).to.be.equal(false);
    });

    it('Check multi class', function () {
        expect(mFigure instanceof Figure) .to.be.equal(true);
        expect(mFigure instanceof MFigure).to.be.equal(true);
        expect(mFigure instanceof Animal) .to.be.equal(false);
        expect(mFigure instanceof MAnimal).to.be.equal(false);
        expect(figure  instanceof MFigure).to.be.equal(false);
    });

    it('Check multi class flip order', function () {
        expect(mAnimal instanceof Movable).to.be.equal(true);
        expect(mAnimal instanceof Figure) .to.be.equal(false);
        expect(mAnimal instanceof MFigure).to.be.equal(false);
        expect(mAnimal instanceof MAnimal).to.be.equal(true);
        expect(animal  instanceof MAnimal).to.be.equal(false);
    });

    it('Check multi child', function () {
        expect(mEllipse instanceof Figure)    .to.be.equal(true);
        expect(mEllipse instanceof Ellipse)   .to.be.equal(true);
        expect(mEllipse instanceof Rectangle) .to.be.equal(false);
        expect(mEllipse instanceof Animal)    .to.be.equal(false);
        expect(mEllipse instanceof Dog)       .to.be.equal(false);
        expect(mEllipse instanceof MFigure)   .to.be.equal(false);
        expect(mEllipse instanceof MEllipse)  .to.be.equal(true);
        expect(mEllipse instanceof MRectangle).to.be.equal(false);
        expect(mEllipse instanceof MAnimal)   .to.be.equal(false);
        expect(mEllipse instanceof MDog)      .to.be.equal(false);
    });

    it('Check multi child 2', function () {
        expect(mRectangle instanceof Figure)    .to.be.equal(true);
        expect(mRectangle instanceof Ellipse)   .to.be.equal(false);
        expect(mRectangle instanceof Rectangle) .to.be.equal(false);
        expect(mRectangle instanceof Animal)    .to.be.equal(false);
        expect(mRectangle instanceof Dog)       .to.be.equal(false);
        expect(mRectangle instanceof MFigure)   .to.be.equal(true);
        expect(mRectangle instanceof MEllipse)  .to.be.equal(false);
        expect(mRectangle instanceof MRectangle).to.be.equal(true);
        expect(mRectangle instanceof MAnimal)   .to.be.equal(false);
        expect(mRectangle instanceof MDog)      .to.be.equal(false);
    });

    it('Check multi child flip order', function () {
        expect(mDog instanceof Movable)   .to.be.equal(true);
        expect(mDog instanceof Figure)    .to.be.equal(false);
        expect(mDog instanceof Ellipse)   .to.be.equal(false);
        expect(mDog instanceof Rectangle) .to.be.equal(false);
        expect(mDog instanceof Dog)       .to.be.equal(false);
        expect(mDog instanceof MFigure)   .to.be.equal(false);
        expect(mDog instanceof MEllipse)  .to.be.equal(false);
        expect(mDog instanceof MRectangle).to.be.equal(false);
        expect(mDog instanceof MAnimal)   .to.be.equal(true);
        expect(mDog instanceof MDog)      .to.be.equal(true);
    });

    it('Check multi parent-child', function () {
        expect(figure     instanceof MEllipse).to.be.equal(false);
        expect(ellipse    instanceof MEllipse).to.be.equal(false);
        expect(rectangle  instanceof MEllipse).to.be.equal(false);
        expect(animal     instanceof MEllipse).to.be.equal(false);
        expect(dog        instanceof MEllipse).to.be.equal(false);
        expect(mFigure    instanceof MEllipse).to.be.equal(false);
        expect(mRectangle instanceof MEllipse).to.be.equal(false);
        expect(mAnimal    instanceof MEllipse).to.be.equal(false);
        expect(mDog       instanceof MEllipse).to.be.equal(false);
    });

    it('Check multi parent-child 2', function () {
        expect(figure    instanceof MRectangle).to.be.equal(false);
        expect(ellipse   instanceof MRectangle).to.be.equal(false);
        expect(rectangle instanceof MRectangle).to.be.equal(false);
        expect(animal    instanceof MRectangle).to.be.equal(false);
        expect(dog       instanceof MRectangle).to.be.equal(false);
        expect(mFigure   instanceof MRectangle).to.be.equal(false);
        expect(mEllipse  instanceof MRectangle).to.be.equal(false);
        expect(mAnimal   instanceof MRectangle).to.be.equal(false);
        expect(mDog      instanceof MRectangle).to.be.equal(false);
    });

    it('Check multi parent-child flip order', function () {
        expect(figure     instanceof MDog).to.be.equal(false);
        expect(ellipse    instanceof MDog).to.be.equal(false);
        expect(rectangle  instanceof MDog).to.be.equal(false);
        expect(animal     instanceof MDog).to.be.equal(false);
        expect(dog        instanceof MDog).to.be.equal(false);
        expect(mFigure    instanceof MDog).to.be.equal(false);
        expect(mEllipse   instanceof MDog).to.be.equal(false);
        expect(mRectangle instanceof MDog).to.be.equal(false);
        expect(mAnimal    instanceof MDog).to.be.equal(false);
    });

    it('Check multi descendant', function () {
        expect(mCircle instanceof Figure)    .to.be.equal(true);
        expect(mCircle instanceof Ellipse)   .to.be.equal(true);
        expect(mCircle instanceof Circle)    .to.be.equal(false);
        expect(mCircle instanceof Rectangle) .to.be.equal(false);
        expect(mCircle instanceof Square)    .to.be.equal(false);
        expect(mCircle instanceof Animal)    .to.be.equal(false);
        expect(mCircle instanceof Dog)       .to.be.equal(false);
        expect(mCircle instanceof MFigure)   .to.be.equal(false);
        expect(mCircle instanceof MEllipse)  .to.be.equal(true);
        expect(mCircle instanceof MCircle)   .to.be.equal(true);
        expect(mCircle instanceof MRectangle).to.be.equal(false);
        expect(mCircle instanceof MSquare)   .to.be.equal(false);
        expect(mCircle instanceof MAnimal)   .to.be.equal(false);
        expect(mCircle instanceof MDog)      .to.be.equal(false);
    });

    it('Check multi descendant 2', function () {
        expect(mSquare instanceof Figure)    .to.be.equal(true);
        expect(mSquare instanceof Ellipse)   .to.be.equal(false);
        expect(mSquare instanceof Circle)    .to.be.equal(false);
        expect(mSquare instanceof Rectangle) .to.be.equal(false);
        expect(mSquare instanceof Square)    .to.be.equal(false);
        expect(mSquare instanceof Animal)    .to.be.equal(false);
        expect(mSquare instanceof Dog)       .to.be.equal(false);
        expect(mSquare instanceof MFigure)   .to.be.equal(true);
        expect(mSquare instanceof MEllipse)  .to.be.equal(false);
        expect(mSquare instanceof MCircle)   .to.be.equal(false);
        expect(mSquare instanceof MRectangle).to.be.equal(true);
        expect(mSquare instanceof MSquare)   .to.be.equal(true);
        expect(mSquare instanceof MAnimal)   .to.be.equal(false);
        expect(mSquare instanceof MDog)      .to.be.equal(false);
    });

    it('Check multi parent-descendant', function () {
        expect(figure     instanceof MCircle).to.be.equal(false);
        expect(ellipse    instanceof MCircle).to.be.equal(false);
        expect(circle     instanceof MCircle).to.be.equal(false);
        expect(rectangle  instanceof MCircle).to.be.equal(false);
        expect(square     instanceof MCircle).to.be.equal(false);
        expect(animal     instanceof MCircle).to.be.equal(false);
        expect(dog        instanceof MCircle).to.be.equal(false);
        expect(mFigure    instanceof MCircle).to.be.equal(false);
        expect(mEllipse   instanceof MCircle).to.be.equal(false);
        expect(mRectangle instanceof MCircle).to.be.equal(false);
        expect(mSquare    instanceof MCircle).to.be.equal(false);
        expect(mAnimal    instanceof MCircle).to.be.equal(false);
        expect(mDog       instanceof MCircle).to.be.equal(false);
    });

    it('Check multi parent-descendant 2', function () {
        expect(figure     instanceof MSquare).to.be.equal(false);
        expect(ellipse    instanceof MSquare).to.be.equal(false);
        expect(circle     instanceof MSquare).to.be.equal(false);
        expect(rectangle  instanceof MSquare).to.be.equal(false);
        expect(square     instanceof MSquare).to.be.equal(false);
        expect(animal     instanceof MSquare).to.be.equal(false);
        expect(dog        instanceof MSquare).to.be.equal(false);
        expect(mFigure    instanceof MSquare).to.be.equal(false);
        expect(mEllipse   instanceof MSquare).to.be.equal(false);
        expect(mCircle    instanceof MSquare).to.be.equal(false);
        expect(mRectangle instanceof MSquare).to.be.equal(false);
        expect(mAnimal    instanceof MSquare).to.be.equal(false);
        expect(mDog       instanceof MSquare).to.be.equal(false);
    });
});
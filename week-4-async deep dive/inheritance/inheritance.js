class Shape{
    constructor(color){
        this.color = color
    }

    paint(){
        console.log(`painting with the color ${this.color}`)
    }

    area(){
        throw new Error("This area method must be implemented in the subclass")
    }
}
class Rectangle extends Shape {
    constructor(width,  height, color){
        super(color);
        this.width = width;
        this.height = height;
    }

    area(){
        const area = this.width * this.height;
        return area;
    }

    perimeter(){
        const perimeter = 2 * ( this.width + this.height);
        return perimeter;
    }

}

class Circle extends Shape{
    constructor(radius, color){
        super(color);
        this.radius = radius;
    }

    area(){
        const area = Math.PI * this.radius * this.radius;
        return area;
    }

    perimeter(){
        const perimeter = 2 * Math.PI * this.radius;
        return perimeter;
    }
}

class Square extends Shape{
    constructor(side, color){
        super(color)
        this.side = side;
    }

    area(){
        const area = this.side * this.side;
        return area;
    }

    perimeter(){
        const perimeter = 4 * this.side;
        return perimeter;
    }
}

/** 
 *  common logic{ properties and methods} in shape class
 */

const r1 = new Rectangle(10, 20, "red");
const c1 = new Circle(10, "blue");
const s1 = new Square(10, "green");
r1.paint()

class Rectangle {
    constructor(width,  height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    area(){
        const area = this.width * this.height;
        return area;
    }

    perimeter(){
        const perimeter = 2 * ( this.width + this.height);
        return perimeter;
    }

    static description(){
        return "This is a rectangle class";
        // console.log("Printing description");
    }

    print(){
        console.log(`Rectangle of width ${this.width} and height ${this.height}`);
        console.log(`Area of the rectanle is ${this.area()}`);
        console.log(`Perimeter of the rectangle is ${this.perimeter()}`);
        console.log(`Painting with color ${this.color}`)
    }
}

const rect1 = new Rectangle(5,10, "red"); // constructor gets called here
// const desc = Rectangle.description(); // Static method gets called here
console.log(Rectangle.description())

/**
 *  Static method belogs to class not instance
 *  Static methods are attached to the class directly
 */
// rect1.description();  //TypeError: rect1.description is not a function
rect1.print();

console.log("################################")

/**
 *  This
 */

const date = new Date(); //Predefined date class
const start = new Date();
console.log(date.getDate());
console.log(start.getTime());
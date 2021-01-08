"use strict";

class Rectangle{
    constructor(height, width){
        this.height = height;
        this.width = width;
    }

    CalcArea(){
        return this.height * this.width;
    }
}


class ColorRectangleWithText extends Rectangle{
    constructor(height, width, text, bgColor){
        super(height,width); // этот мытод вызывает супер конструткор родителя
        this.text = text;
        this.bgColor = bgColor;
    }

    ShowMyProps(){
        console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`);
    }
}

const square = new Rectangle(10,10);
console.log(square.CalcArea());
const squareNumber1 = new ColorRectangleWithText(5,5,"Car","black");
console.log(squareNumber1.CalcArea());
squareNumber1.ShowMyProps();

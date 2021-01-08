"use strict";

// мы помним что функция по своей сути является объектом

function User(name, id){
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function(){
        console.log(`Hello ${this.name}`);
    };
}

User.prototype.exit = function(){ // теперь у нас прототипно появится еще этот метод
    console.log(`${this.name} ушел`);
};

const ivan = new User("Ivan", 28);
const alex = new User("Alex", 29);

console.log(ivan);
ivan.hello();
console.log(alex);
alex.hello();
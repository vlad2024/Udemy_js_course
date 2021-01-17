"use strict";

class User{
    constructor(name, age){
        this.name = name;
        this._age = age; // нет доступа из вне благодаря нижнему подчеркиванию, и это не синтаксис языка,
        //есть хорошо известрое соглашение между программистами, что такие свойства и методы не доступны из вне
    }

    #surname = "Petrychenko"; // это свойство действительно приватное, но такой синтаксис еще не вошел в
    // стандарт, по это мне поддерживается всеми браузерами

    say(){ 
        console.log(`Имя пользователя: ${this.name}${this.#surname}, возраст ${this._age}`);
    }

    get age(){
        return this._age;
    }

    set age(age){
        if(typeof(age) === "number" && age > 0 && age < 110){
            this._age = age;
        }
    }
}

const ivan = new User("Ivan", 27);
console.log(ivan.age);
ivan.age = 99;
console.log(ivan.age);
ivan.say();
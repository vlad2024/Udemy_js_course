"use strict";

// сейчас поговорим о таком приёмае как Модуль - он как раз и используется для того, чтобы скрыть все детали 
// реализации скрипта 

const app = "123"; // будет ошибка, ибо такая переменная у нас уже есть в lib.js и мы не можем снова создать
// такую переменную глобально

const number = 1;

(function(){
    let number = 2; // это будет совсем другой намбер локальной области видимости
    console.log(number);
    console.log(number+3);
}()); // этот приём называется анонимная самовызывающая функция

console.log(number); // обратились к намберу глобальной области

const user = (function(){ // мы такой функционал анонимных самовызывающийся функций прописывать не будем
    const privat = function(){ // за нас это будет делать Webpack
        console.log("i am privat!");
    };

    return {
        sayHello: privat
    };
}());

user.sayHello();

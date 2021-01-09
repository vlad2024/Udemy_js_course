"use strict";

// JSON(JavaScript Object Notation) - современный формат передачи данных

const persone = {
    name: "alex",
    tel: "3805555555",
    parents:{
        mom: "Olga",
        dad: "Mike"
    }
};

console.log(JSON.stringify(persone)); // теперь такой формат данных мы можем отправить на сервер

console.log(JSON.parse(JSON.stringify(persone)));
// а это уже обратная ситуация, когда к нам с сервера приходит JSON и нам необходимо превратить его в обычный
// объект, а так как нам сейчас с сервера ничего не приходит мы использум наш прошлый JSON

const clone = JSON.parse(JSON.stringify(persone)); // такм способом мы сделали глубокую копию объекта
clone.parents.mom = "Ann";
console.log(persone.parents.mom);
console.log(clone.parents.mom);



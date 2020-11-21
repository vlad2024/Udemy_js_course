"use strict";
// Динамическая типизация это возможность одного типа данных обращаться в другой

console.log(typeof(String(null)));//выведет стринг,потому что наша команда Стринг взяла и привретила null в строку"null"

console.log(typeof(String(4))); // такая же шняга, наша команда Стринг просто оборачивает в скобки 4, прератив в строку

console.log(typeof(5 + ""));//конкатенация - это сложения строк с чем-то, при конкатынации в конечном счете будет String

const num = 5;
console.log("Https://vk.com/catalog/" + num);
const fontSize = 25 + "px";

console.log(typeof(Number("4"))); // тип данных будет число, но так уже никто не делает
console.log(typeof(+"5")); // сейчас уже так превращают в число
console.log(typeof(parseInt("15px"))); // таким не особо часто пользуются

// Всегда все что мы будем получать от пользователей, будет типом данных строка

// 0, "", null, undefined, Nan это все при привращении в bool, будет как False, а все отсальное будет как true

let switcher = null;
if(switcher){
    console.log("working...");
}

console.log(typeof(Boolean("4")));
console.log(typeof(!!"44")); // два знака восклицания тоже превращают значение в bool, но таким способом уже никто не
// пользуется так как даже если 44 проверять в иф елсе на тру либо фолс будет тру
 

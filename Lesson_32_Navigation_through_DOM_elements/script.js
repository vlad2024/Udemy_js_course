"use strict";

//console.log(document.documentElement); // получаем ХТМЛ содержимку которая вообще у нас есть, но оно так же покажет
// и текстовые ноды которые браузер сам по умолчанию добавляет
//console.log(document.body.childNodes); // выведет узлы которые являются детьми у body

//console.log(document.body.firstChild);
//console.log(document.body.firstElementChild);
//console.log(document.body.lastElementChild);

console.log(document.querySelector("#current").parentNode); // получим родителя этого элемента
console.log(document.querySelector("#current").parentNode.parentNode); // получим родителя родителя этого элемента
console.log(document.querySelector("#current").parentElement); // надежнее получать перрент елемент а не ноду



console.log(document.querySelector("[data-current = '3']").nextElementSibling); // получаем следуйщий элемент
console.log(document.querySelector("[data-current = '3']").previousElementSibling); // получаем предыдущий элемент

for(let node of document.body.childNodes){ // таким вот образом мы вывели все элементы нашего body без текстовых нод
    if(node.nodeName == "#text"){
        continue;
    }
    console.log(node);
}






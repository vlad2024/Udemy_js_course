"use strict";

const btns = document.querySelectorAll('button'),
      wrapper = document.querySelector(".btn-block");
  
console.log(btns[0].classList.length); // выведет количество классов в этой кнопки 
console.log(btns[0].classList.item(0)); // выведет класс под нулевым индексом
btns[1].classList.add("red", "yellow"); // добавили класс red для кнопки под индексом 1, можно добавить и несколько штук
btns[1].classList.remove("red", "yellow"); // удаляем класс red, так же и удалить можем несколько
btns[1].classList.toggle("red"); // если у нас ест класс red у элемента, то оно его удалит, если нету - добавит
btns[1].classList.contains("red"); // возвращает True/False в зависимости если ли заданный класс в элемента

btns[1].addEventListener("click", () => {
    if(!btns[1].classList.contains("red")){ // да, мы бы могли обойтись одной строчкой togglе
        btns[1].classList.add("red");
    }
    else{
        btns[1].classList.remove("red");
    }
});

wrapper.addEventListener("click", (event) => { // срабатывает при клике на обвертку этих кнопок, на этот div
    // получается мы делегируем событие с родителя (с нашей обвертки div) на его потомков, какие подходят под описание
    if(event.target && event.target.classList.contains("blue") ){ // если элемент на который мы кликнули имеет свойство 
        // target это мы проверяем потому, что не все элементы на которые мы можем кликнуть имеют свойство target, 
        //  и если в этом свойстве значение event.target.tagName будет BUTTON то ..., ну или можем еще сузить написав
        // && event.target.matches("button.red"), matches - по простому(какой-то элемент, совпадает счем-то)
        console.log("hello");

    }
});


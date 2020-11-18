"use strict";

// Callback функция - это функция которая должна быть выполнена после того, как другая функция завершила свое
// выполнение

function learnJS(lang, Callback){ //это и есть главный шаблон Колбек функций, то что в функцию в
    // качестве аргумента мы можем передать другую функцию
    console.log(`Я учу ${lang}`);
    Callback();
}

learnJS("JacaScript", function() {  // вызываем функцию и предеаем первым параметром строку, вторым анон функц
    console.log("Я прошел этот урок!");
});


function sum(){
    console.log("Меня зовут Алан, я Чеченец");
}

learnJS("Eng", sum); // если это обычная функция, тогда в колбек функцию ёё надо передавать без скобочек

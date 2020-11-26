"use strict";
// сейчас мы поговорим о разных всплывающих окнах и тд
const btn = document.querySelector(".btn");

function myAnimation(){
    const elem = document.querySelector(".box");
    let pos = 0;

    const id = setInterval(frame, 10);
    function frame(){
        if(pos == 300){
            clearInterval(id);
        }
        else{
            pos++;
            elem.style.top = pos + "px";
            elem.style.left = pos + "px";
        }
    }
}

btn.addEventListener("click", myAnimation);

let timerId2,
    i = 0;
btn.addEventListener("click", () =>{
    timerId2 = setInterval(logger, 500);//метод сет интервал устанавливает интервал через который будет срабатывать функ
});

function logger(){
    if(i == 3){
        clearInterval(timerId2);
    }
    console.log("text");
    i++;
}

const timerId = setTimeout((text)=>{ // ну или можем передавать уже готовую функцию
    console.log(text);
}, 2000, "Hello"); // сначала она принимает ту функцию которая должна будет запуститься через оприделенный промежуток 
// времени, а вторым параметром принимает время в милисекундах через которое она должна выполнится 1000 милисекунд - 1с,
// третим аргументом передаются элементы которые будут аргументами уже для функции внутри 
clearInterval(timerId); // метод удаляет наш Таймаут

let id = setTimeout(function log(){ // при рекурсивном вызове эфект будет такой-же как и в СетИнтревал, но рекурсивный
    console.log("World"); // вызов надежнее, так как оно будет сто процентово ждать пока пройдет пол секунды перед некст
    id = setTimeout(log, 500); // выполнением, а в сет интервале может быть болбшая функция и пока она будет выполнятся
},500); // пройдет те заданые пол секунды и следующий раз функция запуститься сразу, не ожидая отведенного времени
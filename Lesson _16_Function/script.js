"use strict";
let num = 10;
function showFirsMessage(){ // создается до начала выполнения скрипта, её можновызвать перед объявлением
    console.log("hello world");
    num = 5; // локальное изменение переменной, на глобальную переменную это никак не влияет
} 
showFirsMessage();

let logger = function(){ // создается только тогда, когда до неё доходит поток кода, можно вызывать только
    // после обьявления, и в конце такой функции ставится точка с запятой
    console.log("Hello world");
};
logger();

const calc = (a,b) => a + b;
calc(5,5);

const calc2 = (a, b, c) => { 
    a *= 5;
    b -= 17;
    c += 3;
    return a + b + c;
};
console.log(calc2(5, 18, 4));

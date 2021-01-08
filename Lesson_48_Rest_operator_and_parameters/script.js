"use strict";

const log = function(a, b, ...rest){ // когда мы не знаем сколько будет параметров, мы можем использовать
    // rest, он собирает все остальное что попадает в него и формирет из этого массив
    console.log(a, b, rest);
};

log("basic", "rest", "operator", "usage"); // rest оператор собрал две последние сущьности в массив

function calcOrDouble(number, basis = 2){
    console.log(number * basis);
}
calcOrDouble(3);
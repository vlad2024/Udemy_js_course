"use strict";

const names = ["Ivan", "Ann", "Ksenia", "Voldemart"];

// Метод forEach только перебирает конкретный массив, а сейчас мы рассмотрим такие методы которые возвращают
// новый массив

// Метод filter будет фильтровать элементы внутри массива
const shortNames = names.filter((item)=>{
    return item.length < 5; // такой записью мы закинем в новый массив все элементы длина которых меньше 5
});

// Метод map позволяет взять исходный массив и изменить каждый элемент внутри него
const renames = names.map((item)=>{
    return item.toUpperCase(); // привели каждый элемент массива в верхний регистр
});

// Метод some перебирает массив и если у нас хотя бы один элемент подходит под условие, он нам вернет true
const temp1 = names.some((item)=>{ // в temp1 будет true
    return item == "Ann";
});

// Метод every перебирает массив и если все элементы подходят под условие, он возвращает true
const temp2 = names.every((item)=>{ // в temp2 будет false
    return item == "Ann";
});

// Метод reduce складает массив в одно единое целое 
const arr1 = [4,5,1,3,2,6];
const result1 = arr1.reduce((sum, current)=>{ // reduce можно использовать не только с цифрами
    return sum + current;
}, 3); // а так же после колбек функции мы можем указать начальное значение, то есть начнет не с 0 а с 3+4+5...
console.log(result1);

const arr2 = ["apple", "pear", "plum"];
const result2 = arr2.reduce((sum, current)=> `${sum}, ${current}`);
console.log(result2);

const obj = {
    ivan: "persone",
    ann: "persone",
    dog: "animal",
    cat: "animal"
};

const newArr = Object.entries(obj) // с помощью метода entries, мы с объекта сделали масив массивов, то есть
// у нас массив, который содержит в себе 4 подмассива это [[ivan][persone] [ann][persone] [dog][animal]и еще 1]
.filter(item =>item[1] === "persone") // но тереь мы на этом массиве с массивами вызвали еще метод filter
// и тепеь уже закинули в newArr массив с массивами у которых второй элемент это persone
.map(item=>item[0]);//а теперь мы уже с массива с массивами у которых втрой элемент person взяли первый элемент
// и теперь в newArr у нас массив с двумя именами

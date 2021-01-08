"use strict";

// будем разбирать что такое контекст вызова функции - this

// function ShowThis(a, b){
//     console.log(this);
//     function Sum(){
//         console.log(this);
//         return a + b;
//     }
//     console.log(Sum());
// }

// ShowThis(4,5);

// const obj = {
//     a: 20,
//     b: 15,
//     sum: function(){
//         console.log(this);
//         function shout(){
//             console.log(this); // тут мы смотрим контекст вызова именно функции shout, будет undefind
//         }
//     }
// };

//obj.sum(); // 2) Контекст у методов объекта - это будет сам объект, то есть object


//ShowThis(); // 1) Обычная функция: this = window, но если use strict - undefind

// function User(name, id){
//     this.name = name;
//     this.id = id;
//     this.human = true;
// }
// let ivan = new User("ivan", 23);

// this у конструкторах и классах - это новый экземепляр объекта 

function sayName(surname){
    console.log(this);
    console.log(this.name + surname);
}

const user = {
    name: "john"
};

//4) Ручная привязка this: call, applay, bind
// функция приобрела свой контекст из-за того, что мы использовали два этих метода, мы четко сказали чтобы
// функция заработала на этом объекте 
sayName.call(user, "Smith"); // при использовании этого метода, дргие параметры указываются через запятую
sayName.apply(user, ["Smith"]); // а при использовании этого в массиве через запятую
// это были два варианта ручного присвоения контекста 

function Count(num){
    return this*num;
} 

const double = Count.bind(2); // если использовать такой метод, то создается новая функция double к которой
// жестко привязан контекст
console.log(double(5));

const btn = document.querySelector("button");

btn.addEventListener("click", function(){
    console.log(this); // в таком случае когда у нас функция написана в класическом режиме function()
    // в таком случаем наш контекст вызова будет сам элемент на котором произошло событие 
});

btn.addEventListener("click", (e) =>{
    console.log(e.target); 
});

// ТЕПЕРЬ ЕЩЕ ОДНО ПРАВИЛО, в оброботчиках событий когда мы используем простой синтаксис через function()
// мы имеем доступ к this, это как раз тот элемент на котором проходит событие, то же самое что и vent.target,
// если же используем стрелочною функцию то this бдудет равен undefind

const obj2 = {
    num: 5,
    sayNumber: function(){
        const say = ()=>{ // а если использовать колбек функцию то уже не будет undefind, теперь этот this
            // ссылается на объект
            console.log(this.num);
        };
        say();
    }
};

obj2.sayNumber();


const double2 = a => a * 2;
const calc = (a,b) => a * b;
console.log(double2(4));
console.log(calc(5,2));



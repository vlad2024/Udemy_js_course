"use strict";

const box = document.getElementById("box"),
      btns = document.getElementsByTagName("button"),
      circles = document.getElementsByClassName("circle"),
      wrapper = document.querySelector(".wrapper"),
      hearts = wrapper.querySelectorAll(".heart"), //возьмет только те элементы heart, которые внутри селектора wreapper
      oneHeart = wrapper.querySelector(".heart");


//console.dir(box); // получим в консоле элемент в качестве объекта

// box.style.backgroundColor = "blue";
// box.style.width = "500px"; // сформировали инлайн стили, а инлайн стили самые важные, даже если в css были уже какие-то
// box.style.height = "300px"; // стили для этого блока, они все равно перезапишутся 

// let num = 200; // num будет у нас вычислятся динамически, например будет закидываться ширина модального окна, в
// box.style.cssText = `background-color: green; width ${num}px`; //зависимости от устройста с которого зашел пользователь

// btns[1].style.borderRadius = "100%";
// circles[0].style.backgroundColor = "#333";

// // for(let i = 0; i < hearts.length; i++){
// //     hearts[i].style.backgroundColor = "blue";
// // } ну или можем с помощью форыча

// hearts.forEach(item => {
//     item.style.backgroundColor = "blue";
// });

// сейчас создадим новый тег
const div = document.createElement('div'); // создает новый элемент, и он существует сейчас только внутри джаваскрипта
//const text= document.createTextNode("я");таким же образом и можем создавать текстовые узлы(элементы без оболочки тега)

div.classList.add('black'); // добавление происхоит только в js файле

wrapper.append(div); //с помощью этой функции мы берем class wrapper как родителя и во внутрь
//  в самый конец добавляем наш див
// wrapper.appendChild(div); // метод действует точно так же как и простой append, только аппендЧайлд более старый

//wrapper.prepend(div); // вставляет элемент в начало родителя
//hearts[0].before(div); // добавит наш элемент перед первым сердечком
//hearts[0].after(div); // добавляет наш элемент после первого сердечка

// раньше prepend, after и before не было, был метод который назыввался insertBefore()
//wrapper.insertBefore(div,hearts[0]);//первым пар является блок который мы вставляем, вторым-блок перед каким всавляем

//circles[0].remove(); // удалим первый элемент
//wrapper.removeChild(hearts[1]); // Раньше не было метода remove а был removeChild, раньше все делали через родителя 

//hearts[0].replaceWith(circles[0]); // метод реплейс виз убирает элемент circles[0] и ставит на место hearts[0]
//wrapper.replaceChild(circles[0], hearts[0]); // первым параметром элемент который берем и вставляем на место второого


div.innerHTML = "<h1>Hello World</h1>"; // с помощью этого метода, мы добавили html тег и текст в наш элемент
//div.textContent = "Hello World"; // такой же метод как сверху но в этом можно добавлять онли текст

div.insertAdjacentHTML("...", "<h2>Hello</h2>"); // если первым параметром установить beforebegin, то оно вставит наш
// элемент перед нашим h2, если afterbegin - после нашего элемента,  если beforeend - перед концом, afterend - после div






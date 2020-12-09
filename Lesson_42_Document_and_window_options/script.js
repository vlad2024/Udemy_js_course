"use strict"

const box = document.querySelector(".box");

const width1 = box.clientWidth; // получаем ширину єлемента с полосой прокрутки и с мердженами, например элмент
// буедт 400 пикселей, полоса будет 5пикселей, оно покажет, что наш элемент 395
const heigth1 = box.clientHeight; // получаем высоту єлемента с полосой прокрутки и с мердженами

console.log(width, heigth);

const width2 = box.offsetWidth; // получаем полную ширину єлемента, если элемент 400, а полоса 5, оно покажет 400
const heigth2 = box.offsetHeight; // но он покажет только видимую часть


const width3 = box.scrollWidth; // получам полную полную ширину eлемента, даже с учетом того, если надо скролить
const heigth3 = box.scrollHeight; // вниз или по бокам

const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
    box.style.heigth = box.scrollHeight + "px"; //при клике на кнопку, высота нашего елемента будет больше
});

const width4 = box.scrollTop; // закинетсколько у нас есть отлистаного значения сверху

btn.addEventListener("click", () => {
    console.log(box.scrollTop); // при клике на кнопку покажет сколько мы уже отлистали от верха
});

console.log(box.getBoundingClientRect()); //этот метод выведет полные координаты элемента сверху, снизу, сп, сл

const style = window.getComputedStyle(box); // этот метод даст нам все css стили которые прменены к элементу
console.log(style.display); // выведет значение display из нашего css, ComputedStyle нельзя менять, можно
// изменть только инлайн стили, то есть которые будут через js файл добавляться на html страницу

console.log(document.documentElement.scrollTop()); // просто в документа мы не можем посмотреть скрол топ,
// надо на документе через documentElement на нем уже вызывать скрол топ



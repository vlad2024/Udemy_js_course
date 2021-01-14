"use strict";

// регулярные выражения - такая технология позволяет очень удобно работать со строками, удалять, заменять
// части слов, искать какие-то кусочки строк ограничивать ввод оприделенных знаков и тд...
// Любое регулярное выражение состоит из двух частей, 1-е ээто патерн, 2-е это флаги

//new RegExp("pattern", "flags"); это классический синтакцис создания регулярных выражений, который не юзают
// pattern/flags  - это более простой синтакцис создания регулярных выражений, юзают в основном его

const ans = prompt("Введите ваше имя");

// создаем регулярное выражение. По центру ставим патерн(шаблон того, что мы ищем),  
const reg = /n/ig;

//console.log(ans.search(reg)); // выведет в консоль индекс первго встречного заданого элемента, если такой буквы
// не будет, то мы получим -1
// Мы нашли оприделенную букву, но для того чтобы найти что-то в не  зависимости от регистра, или напрмер если
// хотим найти не только первое вхождение, но и все которые есть в этой строке, для этих целей у нас есть флаги
// и самых класических есть три флага 
// i - если мы хотим что-то найти не зависимо от регистра, 
// g - когда мы пытаемся найти сразу несколько вхождений
// m - включаем многостройчный режим
// Еще флаги можно комбинировать
//  
console.log(ans.matсh(reg)); // когда мы используем metсh, мы получаем массив в котором есть тот кусочек строки
// который мы искали, потом индекс на котором он был найден и сама строка в которой был поиск

const pass = prompt("Password");
console.log(pass.replace(/./g, "*")); // 1-вый аргумент - что мы заменяем, 2-рой - на что мы заменяем,
// вторым аргументом тоже может быть регулярное выражение
// В регуляррных выражениях есть свои правила, если внутри неё мы ставим точку то мы берем абсолютно все
// элементы, флаг глобальности для надёжности, чтобы действительно взять все элементы, и сменить на *, а для
// того чтобы взять символ точку, который надо заменить, для этого надо екранировать этот символ поставив \.

console.log("12-34-56".replace(/-/g, ":"));

console.log(reg.test(ans));//здесь мы должны протестировать,а есть ли в строке которая передаётся во внутрь
// теста, что-то похожее на этот патрн который внутри регулярного выражения, и он вернет true либо false

// В регулярных выражениях есть еще классы
// \d он значит что мы с вами ищем цыфры
// \w он значит что мы с вами ищем все слова, все буквы
// \s он значит что мы ищем все пробелы

const reg2 = /\d/;
console.log(ans.match(reg2));

const str = "My name is R2D2";
console.log(str.match(/\w\d\w\d/i)); // надет конструкцию которая состоит из буквы, потом цыфры, буквы, цыфры,
// и строка не зависит от регистра

// Обратные классы - это когда нам нужно найти не числа, не буквы, не пробелы
// \D не числа
// \W не буквы


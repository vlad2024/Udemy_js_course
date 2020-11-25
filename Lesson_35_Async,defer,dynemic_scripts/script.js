"use strict";

const p = document.querySelectorAll('div');
console.log(p);

function LoadScript(src){
const script = document.createElement('script');
script.src = src;
script.async = "false"; // можем отменить 
document.body.append(script); // такие динамические загружаемые скрипты по умолчанию ведут себя как асинхронные, то есть
// они все равно никого ждать не будут, скрипт который загрузился здесь первым, так и будет загружаться первым
}

LoadScript("test.js"); // так как мы поставили асинхронность false, они будут выполнятся строго друг за другом
LoadScript("sam.js");
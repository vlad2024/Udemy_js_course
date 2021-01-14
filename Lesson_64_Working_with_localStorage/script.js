'use strict';

localStorage.setItem("number", 5); //setItem записывает новый ключ, первый аргумент название ключа, 2 - значение
localStorage.getItem("number"); // получим элемент под указанным ключем
localStorage.removeItem("number"); // команда очищает этот ключ
localStorage.clear(); // очищает локальное хранилище

const checkbox = document.querySelector("#checkbox"),
      form = document.querySelector("form"),
      change = document.querySelector("#color");

if(localStorage.getItem("isChecked") === true){
    checkbox.checked = true;
}

if(localStorage.getItem("bg") == "change"){
    form.style.backgroundColor = "#fff";
}

checkbox.addEventListener("change", () =>{
    localStorage.setItem("isChecked", true);
}); 

change.addEventListener("click", () =>{
    if(localStorage.getItem("bg") == "change"){
        form.style.backgroundColor = "#fff";
        localStorage.removeItem("bg");
    } else {
        localStorage.setItem("bg", "change");
        form.style.backgroundColor = "red";
    }
});

const persone = {
    name: "Alex",
    age: 25
};

const serializedPersone = JSON.stringify(persone); // если хотим какой-то объект закинуть в Storage, надо
// его сделать json форматом
localStorage.setItem("Alex", serializedPersone);
console.log(JSON.parse(localStorage.getItem("Alex")));

// эта технология позволяет сохранить данные на сайте без рабооты с сервером и базами данных, и вся эта инфа
// останется даже если мы перезагрузим страницу и даже закроем браузер, эта технология называется localStorage
// по простому это объект котрый встроен в браузер и он может хранить различные данные, а точнее это свойства
// глобального объекта window
// window.localStorage этот объект уникален для каждого домена это сделано в целях безопасности
// JavaScript не может выходить за приделы вкладки, работать с другими вкладками, или файлами на компьютере
// объект localStorage можно использовать в огромном множестве случаев, например если человек устанавливает
// какик-нибудь настройки сайта и при повторном заходе на него все у нас останется на местах, или установить
// какие-нибудь данные формы, или запомнить время, где пользователь остановился при просмотре видео и потом
// продолжить с него, и еще кучу всего, что можно только придумать, вот только он может хранить только
// 5mb данных, по этому как большую базу данных мы не можем его использовать(зато можно как маленькую ХD)







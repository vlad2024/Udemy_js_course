"use strict";

document.addEventListener("DOMContentLoaded", () =>{

    // Tabs

    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector(".tabheader__items");
     

    function hideTabContent(){
        tabsContent.forEach(item=>{
            item.style.display = "none"; 
        });

        tabs.forEach(tab=>{
            tab.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0){ // по умолчанию если мы вызовем функцию там аргументом будет 0
        tabsContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if(target && target.classList.contains("tabheader__item")){
            tabs.forEach((item, i) =>{
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    

    // Timer

    const deadLine = "2020-11-30";

    function GetTimeRemaining(endtime){
        const temp = Date.parse(endtime) - Date.parse(new Date()), // парс мы используем потому что мы не смогли бы
        // отнять дату в от того формата, которым мы задали в deadLine, в t лежит количество милисекунд
        days = Math.floor(temp / (1000 * 60 * 60 * 24)),// 1000 это одна секунда * 60 вышло минута * 60 = час * 24=сутки
        hours = Math.floor((temp / (1000 * 60 * 60) % 24)), // выйдет что мы количество дней делим на 24 часа и получаем
        // оствток %, это и будет наши часы
        minutes = Math.floor((temp / 1000 / 60)%60 ), // при первом делении получаем кол. сек. потом / 60 = кол. мин.
        seconds = Math.floor((temp / 1000) % 60);

        return { // возвращаем объект
            "total": temp,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }  

    function GetZero(num){ // исли у анс таймер будет с одной цифрой, будет добавлять спереди нолик
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); // установили интервал запуска функции
              updateClock();//чтобы когда обновляем не ставилась старая дата а потом через секунду уже менялась, а сразу

        function updateClock(){
            const temp = GetTimeRemaining(endtime);

            days.innerHTML = GetZero(temp.days);
            hours.innerHTML = GetZero(temp.hours);
            minutes.innerHTML = GetZero(temp.minutes);
            seconds.innerHTML = GetZero(temp.seconds);

            if(temp.total <= 0){
                clearInterval(timeInterval); // то будем останавливать на таймер
            }
        }
    }

    setClock(".timer", deadLine);

    // Modal

    const modalTrigger = document.querySelectorAll("[data-modal]"); // для того чтобы получить атрибут надо еще
    // квадратные скобочки
    const modal = document.querySelector(".modal");
    const modalCloseBtn = document.querySelector("[data-close]");

    function openModal(){
        modal.classList.toggle("show");
        document.body.style.overflow = "hidden"; // чтобы нельзя было скролить после открытия модального
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn =>{
        btn.addEventListener("click", openModal);
    });    

    function closeModal(){
        modal.classList.toggle("show");
        document.body.style.overflow = ""; // чтобы можно было скролить после закрытия
    }
    modalCloseBtn.addEventListener("click", closeModal); // тут мы функцию передаем, а не вызываем

    modal.addEventListener("click", (event) => {
        if(event.target === modal){
           closeModal(); // а тут уже вызываем, ибо нам надо её выполнить после условия
        }
    });
    
    document.addEventListener("keydown", (e)=>{ // при клике на ескейп будет закрываться
        if(e.code === "Escape" && modal.classList.contains("show")){ 
            closeModal();
        }
    });


    const modalTimerId = setTimeout(openModal, 3000); // устанавливаем таймер на открытие модального окна

    function ShowModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener("scroll", ShowModalByScroll);
        } // window.pageYOffset - прокрученая часть, второй параметр - часть которую я вижу, 3тий - больше
        // либо ровна всему scrollHeight то мы долистали до конца
    }

    window.addEventListener("scroll", ShowModalByScroll);   
});
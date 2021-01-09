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

    class MenuCard{
        constructor(src, alt, title, desc, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.classes = classes;
            this.desc = desc;
            this.price = price;
            this.parent = document.querySelector(parentSelector); 
            this.transfer = 27;
            this.ChangeToUAN();
        }

        ChangeToUAN(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement("div");
            if(this.classes.length == 0){
                this.element = "menu__item"; 
                element.classList.add(this.element);
            }
            this.classes.forEach(className => 
                element.classList.add(className)
                ); 
            element.innerHTML = `
            <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.desc}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
         </div>
            `;
            this.parent.append(element);
        }
    }

    //const temp = new MenuCard(); // это все можно написать на много короче
    //temp.render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        ".menu .container"
        //"menu__item"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        10,
        ".menu .container",
        "menu__item"
    ).render();


    // Forms

    const forms = document.querySelectorAll("form");

        const message = { // будет выводится пользователю при отправке формы
            loading: "загрузка",
            success: "Спасибо, скоро мы с вами свяжемся",
            failure: "Что-то пошло не так..."
        };
        
        forms.forEach(item =>{
            postData(item);
        });

    function postData(form){
        form.addEventListener("submit", (e) =>{
            e.preventDefault(); // отменили стандартное поведение формы, то есть перезагрузка страници

            let statusMessage = document.createElement("div");// создаем элемент в который закинем message
            statusMessage.classList.add("status"); // по приколу добавили класс статус, если он реализован в css
            statusMessage.textContent = message.loading;
            form.append(statusMessage); // выводим сообщение о текущем результате обработки

            const request = new XMLHttpRequest(); 
            request.open("POST", "server.php");
            // теперь настроем заголовки, которые будут говорить, что именно приходит(когда мы используем
            // связку XMLHttpRequest() и formData нам заголовок устанавливать не нужно, он автоматом ставится)
            //request.setRequestHeader("Content-type", "multipart/form-data");
            // -*-Сейчас будет пример если на сервер нужно отправлять данные в JSON формате
            // -*- request.setRequestHeader("Content-type", "application/json");

            // есть простой способ подготовить данные отправки из формы это использовать объект FormData(),
            // не обезательно использовать JSON
            // закидываем в formatData данные с формы
            const formData = new FormData(form); // запомни, когда ты верстаешь какие-то инпуты и тд и ты 
            // знаешь, что эти данные будут идти на сервер нужно всегда указывать атрибут name

            /* -*- мы переберем все что внитри нашего formData и поместим в наш объект object
            const object={};

            formData.forEach(function(value,key){
                 object[key] = value;
            });

            const json = JSON.stringify(object); превращаем обычныый объект в JSON
            request.send(json);
            php нативно не умеет работать с форматом данных json, чаще всего такие данные будем отправлять
            на сервера с использование NodeJs
            */

            request.send(formData); // уже отправляем эту formData которую мы сформировали на основании формы, 
                                    // которая была зополнена
            
           request.addEventListener("load", ()=>{ // обращаемся к риквесту и говорим что мы отслеживаем load
            // то есть конечную загрузку нашего запроса
                if(request.status === 200){
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset(); // после отправки очистили форму
                    setTimeout(()=>{
                        statusMessage.remove(); // через 2с удаляем наш див с оповещением
                    },2000);
                }else{
                    statusMessage.textContent = message.failure;
                }

           });                       

             
        });
    }

});
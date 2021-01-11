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

    function openModal(){
        modal.classList.add("show");
        modal.classList.remove("hide");
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
    

    modal.addEventListener("click", (event) => {
        if(event.target === modal || event.target.getAttribute("data-close") == ""){
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
            loading: "img/form/spinner.svg", // теперь будет выводится не слово загрузка а картинка
            success: "Спасибо, скоро мы с вами свяжемся",
            failure: "Что-то пошло не так..."
        };
        
        forms.forEach(item =>{ // перебираем все формы и вызываем на каждой функцию постДата
            postData(item);
        });

    function postData(form){
        form.addEventListener("submit", (e) =>{ // submit - обработчик на отправление формы
            e.preventDefault(); // отменили стандартное поведение формы, то есть перезагрузка страници

            let statusMessage = document.createElement("img");// создаем элемент в который закинем message
            statusMessage.src = message.loading;
            statusMessage.style.cssText = ` 
                display: block;
                margin: 0, auto;
            `; // сделали чтобы картинка блыка блочной и сделали её по средине
            //form.append(statusMessage); // выводим сообщение о текущем результате обработки
            form.insertAdjacentElement("afterend", statusMessage);// с помощью этого метода мы аппендим наш
            // спинер не в саму форму, а после неё

            const formData = new FormData(form); // закидываем в formatData данные с формы

            const object = {}; 
            formData.forEach(function(value, key){ // перебрали formData в обычный объект
                object[key] = value;
            });

            const json = JSON.stringify(object); // сделали объект json формата

           fetch("server.php", {
            method: "POST", // метод которым будем обращаться к серверу
            headers: { // заголовки, какой контент мы отправляем
                'Content-type': 'applocation/json'
            },
            body: json // объект который будем посылать на сервер
            }).then(data =>{
                data.text(); // если все хорошо пошло,ебаули наши данные в текстовый формат 
            }).then(data=>{
                    console.log(data); // выводим в консоль чтобы пониматть что данные пошли на серв
                    showThanksModal(message.success);
                    statusMessage.remove(); // удаляем спинер
            }).catch(()=>{
                showThanksModal(message.failure);
            }).finaly(()=>{ // так как в любом случаем нам надо очищать форму обратно, мы делаем это в finaly
                form.reset(); // после отправки очистили форму
            });
            
            // Если внутри фетча профис попадает на ошибку которая связана с http протоколом типа 404, 502 
            // или мы сделали ошибку в названии url b тд, это для него не считается ошибкой, он нормально 
            // выполнит при это resulve, самое главное для fetch это то что он вообще смог сделать этот запрос

        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide"); // скрыли предыдущую форму отправки
        openModal(); // функция отвечает за открытие модального окна(создали её чуть выше)

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class = "modal__content">
                <div class = "modal__close" data-close>x</div>
                <div class= "modal__title">${message}</div>
            </div>
        `; // в нашем модальном окне теперь выводится что спасибо и тд...

        document.querySelector(".modal").append(thanksModal); // закидываем в наше модальное окно наш элемент
        setTimeout(()=>{ // через 4 секунды чтобы убералось наше сообщение 
            thanksModal.remove(); // удаляем это сообщене (спасибо или не вышло)
            prevModalDialog.classList.add("show"); // возвращаем старое модальное окно заполнения
            prevModalDialog.classList.remove("hide"); // убираем класс который скрывает его
            closeModal(); // закрываем модальное окно через 4сек
        },4000);
    }


    
    /*
    // так работать на много легче, а XMLHttpRequest это уже устаревший формат
    fetch('https://jsonplaceholder.typicode.com/posts',{ // а как делать другие виды запросов то есть POST
    // либо Put запросы, для этого url отсаётся тот же, ставим запятую и помещаем туда сюда объект с настройками
    // который мы будем задавать, он содержит много различных свойств, но самыми обязательными являются только
    // method и body которое мы будем отправлять
        method: "POST",
        body: JSON.stringify({name: "Alex"}), // создали объект который превратится в JSON формат(stringify),
        // и мы с вами отправим его при помощи fetch-а
        headers: { // желательно добавлять еще заголовки которые будут оприделать какой контент мы отправляем
            "Content-type": "application/json"
        }  
    })
    .then((response) => { // мы получаем какойто response - ответ от сервера в формате json
    return response.json(); // для того чтобы использовать этот json объект у себя на клиенте, нам надо
    // трансформировать в обычный объект, для этого мы использовали в коде json.Parse, но в Fetch уже есть
    // встроенная возможность быстро это сделать, для этого берем ответ от сервера и вызываем метод json(), и
    // эта команда возвращает промис, для того чтобы построить дальше цепочку
    })  
    .then((data) => { // если там оно нормально все отработает мы получаем обычный объект 
    console.log(data); // и просто используем в консоли
    }); 
    */
});

// API - интерфейс програмного обеспечения, или приложения(Простыми словами это набор данных и возможностей
// которые предоставляют нам какое-то решение)
// Сегодня будем разбирать такую технологию как fach API - современная и крайнеудобная технология которая 
// позволяет общаться с сервером и она построена на промисах




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

    const getResource = async (url) =>{ // у нас от сервера могут приходить ответы в различных форматах,
        //  по этому всегда есть смысл выносить функционал в отдельную функцию, async означает что наша
        // функция будет асинхронной 
        const res = await fetch(url); // мы помним что фетч у нас возвращает промис

        if(!res.ok){ // так как промис выкидывает ошибку только в крайних случаях, там отсутствие инета,
            //неправильно написан запрос, что-то в таком роде, то нам надо устроить дополнительную проверку
            throw new Error(`could not fetch ${url} status: ${res.status}`);
        }

        return await res.json(); // делает из json обычный объект, вернет массив объект menucard
    };

    getResource("http://localhost:3000/menu")
    .then(data =>{ // после отрабатыва getResourse мы этот массив объектов перебираем форычем data.forEach и 
        // делаем деструктуризацию каждого объекта, после чего создаём новые элемент MenuCard
        data.forEach(({img, altimg, title, descr, price})=>{ // выполнили деструктуризацию объекта 
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render(); // метод render
        }); // описан выше
    });

    // axios.get("http://localhost:3000/menu") // с помощью библиотеки axios сделали получение данных, плюшки в том,
    // // что там уже встроенные разные проверки и тд
    // .then(data =>{ // после отрабатыва getResourse мы этот массив объектов перебираем форычем data.forEach и 
    //         // делаем деструктуризацию каждого объекта, после чего создаём новые элемент MenuCard
    //         data.data.forEach(({img, altimg, title, descr, price})=>{ // выполнили деструктуризацию объекта 
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render(); // метод render
    //         }); // описан выше
    //     });

    // Forms

    const forms = document.querySelectorAll("form");

        const message = { // будет выводится пользователю при отправке формы
            loading: "img/form/spinner.svg", // теперь будет выводится не слово загрузка а картинка
            success: "Спасибо, скоро мы с вами свяжемся",
            failure: "Что-то пошло не так..."
        };
        
        forms.forEach(item =>{ // перебираем все формы и вызываем на каждой функцию постДата
            bindPostData(item);
        });

        const postData = async (url, data) =>{ // у нас от сервера могут приходить ответы в различных форматах,
            //  по этому всегда есть смысл выносить функционал в отдельную функцию, async означает что наша
            // функция будет асинхронной 
            const res = await fetch(url, { // await - говорит что надо дождаться выполнения этого запроса
                method: "POST", // метод которым будем обращаться к серверу
                headers: { // заголовки, какой контент мы отправляем
                'Content-type': 'applocation/json'
            },
                body: data // объект который будем посылать на сервер
            }); // мы помним что фетч у нас возвращает промис
            // после отправки данных теперь надо веернуть обычный объект

            return await res.json(); // возвращаем этот промис, только будет ошибка ибо там у нас асинхронный код
            // мы не знаем когда прийдет ответ от сервера который промис пытается получить, и в переменную res
            // присвоится ничего, и а этого ничего мы вызываем метод json(), что приведет к ошибке, для этого
            // надо сделать код синхронным и дождаться выполнения промиса, a тут await надо для того, ибо мы 
            // мы не знаем сколько времени нам надо чтобы перевести в json
        };

    function bindPostData(form){
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

            const json = JSON.stringify(Object.fromEntries(formData.entries())); // formData.entries() преврати-
            // ли форм дату в массив массивов по два элемента, после чего методом fromEntries этот массив
            // массивов по два элемента превратили в объект, посли чего JSON.stringify сделали его json формата

            postData("http://localhost:3000/requests", json) // из postData вернется промис, который мы зенами отработаем
            .then(data=>{
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

    fetch("http://localhost:3000/menu") // чтобы получить этот локал хост, нам надо прописать
    .then(data=>{                       //npx json-server db.json и мы получили две ссылки на menu и нa request
                                        // ну и дальше получаем данные с menu в виде массива
        data.json(); // берем ответ от сервера, и превращаем в джаваскриптовый объект
    })
    .then(result => console.log(result));


    // Slider
    
    const slides = document.querySelectorAll(".offer__slide"),
          slider = document.querySelector(".offer__slider"),
          prev = document.querySelector(".offer__slider-prev"),
          next = document.querySelector(".offer__slider-next"),
          total = document.querySelector("#total"),
          current = document.querySelector("#current"),
          slidesWrapper = document.querySelector(".offer__slider-wrapper"),
          slidesField = document.querySelector(".offer__slider-inner"),
          width = window.getComputedStyle(slidesWrapper).width;
          
    let slideIndex = 1;
    let offset = 0; // переменная чттобы знать на сколько мы отступили вправо, или влево

    if(slides.length < 10){ // меняется значение там где 04
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + "%"; // что блок занимае 100% ширины
    slidesField.style.display = "flex"; // сделали флексом, чтобы слайды шли в бок
    slidesField.style.transition = "0.5s all"; // плавный переход
    
    slidesWrapper.style.overflow = "hidden"; // скрыли все слайды которые уходят в бок, остался только основной

    slides.forEach(slide =>{ // установили ширину всем слайдам
        slide.style.width = width;
    });

    //точки
    slider.style.position = "relative";

    const indicators = document.createElement("ol"),
          dots = []; // в этот массив будем закидывать точки

    indicators.classList.add("carousel-indicators");

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators); // пока что мы добавили только список

    for(let i = 0; i < slides.length; i++){ // создаём точки
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i+1); // каждой точке добавляем атрибут
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        indicators.append(dot); // заапендили на страницу
        dots.push(dot);

    }

    // /точки

    function deleteNoDigits(str){ // функция по удалению букв из строки и замены строки на числовой тип
        return +str.replace.replace(/\D/g, "");
    }

    next.addEventListener("click",  ()=>{ // когда я нажимаю кнопку вперед, оно будет сдвигать слайд
        if(offset == deleteNoDigits(width) * (slides.length - 1)){
           // сейчас у нас у width допустим 400px, нам надо это width умножить на количество слайдов, а как
           //мы умножим значение где 400px нам надо убрать px для этого слайсом вырезаем и плюсиком делаем число
            offset = 0; // это если у нас последнее число
        } else {
            offset+= deleteNoDigits(width); // к нашему офсету добавляется ширина еще одного слайда
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // и слайд смещается на оприделенную ширену 
        // если в ccs нам нужно сместить элемент влево то надо использовать отрицательные значения, вправо-полож

        if(slideIndex==slides.length){
            slideIndex = 1;
        }else{
            slideIndex++;
        }

        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = "0.5");// чтобы подсвечивался текущий элемент
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener("click",  ()=>{ // когда я нажимаю кнопку вперед, оно будет сдвигать слайд
        if(offset == 0){ // когда мы нажимаем прев и в нас первый слайд, мы смещаемся в конец
            offset = deleteNoDigits(width) * (slides,length - 1); // replace(/\D/g, "") - регулярное выраж
        } else { // а если это был не первый слайд, то отнемаем ширину слайда
            offset-= deleteNoDigits(width); // к нашему офсету добавляется ширина еще одного слайда
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // и слайд смещается на оприделенную ширену 
        // если в ccs нам нужно сместить элемент влево то надо использовать отрицательные значения, вправо-полож

        if(slideIndex == 1){
            slideIndex = slides.length;
        }else{
            slideIndex--;
        }

        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }

        dots.forEach(
            dot => dot.style.opacity = "0.5"
            ); // всем точкам прозрачность 0.5
        dots[slideIndex - 1].style.opacity = 1; // чтобы подсвечивался текущий элемент
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (e) =>{
            const slideTo = e.target.getAttribute("data-slide-to");

            slideIndex = slideTo;
            offset = deleteNoDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`; // и слайд смещается на оприделенную ширену 
         //если в ccs нам нужно сместить элемент влево то надо использовать отрицательные значения, вправо-полож

            dots.forEach(dot => dot.style.opacity = "0.5");// чтобы подсвечивался текущий элемент
            dots[slideIndex - 1].style.opacity = 1;

            if(slides.length < 10){ // текущий слайд
                current.textContent = `0${slideIndex}`;
            }else{
                current.textContent = slideIndex;
            }
        });
    });

    // showSlides(slideIndex); // вызвали функцию чтобы изначально стоял первый слайд
    // if(slides.length < 10){ // меняется значение там где 04
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n){
    //     if(n > slides.length){ // провераем гранчные значения
    //         slideIndex = 1;
    //     }
    //     if(n < 1){ // проверяем граничные значения
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item=>{ // скрываем все слайды
    //         item.style.display = "none";
    //     });

    //     slides[slideIndex - 1].style.display = "block"; // открыли 1вый слайд, то есть под индексом 0

    //     if(slides.length < 10){ // изменяем чисто текущего слайда
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }

    // }

    // function plusSlides(n){ // функция по изменению индекса
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener("click", () =>{ // при клике на стрелочку назад
    //     plusSlides(-1);
    // });

    // next.addEventListener("click", () =>{ // при клике на стрелочку вперед
    //     plusSlides(+1);
    // });


    // Calc

    const result = document.querySelector(".calculating__result span");
    let sex = "female", height, weight, age, ratio = 1.375;

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = "_____";
            return;
        }

        if(sex === "female"){ // для женщин
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } // Math.round округлили
        else{ // для мужчин
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass){//передаем родителя, и изначальный эл активности
        const elements = document.querySelectorAll(`${parentSelector} div`); // говорю что я буду получать 
        // все div внутри родителя parentSelector

        elements.forEach(elem =>{
            elem.addEventListener("click", (e) =>{
                if(e.target.getAttribute("data-ratio")){ // если у элемента по которому кликнули есть атрибут 
                                                         // data-ratio то будем выполнять
                    ratio = +e.target.getAttribute("data-ratio");
                }
                else{
                    sex = e.target.getAttribute("id");
                }
    
                elements.forEach(elem =>{ // убираю класс активности во всех элементах родителя
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass); // добавляю класс активности элементу на который нажали
                calcTotal();
            });
            
        });

        
    }

    getStaticInformation("#gender", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener("input", ()=>{
            switch(input.getAttribute("id")){
                case "height": 
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;

            }

            calcTotal();
        });
    }
    
    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");

});

// API - интерфейс програмного обеспечения, или приложения(Простыми словами это набор данных и возможностей
// которые предоставляют нам какое-то решение)
// Сегодня будем разбирать такую технологию как fach API - современная и крайнеудобная технология которая 
// позволяет общаться с сервером и она построена на промисах


// npm пакеты - это кусочки кода, которые лежат на отдельных серверах и которые мы можем устанавливать себе в
// проект, для того чтобы использовать
// Прежде чем установить какие-то npm пакеты нам нужно системе сказать, что сейчас этот проэкт который открыт в
// редакторе кода, будет содержать npm пакеты, то есть он превращается в npm проект
// Чтобы инициализировать npm проект, открываем терминал(можно в VSСode), ИЛИ КОМАНДНУЮ СТРОКУ ЧЕРЕЗ КОТОРУЮ
// ТЫ ОБРАЩАЕШЬСЯ К ГИТУ(это пизже)
// пишем npm init, дальше устанавливаем имя, версию, описание и тд...
// все, там создался файл package.json, он будет содержать информацию о нашем проэкте, а самое главное, 
// он будет содержать информацию о тех пакетах, которые мы в его поместим
// Сейчас установим npm пакет json server, для установки пакета в терминале прописываем npm i (от слова install),
// потом название пакета, то есть json-server, а дальше идут дополнительные параметры, мы можем его установить
// локально(только в этом проэкте(для этого просто не надо ничего указывать)), а можем глобально(на всем компе, 
// для этого надо указать -g (от слова global) и если устанавливать вообще глобальные пакеты, то команду надо
// всегда начинать из sudo, то есть sudo npm i json-server -g), теперь следующим этам нам надо установить флаг,
// чтобы указать как этот пакет влияет на наш проект(то есть используется ли он при разработке, или при работе,
// нашего проэекта) --save-dev это ключ который говорит что пакет используется при разработке, а если бы хотели
// указать, что пакет используется при работе нашего проекта указали бы ключик --save 
// в итоге получилось (npm i json-server --save-dev)
// там создалась папка node-modules, она много весит и её не нужно загружать на гитхаб, для этого должент быть
// файл gitignore, где будут параметры которые указывают, что с проекта не надо загружать, а также могут воз-
// никнуть трудности с удалением этой папки, для этого есть специальная команда
// И если какой-то чел захочет скачать мой репозиторий с дополнительными пакетами которые должны бить
// он просто потом пропишет в командную строку npm i и оно подгрузит все пакеты которые должны быть, так как 
// в packege.json уже есть инфа которые надо пакеты


//___________
// библиотека это какай-то маленький участок кода, либо целый большой ресурс который решает какую-то проблему,
// Обычными словами библиотека - это готовое решение которые можно использовать
// Только что подключили библиотку axios через CDN то есть по ссылке закинули в index.html, это не совсем
// правльно, но пока можно и так, потом правильнее подключу, то есть через npm(или же npx) скачаю пакеты 
// Axios это очень удобная библиотека, которая позволяет работать с сервером, получать, постить и тд, 
// в неё уже завернуто много дополнительных возможностей которые нам бы приходилось каждый раз прописывать
// в ручную, например мы прописывали проверку, где мы помним что промис не выкидывает ошибку в случае 404 или
// чего-то подобного, а только жесткие показывет ошибки, по типу нет инета, и мы делали проверку на правльное
// отрабатывание, в axios эта проверка уже прописана, то же самое с конвертацией в .json() 

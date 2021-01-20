function forms(){
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

}

module.exports = forms;
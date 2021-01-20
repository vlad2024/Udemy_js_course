function cards(){
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
}

module.exports = cards;
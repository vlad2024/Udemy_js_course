function slider(){
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

}

module.exports = slider;
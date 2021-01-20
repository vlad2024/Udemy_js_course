function calc(){
    // Calc

    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio;

    if(localStorage.getItem("sex")){ // проверяем на то что пользователь до это устанавливал эти значения
        sex = localStorage.getItem("sex");
    }
    else{
        sex = "female";
        localStorage.setItem("sex", "famale");
    }

    if(localStorage.getItem("ratio")){ // проверяем на то что пользователь до это устанавливал эти значения
        ratio = localStorage.getItem("ratio");
    }
    else{
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375);
    }

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

    function initLocalSettings(selector, activeClass){ // установим класс активности на правильные элементы
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem =>{
            elem.classList.remove(activeClass);
            if(elem.getAttribute("id") === localStorage.getItem("sex")){
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute("data-ratio") === localStorage.getItem("ratio")){
                elem.classList.add(activeClass);
            }
        });
    }
    
    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

    function getStaticInformation(selector, activeClass){//передаем родителя, и изначальный эл активности
        const elements = document.querySelectorAll(selector); 

        elements.forEach(elem =>{
            elem.addEventListener("click", (e) =>{
                if(e.target.getAttribute("data-ratio")){ // если у элемента по которому кликнули есть атрибут 
                                                         // data-ratio то будем выполнять
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
                }
                else{
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id")); // чтобы запоминался выбор пользов
                }
    
                elements.forEach(elem =>{ // убираю класс активности во всех элементах родителя
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass); // добавляю класс активности элементу на который нажали
                calcTotal();
            });
            
        });

        
    }

    getStaticInformation("#gender div", "calculating__choose-item_active"); //#gender div" - в первых аргументах
    // в конце стоит див ибо ведь я обращаюсь к блокам которые находятся внутри этого #gender селектора
    getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener("input", ()=>{

            if(input.value.match(/\D/g)){ // если вводим букву, будет подствечивать 
                input.style.border =  "1px solid red";
            }
            else{
                input.style.border = "none";
            }


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
}

module.exports = calc;
"use strict";

    let a = 5,
    b = a;
    b = b + 5;

    const obj = {
        a: 5,
        b: 1
    };

    const copy = obj; //объекты копируются по ссылке, а не по значению, то есть в переменную copy, мы закинули
    copy.a = 10; // ссылку на obj, по этому изменеия будут происходить не только в объекте copy а и в obj

    //console.log(obj);
    //console.log(copy);

    let copyObj = {};
    function Copy(mainObj){ // с помощью этой функции мы уже реально скопировали объект, и это уже два разных об
        for(let i in mainObj){
            copyObj[i] = mainObj[i]; 
            if ( typeof(i) === "object"){
                for(let j in i){
                    i[j] = copyObj[i][j];
                }
            }
        }
    }

    Copy(obj);

    copyObj.a = 7;
    //console.log(copyObj);

    const numbers = {
        a: 2,
        b: 5,
        c:{
            x: 7,
            y: 4
        }
    };

    const newNumbers = {};
    function CopySecond(mainObj){ // с помощью этой функции мы уже реально скопировали объект, и это уже два разных об
        for(let i in mainObj){
            newNumbers[i] = mainObj[i];
            if ( typeof(i) === "object"){
                for(let j in i){
                    i[j] = newNumbers[i][j];
                }
            } 
        }
    }

    CopySecond(numbers);
    console.log(newNumbers);

    const add = {
        d: 17,
        e: 20
    };

    console.log(Object.assign(numbers,add)); //В обджекта есть такой метод как assine он совмещает два обьекта
    // первым параметром передается тот объект в который мы хотим закинуть второй объект
    
    //в новом стандарте и 4 способом создания поверхностной копии будет использования оператора разворота
    const video = ["uouTube", "vimeo", "rutube"],
          blogs = ["wordPress", "livejournal", "blogger"],
          internet = [...video, ...blogs, "vk", "facebook"]; // еще так можно копировать массивы
    
    console.log(internet);

    function log(a,b,c){
        console.log(a);
        console.log(b);
        console.log(c);
    }

    const num = [1,5,7];
    log(...num); // с помощью оператора разворота, мы закинули массив в функцию

    // для объектов есть есть спред оператор(оператор разворота), он и для массивов тоже действует
    const Array5 = [...num]; // то есть мы скопировали массив, без всяких функций

    const q = {
        one: 1,
        two: 2
    };

    const newObj = {...q};
    
    
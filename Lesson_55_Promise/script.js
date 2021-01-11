"use strict";
// Promise - обещания, эта технология позволяет нам очень успешно и прятно работать с различными асинхронными
// операциями

console.log("Запрос данных...");

const req = new Promise((resulve, reject)=>{ // обещание создано и во внутрь нам нужно поместить 
// какую-нибудь колбек функцию, когда мы используем промисы, эти два аргумента у нас обозначают функции,
// которые мы в будущем можем сами передавать, resulve - значит что-то выполнилось правильно, reject - это
// значит, что нашее обещание не выполнилось 
    setTimeout(()=>{
        console.log("Подготовка данных..."); 
    
        const product={
            name: "TV",
            price: 2000
        };
    
        resulve(product);
    }, 2000);
}); 

req.then((product)=>{ // метод hten выполняется на промисе в случае положительного исхода
     return new Promise((resulve, reject)=>{ // возвращаем еще один Promise
        setTimeout(()=>{
            product.status = "order"; 
            resulve(product);
        },2000);
    });
}).then(data=>{
    data.modify = true;
    return data;
}).then(data=>{
    console.log(data);
}).catch(()=>{ // в случае срабатывания reject то есть будет какая-то ошибка в выполнении, сработает catch
    console.error("Произошла ошибка");
}).finaly(()=>{ // блок finaly позволяет нам выполнить действие в абсолютно любом исходе, прнцип как и в C#
    console.log("Finaly");
});

const test = (time) =>{
    return new Promise((resulve, reject)=>{
        setTimeout(()=>{
            resulve();
        },time);
    });
};    

test(1000).then(()=>{ // Просто два раза вызвали метод
    console.log("1000 ms");
});

test(1000).then(()=>{
    console.log("2000 ms");
});

Promise.all([test(1000), test(2000)]).then(()=>{ // этот метод внутрь себя принимает массив с промисами
    console.log("All");
}); // и теперь мы должны дождаться загрузки всех наших промисов и потом уэе что-то делать

Promise.race([test(1000), test(2000)]).then(()=>{ // метод гонка, он начинает своё выполнение когда первый с
    // промисов уже правльно отработал 
});
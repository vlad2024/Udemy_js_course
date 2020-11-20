"use strict";

const personalMovieDB = {
    count: 0,
    movies: {}, // создали объект в объекте
    actors: {},
    genres: [],
    private: false,
    start: function(){
        personalMovieDB.count = prompt("Сколько фильмов вы уже посмотрели"); // плюсик превращает строку в чисоловой тип
        // данных, если будет пустая строка в let оно закинет 0
    
        while(personalMovieDB.count == "" || personalMovieDB.count == null || isNaN(personalMovieDB.count)){ // команда
            // isNaN() проверяет что пользователь ввел не число (is Non a Number)
            personalMovieDB.count  = +prompt("Сколько фильмов вы уже посмотрели?");
        }
    },

    rememberMyFilms: function(){
        let lastFilm, num;
    
        for (let i = 0; i < 2; i++) {
            lastFilm = prompt("Один из последних просмотренных фильмов?", ""),
                num = prompt("На сколько оцените его", "");
        
            let temp = true;
            while (temp) {
                if (lastFilm == null || lastFilm == "" || lastFilm.length < 10 || num == null || num == "") {
                    lastFilm = prompt("Один из последних просмотренных фильмов?", ""),
                        num = prompt("На сколько оцените его?", "");
                } else {
                    personalMovieDB.movies[lastFilm] = num;
                    temp = false;
                }
            }
        }
    },

    detectPersonalLevel: function(){
        if (personalMovieDB.count < 10) {
            alert("Просмотрено довольно мало фильмов"); // выскакивает обычное модальное окно с ОК
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
            alert("Вы классический зритель");
        } else if (personalMovieDB.count > 30) {
            alert("Вы киноман");
        } else {
            console.log("Произошла ошибка");
        }
    },

    showMyDB: function(){
            if(!personalMovieDB.private){ // если наша база данных не скрыта, то есть приватность false - не приватна
             console.log(personalMovieDB);
            }
    },

    toggleVisibleMyDB: function(){
        if(personalMovieDB.private){ 
            personalMovieDB.private = false;
        }
        else{
            personalMovieDB.private = true;
        }
    },

    writeYourGenres: function(){
        for(let i = 1; i <= 3; i++){
           let genre = prompt(`Ваш любимый жанр под номером ${i}`);
           if(genre ==="" || genre==null){
               console.log("Вы ввели некорректные данные");
               i--;
           }
           else{
            personalMovieDB.genres[i-1] = genre;
           }
        }
        
        personalMovieDB.genres.forEach((item, i)=>{ // в ворыче используем колбек функцию
            console.log(`Любимый жанр ${i+1} - это ${item}`);
        });
    },

    writeYourGenres2: function(){
        for(let i = 1; i <= 2; i++){
           let genre = prompt("Введите ваши любимые жанры по порядку через запятую").toLocaleLowerCase;//чтобы сортонуть

           if(genre ==="" || genre==null){
               console.log("Вы ввели некорректные данные");
               i--;
            }
            else{
               personalMovieDB.genres = genre.split(", ");
               // а если нам надо сортонуть, а пользователь введт половину большими буквами, половину маленькими, то
               // у нас сортонет как попало, ибо по юникод класификации у нас сначала идут буквы верхнего регистра
               personalMovieDB.genres.sort();
            }
        }

        personalMovieDB.genres.forEach((item, i)=>{ // в ворыче используем колбек функцию
            console.log(`Любимый жанр ${i+1} - это ${item}`);
        });
    }
};
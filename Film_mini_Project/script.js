"use strict";

let numberOfFilm;

function start(){
    numberOfFilm = prompt("Сколько фильмов вы уже посмотрели"); // плюсик превращает строку в чисоловой тип
    // данных, если будет пустая строка в let оно закинет 0

    while(numberOfFilm == "" || numberOfFilm == null || isNaN(numberOfFilm)){ // команда isNaN() проверяет что
        // пользователь ввел не число (is Non a Number)
        numberOfFilm = +prompt("Сколько фильмов вы уже посмотрели?");
    }
}

start();

const personalMovieDB = {
    count: numberOfFilm,
    movies: {}, // создали объект в объекте
    actors: {},
    genres: [],
    private: false
};

function rememberMyFilms(){
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
}

rememberMyFilms();

function detectPersonalLevel(){
if (personalMovieDB.count < 10) {
    alert("Просмотрено довольно мало фильмов"); // выскакивает обычное модальное окно с ОК
} else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
    alert("Вы классический зритель");
} else if (personalMovieDB.count > 30) {
    alert("Вы киноман");
} else {
    console.log("Произошла ошибка");
}
}

detectPersonalLevel();

function showMyDB(hiden){ // означает что сюда передается значение tru либо false
   if(!hiden){ // если наша база данных (personalMovieDB) не скрыта, то есть приватность false - не приватна
    console.log(personalMovieDB);
   }
}

showMyDB(personalMovieDB.private);

function writeYourGenres(){
    for(let i = 1; i <= 3; i++){
       personalMovieDB.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`);
    }
}

writeYourGenres();
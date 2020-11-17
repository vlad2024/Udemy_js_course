"use strict";

const numberOfFilm = +prompt("Сколько фильмов вы уже посмотрели"); // плюсик превращает строку в чисоловой тип
// данных, если будет пустая строка в count оно закинет 0

const personalMovieDB = {
    count: numberOfFilm,
    movies: {}, // создали объект в объекте
    actors: {},
    genres: [],
    private: false
};

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

if (personalMovieDB.count < 10) {
    alert("Просмотрено довольно мало фильмов"); // выскакивает обычное модальное окно с ОК
} else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
    alert("Вы классический зритель");
} else if (personalMovieDB.count > 30) {
    alert("Вы киноман");
} else {
    console.log("Произошла ошибка");
}

console.log(personalMovieDB);
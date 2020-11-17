const numberOfFilm = +prompt("Сколько фильмов вы уже посмотрели");

const personalMovieDB = {
    count: numberOfFilm,
    movies: {}, // создали объект в объекте
    actors: {},
    genres: [],
    private: false
};

const a = prompt("Один из просмотренных фильмов",""),
      b = prompt("На сколько оцените его?", ""),
      c = prompt("Один из просмотренных фильмов",""),
      d = prompt("На сколько оцените его?", "");

personalMovieDB.movies[a] = b;  // когда записываем какие-то свойства в объект лучше использовать квадратные скобки,
// это обезопасит от некоторых багов
personalMovieDB.movies[c] = d;

console.log(personalMovieDB);


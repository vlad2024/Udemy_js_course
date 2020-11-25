
'use strict';

document.addEventListener('DOMContentLoaded', () => { // этот обрабочик событий говорит что наш js начнет выполнятся
    // только после загрузки ХТМЛ документа

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    // 1) Удалить все рекламные блоки со страницы (правая часть сайта)
    
    const adv = document.querySelectorAll(".promo__adv img");
    const deleteAdv = (arr) =>{
        arr.forEach(item=>{
        item.remove();
        });
    };
    
    // 2) Изменить жанр фильма, поменять "комедия" на "драма"
    
    const makeChanges = () =>{
        const PromoJenre = document.querySelector(".promo__genre");
        PromoJenre.textContent = "драма"; // текст контент не просто вставляет текст а и заменяет если уже есть какой-то
    };

    
    //3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
    //Реализовать только при помощи JS
    let poster = document.querySelector(".promo__bg");
    poster.style.backgroundImage = "url('img/bg.jpg')";
    
    
    // 4) Список фильмов на странице сформировать на основании данных из этого JS файла.
    // Отсортировать их по алфавиту 
    

    const moviesList = document.querySelector(".promo__interactive-list");
    const SortArr = (arr) =>{
        arr.sort();
    };
    
    function CreateMovieList(films, parent){
            SortArr(movieDB.movies);
            parent.innerHTML = ""; // мы очистили с помощью команды иннерХТМЛ, с её помощью мы можем еще и 
            // получать элементы со страницы, все те вложенности, что в promo__interactive-list
    
            films.movies.forEach((film, i) => {
                parent.innerHTML += `
                 <li class="promo__interactive-item">${i+1}.  ${film}
                 <div class="delete"></div>
                 </li>
                 `;
            }); // во внутрь помещаем колбек функцию, которая содержит фильм и номер по порядку

            // при клике на корзинку удаляет что-то
            document.querySelectorAll('.delete').forEach((btn, i) =>{
                btn.addEventListener('click', () =>{
                    btn.parentElement.remove();
                    movieDB.movies.splace(i, 1);//первый аргумент элемент с которого начинаем удаять, второй-сколько штук

                    CreateMovieList(movieDB, moviesList);
                    });
                });
    }


    const addForm = document.querySelector(".add"),
          addInput = addForm.querySelector(".adding__input"),
          checkBox = addForm.querySelector("[type='checkbox']"); // таким синтаксисом мы выберем в addForm элемент, у
          // которого атрибут type='checkbox'

          // при клике на форму добавить будем добавлять фильм
          addForm.addEventListener('submit', (event) =>{
            event.preventDefault(); // отменяем стандартное поведение браузера когда при клике на отправку формы он обно
            let newFilm = addInput.value;
            const favorite = checkBox.checked;

            if(favorite){
                console.log("Добавлено в любимые фильмы");
            }

            if(newFilm){
                if(newFilm.length > 21){
                    newFilm = `${newFilm.substring(0,22)}...`; // метод сабстринг обрезает строку
                }
                movieDB.movies.push(newFilm);
                SortArr(movieDB.movies);

                CreateMovieList(movieDB, moviesList);
            }
            
            event.target.reset(); // очищаем нашу форму addForm, просто обратиль к ней через увент(элемент на котором
            // происходит событие)
          });



    deleteAdv(adv);
    makeChanges();
    CreateMovieList(movieDB, moviesList);
    
});

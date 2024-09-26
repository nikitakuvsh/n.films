import React from 'react';
import './Main.css';
import firstPoster from '../../../img/right-poster-1.png';
import secondPoster from '../../../img/right-poster-2.png';

const Main = () => {
  return (
    <main>
      <div className="container">
        <div className="main-content">
          <div className="main-left-content">
            <h2 className="main-left-content__title">
              Волшебный семейный вечер с попкорном
            </h2>
            <p className="main-left-content__props">
              Здесь можно выбрать фильм, мультфильм, а также сериал на ваш вкус. У нас все новинки в хорошем качестве. Смотрите с удовольствием.
            </p>
            <button
              className="main-left-content__button--search-film"
              // onClick={() => window.location.href = 'searhFilms.js.html'}
            >
              Смотреть
            </button>
          </div>
          <div className="main-right-content">
            <img
              className="main-right-content__poster"
              src={firstPoster}
              alt="Poster 1"
            />
            <img
              className="main-right-content__poster"
              src={secondPoster}
              alt="Poster 2"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;

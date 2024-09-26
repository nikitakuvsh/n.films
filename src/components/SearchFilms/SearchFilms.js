import React, { useState, useRef } from 'react';
import './SearchFilms.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import selectedFilms from '../../img/selected-films.png';

// Импортируем базу данных с фильмами и ссылками
import movieDatabase from '../data/movies.json';

const ModalPlayer = ({ videoUrl, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content">
        <iframe
          width="560"
          height="315"
          src={videoUrl}
          title="videoPlayer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const SearchFilms = () => {
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false); // Для управления плеером
  const [videoUrl, setVideoUrl] = useState(''); // Ссылка на видео
  const swiperRef = useRef(null); // Create a ref for the Swiper instance

  const fetchMovies = async (title) => {
    const apiKey = '96334f7f';
    const url = `http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
        if (swiperRef.current) {
          swiperRef.current.slideTo(0); // Reset to the first slide
        }
      } else {
        alert('Фильмы не найдены');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  const handleSearch = () => {
    if (movieTitle) {
      fetchMovies(movieTitle);
    } else {
      alert('Введите название фильма');
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    const foundMovie = movieDatabase.movies.find((dbMovie) => dbMovie.imdbID === movie.imdbID);
    if (foundMovie) {
      setVideoUrl(foundMovie.videoUrl);
    } else {
      setVideoUrl(''); // Если фильма нет в базе данных
    }
  };

  const handleWatchOnline = () => {
    if (videoUrl) {
      setShowPlayer(true);
    } else {
      alert('Ссылка на фильм недоступна.');
    }
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
  };

  return (
    <div className="search-films-container">
      <div className="container">
        <div className="search-film-header">
          <input
            className="search-films-input"
            type="text"
            placeholder="Найти фильм"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <button className="try-search-btn" onClick={handleSearch}>Поиск</button>
        </div>
      </div>

      {selectedMovie && (
        <div className="movie-details">
          <div className="container">
            <div className="movie-poster-active__main--container">
              <img className="movie-poster-active__image" src={selectedMovie.Poster} alt={selectedMovie.Title}></img>
              <p className="movie-poster-active__years">Год: {selectedMovie.Year}</p>
            </div>
            <div className="movie-poster-active__container--props">
              <h2 className="movie-poster-active__title">{selectedMovie.Title}</h2>
              <p className="movie-poster-active__plot">Тут будет перессказ</p>
              <div className="movie-poster-active__button-container">
                <button className="movie-poster-active__button button__watch" onClick={handleWatchOnline}>Смотреть онлайн</button>
                <button className="button__add-selected">
                  <img src={selectedFilms} alt="Добавить в избранное"></img>
                </button>
              </div>
              <button className="movie-poster-active__button button__download">Скачать</button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="movie-slider-container">
          {movies.length > 0 && (
            <Swiper
              ref={swiperRef}
              spaceBetween={30}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="custom-swiper"
              breakpoints={{
                1920: {
                  slidesPerView: 4,
                },
                1366: {
                  slidesPerView: 3,
                },
              }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {movies.map((movie, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`movie-card ${selectedMovie === movie ? 'selected' : ''}`}
                    onClick={() => handleMovieClick(movie)}
                  >
                    {console.log(movie.imdbID)}
                    <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
                    <h3 className="movie-poster-title-under-image">{movie.Title}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      {/* Модальное окно с плеером */}
      {showPlayer && (
        <ModalPlayer
          videoUrl={videoUrl}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default SearchFilms;

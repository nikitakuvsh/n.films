import React, { useState, useRef } from 'react';
import './SearchFilms.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import selectedFilms from '../../img/selected-films.png';

const SearchFilms = () => {
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
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
          <div className='container'>
          <div className='movie-poster-active__main--container'>
            <img className="movie-poster-active__image" src={selectedMovie.Poster} alt={selectedMovie.Title}></img>
            <p className='movie-poster-active__years'>Год: {selectedMovie.Year}</p>
          </div>
          <div className='movie-poster-active__container--props'>
            <h2 className='movie-poster-active__title'>{selectedMovie.Title}</h2>
            <p className='movie-poster-active__plot'>Тут будет перессказ</p>
            <div className='movie-poster-active__button-container'>
              <button className='movie-poster-active__button button__watch'>Смотреть онлайн</button>
              <button className='button__add-selected'>
                <img src={selectedFilms} alt='Добавить в избранное'></img>
              </button>
            </div>
            <button className='movie-poster-active__button button__download'>Скачать</button>
          </div>
        </div>
        </div>
      )}
    <div className="container">
      <div className="movie-slider-container">
        {movies.length > 0 && (
          <Swiper
            ref={swiperRef} // Attach the ref to the Swiper
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
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Store the Swiper instance
          >
            {movies.map((movie, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`movie-card ${selectedMovie === movie ? 'selected' : ''}`}
                  onClick={() => handleMovieClick(movie)}
                >
                  <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
                  <h3 className="movie-poster-title-under-image">{movie.Title}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  </div>
  );
};

export default SearchFilms;

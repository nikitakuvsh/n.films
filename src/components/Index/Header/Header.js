import React from 'react';
import './Header.css';
import starLogo from '../../../img/star-logo.png';
import iconPhone from '../../../img/icon-phone.png';
import selectedFilms from '../../../img/selected-films.png';
import { Link } from 'react-router-dom'; // Импортируем Link


const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <Link to="/">
            <img className="header-logo" src={starLogo} alt="Логотип" />
          </Link>
          <Link to="/">
            <span className="header-name">N.FILMS</span>
          </Link>
          <Link className="header-nav-link" to="/">Главная</Link>
          <Link className="header-nav-link" to="/search-films">Фильмы</Link>
          <a className="header-nav-link" href="">О сервисе</a>
          <a className="header-nav-link" href="">Контакты</a>
          <img className="header-tel" src={iconPhone} alt="Иконка телефона" />
          <a className="header-tel-link" href="tel:+79539860583">+79539860583</a>
          <a className="header-selected-films" href="">
            <img src={selectedFilms} alt="Избранные фильмы" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;

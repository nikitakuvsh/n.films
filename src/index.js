import React from 'react';  // Импорт React
import ReactDOM from 'react-dom/client';  // Импорт ReactDOM для рендеринга
import './index.css';  // Подключение стилей
import App from './App';  // Импорт компонента App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* Рендер компонента App */}
  </React.StrictMode>
);

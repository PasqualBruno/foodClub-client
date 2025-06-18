import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <img
        src="/assets/undraw_page-not-found_6wni.svg"
        alt="Página não encontrada"
        className="page-not-found__image"
      />
      <h1 className="page-not-found__title">Ops! Página não encontrada.</h1>
      <p className="page-not-found__text">
        Parece que você tentou acessar uma página que não existe.
      </p>
      <button
        className="page-not-found__button"
        onClick={() => navigate('/entrar')}
      >
        Ir para Login
      </button>
    </div>
  );
};

export default PageNotFound;

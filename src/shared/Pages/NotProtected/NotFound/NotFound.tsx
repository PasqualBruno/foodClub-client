// PageNotFound.tsx

import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img
        src="/assets/undraw_page-not-found_6wni.svg"
        alt="Página não encontrada"
        className={styles.image}
      />
      <h1 className={styles.title}>Ops! Página não encontrada.</h1>
      <p className={styles.text}>
        Parece que você tentou acessar uma página que não existe.
      </p>
      <button
        className={styles.button}
        onClick={() => navigate('/entrar')}
      >
        Ir para Login
      </button>
    </div>
  );
};

export default PageNotFound;

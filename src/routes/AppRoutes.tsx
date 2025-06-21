// src/routes/AppRoutes.tsx
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/AppLayout/AppLayout';
import RequireAuth from './RequireAuth';
import AuthLayout from '@/shared/Pages/NotProtected/AuthLayout/AuthLayout';
import Login from '@/shared/Pages/NotProtected/Login/Login';
import PageNotFound from '@/shared/Pages/NotProtected/NotFound/NotFound';
import SignUp from '@/shared/Pages/NotProtected/SignUp/SignUp';
import InitialPage from '@/shared/Pages/NotProtected/InitialPage/InitialPage';
import App from '@/App';
import { useRestaurantStore } from '@/Entities/Restaurant/store/RestaurantStore';
import RestaurantDishes from '@/Entities/Restaurant/pages/dishes/RestaurantDishes';

const AppRoutes = () => {

  const { restaurant } = useRestaurantStore()

  return (
    <Routes>
      {/* Redireciona raiz "/" para "/entrar" */}
      <Route path="/" element={<Navigate to="/entrar" replace />} />

      {/* Rotas públicas */}
      <Route element={<AuthLayout />}>
        <Route path="/entrar" element={<Login />} />
        <Route path="/registrar" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>

      {/* Rotas protegidas */}
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/inicio" element={<InitialPage />} />
          {restaurant?.name && <Route path="/pratos" element={<RestaurantDishes />} />}
          <Route path="/pedidos" element={<App />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

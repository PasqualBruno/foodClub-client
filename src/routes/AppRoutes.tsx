import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/AppLayout/AppLayout';
import RequireAuth from './RequireAuth';
import AuthLayout from '@/shared/Pages/NotProtected/AuthLayout/AuthLayout';
import Login from '@/shared/Pages/NotProtected/Login/Login';
import PageNotFound from '@/shared/Pages/NotProtected/NotFound/NotFound';
import SignUp from '@/shared/Pages/NotProtected/SignUp/SignUp';
import InitialPage from '@/shared/Pages/NotProtected/InitialPage/InitialPage';
import { useRestaurantStore } from '@/Entities/Restaurant/store/RestaurantStore';
import RestaurantDishes from '@/Entities/Restaurant/pages/dishes/RestaurantDishes';
import { useAuthStore } from '@/shared/store/AuthStore';
import RestaurantOrders from '@/Entities/Restaurant/pages/orders/RestaurantOrders';
import CompanyEmployees from '@/Entities/Company/Pages/employees/CompanyEmployees';

const AppRoutes = () => {

  const { restaurant } = useRestaurantStore()
  const { user } = useAuthStore()

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
          {/* Company  */}
          {user.userType === 'company' && <Route path="/funcionarios" element={<CompanyEmployees />} />}

          <Route path="/inicio" element={<InitialPage />} />
          {restaurant?.name && <Route path="/pratos" element={<RestaurantDishes />} />}
          <Route path="/pedidos" element={user.userType === 'company' ? <InitialPage /> : <RestaurantOrders />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

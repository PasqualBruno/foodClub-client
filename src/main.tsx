import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { App as AntdApp } from 'antd'
import App from './App.tsx'
import AppLayout from './components/AppLayout/AppLayout.tsx'
import RequireAuth from './routes/RequireAuth.tsx'
import AuthLayout from './shared/Pages/NotProtected/AuthLayout/AuthLayout.tsx'
import Login from './shared/Pages/NotProtected/Login/Login.tsx'
import PageNotFound from './shared/Pages/NotProtected/NotFound/NotFound.tsx'
import InitialPage from './shared/Pages/NotProtected/InitialPage/InitialPage.tsx'
import SignUp from './shared/Pages/NotProtected/SignUp/SignUp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AntdApp>
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
              <Route path="/pratos" element={<App />} />
              <Route path="/pedidos" element={<App />} />
            </Route>
          </Route>
        </Routes>
      </AntdApp>
    </BrowserRouter>
  </StrictMode>
)

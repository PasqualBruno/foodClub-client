import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { App as AntdApp, ConfigProvider } from 'antd'
import ptBR from 'antd/locale/pt_BR'

import App from './App.tsx'
import AppLayout from './components/AppLayout/AppLayout.tsx'
import RequireAuth from './routes/RequireAuth.tsx'
import AuthLayout from './shared/Pages/NotProtected/AuthLayout/AuthLayout.tsx'
import Login from './shared/Pages/NotProtected/Login/Login.tsx'
import PageNotFound from './shared/Pages/NotProtected/NotFound/NotFound.tsx'
import SignUp from './shared/Pages/NotProtected/SignUp/SignUp.tsx'
import InitialPage from './shared/Pages/NotProtected/InitialPage/InitialPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: '#7D0000',
          colorText: '#3e3e3e',
          colorBgLayout: '#fafafa',
          colorBorder: '#d9d9d9',
        },
        components: {
          Menu: {
            itemSelectedColor: '#7D0000',
            itemSelectedBg: '#fff1f0',
            itemHoverColor: '#a8071a',
            itemHoverBg: '#fff2f0',
          },
          Button: {
            colorPrimary: '#7D0000',
            colorPrimaryHover: '#a8071a',
            colorPrimaryActive: '#5a0000',
          },
          Tag: {
            colorPrimary: '#7D0000',
            colorBgContainer: '#fff1f0',
          },
          Input: {
            activeBorderColor: '#7D0000',
            hoverBorderColor: '#a8071a',
          },
          Card: {
            paddingSM: 8
          }
        },
      }}

    >
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
    </ConfigProvider>
  </StrictMode>
)

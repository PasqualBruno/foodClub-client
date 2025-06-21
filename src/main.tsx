// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { App as AntdApp, ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';

import AppRoutes from './routes/AppRoutes';

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
            paddingSM: 8,
          },
        },
      }}
    >
      <BrowserRouter>
        <AntdApp>
          <AppRoutes /> {/* Aqui você renderiza as rotas separadas */}
        </AntdApp>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);

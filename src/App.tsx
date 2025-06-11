import React from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import {
  //
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
  Outlet,
} from 'react-router-dom';

const { Content, Sider } = Layout;

// Layout padrão com sidebar e outlet para rotas internas
const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Usuários',
      path: '/users',
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'Câmeras',
      path: '/cameras',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Uploads',
      path: '/uploads',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => {
            const item = menuItems.find((i) => i.key === key);
            if (item) navigate(item.path);
          }}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

// Página de erro 404 sem layout
const NotFoundPage = () => (
  <div
    style={{
      height: '100vh',
      display: 'grid',
      placeItems: 'center',
      fontSize: 24,
    }}
  >
    Página não encontrada (404)
  </div>
);

// Páginas simuladas
const Users = () => <div>Usuários</div>;
const Cameras = () => <div>Câmeras</div>;
const Uploads = () => <div>Uploads</div>;

// App principal
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Grupo de rotas com layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/uploads" element={<Uploads />} />
        </Route>

        {/* Página 404 sem layout */}
        <Route path="/404" element={<NotFoundPage />} />

        {/* Rotas não protegidas
           - Initial page
           - login
           - Cadastro
           - 404
        */}


        {/* Captura qualquer rota inválida e redireciona */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};

export default App;

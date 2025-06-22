import { BowlSteamIcon, HouseIcon, ListBulletsIcon, SignOutIcon } from '@phosphor-icons/react'
import { Layout, Menu } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'

const { Sider, Content } = Layout

const AppLayout = () => {
  const navigate = useNavigate()

  return (
    <Layout style={{ minHeight: '97.5vh' }}>
      <Sider
        style={{
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          padding: '8px',
        }}
      >
        <div style={{ flex: 1 }}>
          <Menu
            theme="dark"
            mode="inline"
            onClick={({ key }) => navigate(key)}
            items={[
              { key: '/inicio', label: 'Início', icon: <HouseIcon size={24} /> },
              { key: '/pratos', label: 'Pratos', icon: <BowlSteamIcon size={24} /> },
              { key: '/pedidos', label: 'Pedidos', icon: <ListBulletsIcon size={24} /> },
            ]}
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => {
            if (key === 'logout') {
              // lógica de logout aqui
              localStorage.removeItem('foodClubToken')
              navigate('/entrar')
            }
          }}
          items={[
            {
              key: 'logout',
              label: 'Sair',
              icon: <SignOutIcon size={24} />,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Content style={{ margin: 24, background: '#fff', padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout

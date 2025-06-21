import { BowlSteamIcon, HouseIcon, ListBulletsIcon, SignOutIcon } from '@phosphor-icons/react'
import { Layout, Menu } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useRestaurantStore } from '@/Entities/Restaurant/store/RestaurantStore'

const { Sider, Content } = Layout

const AppLayout = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const { restaurant } = useRestaurantStore()

  const menuItems = [
    { key: '/inicio', label: 'Início', icon: <HouseIcon size={24} /> },
    restaurant?.name && {
      key: '/pratos',
      label: 'Pratos',
      icon: <BowlSteamIcon size={24} />,
    },
    { key: '/pedidos', label: 'Pedidos', icon: <ListBulletsIcon size={24} /> },
  ].filter(Boolean)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        breakpoint="md"
        collapsedWidth={0}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '8px',
          borderRight: 'none',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div style={{ flex: 1 }}>
          <Menu
            style={{ borderRight: 'none' }}
            theme="light"
            onClick={({ key }) => navigate(key)}
            items={menuItems}
          />
        </div>

        <Menu
          theme="light"
          onClick={({ key }) => {
            if (key === 'logout') {
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
        <Content style={{ background: '#fff', padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout

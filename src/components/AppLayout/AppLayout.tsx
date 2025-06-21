import {
  BowlSteamIcon,
  BuildingOfficeIcon,
  ForkKnife,
  ForkKnifeIcon,
  HouseIcon,
  ListBulletsIcon,
  SignOutIcon,
  Users,
} from '@phosphor-icons/react'
import { Image, Layout, Menu } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useRestaurantStore } from '@/Entities/Restaurant/store/RestaurantStore'
import { useAuthStore } from '@/shared/store/AuthStore'
import { UserType } from '@/shared/interfaces/sharedInterfaces'

import styles from './AppLayout.module.scss'

const { Sider, Content } = Layout

const AppLayout = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const { restaurant } = useRestaurantStore()
  const { user } = useAuthStore()

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
        className={styles.sider}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={styles.sider_inner}>
          <div>
            <div className={styles.user_container}>
              <Image
                className={styles.user_image}
                src={user?.image || 'https://media.tenor.com/mCs02aeuB50AAAAe/beluga-cat-meme-discord.png'}
                width={40}
                height={40}
                preview={false}
                style={{ borderRadius: '50%' }}
                fallback="https://cbx-prod.b-cdn.net/COLOURBOX65474531.jpg?width=800&height=800&quality=70"
              />
              <p className={styles.user_name}>{user?.name}</p>
            </div>

            <Menu
              className={styles.menu}
              onClick={({ key }) => navigate(key)}
              items={menuItems}
              theme='dark'
            />
          </div>

          <div>
            <Menu
              theme='dark'
              className={styles.menu}
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

            <div className={styles.footer_container}>
              {user.userType === UserType.Company && (
                <>
                  <BuildingOfficeIcon size={32} />
                  <p className={styles.restaurant_name}>Empresa afiliada</p>
                </>
              )}

              {user.userType === UserType.Restaurant && (
                <>
                  <ForkKnifeIcon size={32} />
                  <p className={styles.restaurant_name}>{'Restaurante'}</p>
                </>
              )}

              {user.userType === UserType.Employee && (
                <>
                  <Users size={32} />
                  <p className={styles.restaurant_name}>{'Colaborador'}</p>
                </>
              )}
            </div>
          </div>
        </div>
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

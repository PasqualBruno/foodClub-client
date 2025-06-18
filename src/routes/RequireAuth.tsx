import { Navigate, Outlet } from 'react-router-dom'

const isTokenValid = () => {
  const token = localStorage.getItem('foodClubToken')
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)

    const isTokenExpired = payload.exp < currentTime
    return !isTokenExpired
  } catch (err) {
    return false
  }
}

const RequireAuth = () => {
  return isTokenValid() ? <Outlet /> : <Navigate to="/entrar" />
}

export default RequireAuth

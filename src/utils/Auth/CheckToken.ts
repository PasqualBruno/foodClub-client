export function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]))
  const currentTime = Math.floor(Date.now() / 1000)
  return payload.exp < currentTime
}

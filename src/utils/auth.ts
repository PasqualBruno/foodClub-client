export const UserType = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type UserType = typeof UserType[keyof typeof UserType];

export function verifyToken(): { userType: UserType; authenticated: boolean } {
  return {
    userType: UserType.ADMIN,
    authenticated: true,
  };
}

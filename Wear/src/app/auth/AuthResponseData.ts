export class AuthResponseData {
  email!: string;
  bearerToken!: string;
  registered?: boolean;
  expiresIn!: string;
  isAdmin = false;
  isAuthenticated = false;
  // kind: string;
  // bearerToken: string;
  // email: string;
  // refreshToken: string;
  // expiresIn!: string;
  // localId: string;
}

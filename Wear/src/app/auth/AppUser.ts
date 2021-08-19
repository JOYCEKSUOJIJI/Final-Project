export class AppUser {
  // UserId!: string; //user email
  // iat!: string; // issue at time
  // IsAdmin = false;
  constructor(
    public UserId: string,
    public iat: string,
    public token: string,
    public IsAdmin: boolean,
    public IsLogin: boolean
  ) {}
  // get token() {
  //   return this._token;
  // }
}

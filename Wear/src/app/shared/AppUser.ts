
export class AppUser {
  constructor(
    public UserId: string,
    public iat: string,
    public token: string,
    public IsAdmin: boolean,
    public IsLogin: boolean
  ) {}

}

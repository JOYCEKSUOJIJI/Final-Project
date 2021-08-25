//user management
export class User {
  UserId!: string;
  Password!: string;

  constructor(UserId: string, Password: string) {
    this.UserId = UserId;
    this.Password = Password;
  }
}

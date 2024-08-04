export class LoginFailedError extends Error {
  constructor() {
    const message = "Failed To Login";
    super(message);
    this.message = message;
    this.name = "LoginFailedError";
  }
}

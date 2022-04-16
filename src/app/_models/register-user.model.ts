export class RegisterUser {
  constructor(firstname: String, lastname: String, email: String, password: String, confirmPassword: String, roleName: String[]) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.roleName = roleName;
  }

  firstname: String;
  lastname: String;
  email: String;
  password: String;
  confirmPassword: String;
  roleName: String[];
}

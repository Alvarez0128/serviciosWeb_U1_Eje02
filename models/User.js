class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static createUser(username, password) {
    return new User(username, password);
  }
}

module.exports = User;

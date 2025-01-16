class User {
  constructor(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.password = password; // Em produção, deve ser hash
    this.email = email;
    this.createdAt = new Date();
  }
}

export default User;

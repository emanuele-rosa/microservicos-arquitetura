import { v4 as uuidv4 } from "uuid";
import Logger from "../utils/Logger.js";

class AuthService {
  constructor() {
    this.users = new Map();
    this.sessions = new Map();
    Logger.log("AuthService", "Initialized");
  }

  registerUser(username, password, email) {
    if (this.users.has(username)) {
      Logger.error("AuthService", `User ${username} already exists`);
      throw new Error("Username already exists");
    }

    const user = {
      id: uuidv4(),
      username,
      password, // Trcar para hash
      email,
    };

    this.users.set(username, user);
    Logger.log("AuthService", `User ${username} registered successfully`);
    return user;
  }

  login(username, password) {
    const user = this.users.get(username);

    if (!user || user.password !== password) {
      Logger.error("AuthService", `Failed login attempt for user ${username}`);
      throw new Error("Invalid credentials");
    }

    const sessionToken = uuidv4();
    this.sessions.set(sessionToken, {
      userId: user.id,
      createdAt: new Date(),
    });

    Logger.log("AuthService", `User ${username} logged in successfully`);
    return { sessionToken, user };
  }

  validateSession(sessionToken) {
    const session = this.sessions.get(sessionToken);

    if (!session) {
      Logger.error("AuthService", "Invalid session token");
      throw new Error("Invalid session");
    }

    // Verificar expiração da sessão
    return session;
  }

  logout(sessionToken) {
    if (this.sessions.delete(sessionToken)) {
      Logger.log("AuthService", "User logged out successfully");
      return true;
    }
    return false;
  }
}

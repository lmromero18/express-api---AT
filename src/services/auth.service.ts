import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { jwtHelper } from "../helpers/jwt.helper";

export class AuthService {
  /**
   * @description Authenticate a user by username and password.
   * @param username Username provided by the client.
   * @param password Password provided by the client.
   * @returns The generated JWT token if authentication is successful.
   * @throws Error if authentication fails.
   */
  async login(username: string, password: string): Promise<string> {
    // Buscar usuario por username
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid username or password");
    }

    // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }

    // Construir el payload para el token
    const payload = {
      sub: user._id,
      user: {
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
      },
    };

    // Generar token
    const token = await jwtHelper.generateJwtToken(payload);
    return token;
  }
}

export const authService = new AuthService();

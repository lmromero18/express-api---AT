import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export class AuthController {
  /**
   * @description Handle login request.
   */
  async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    console.log(req.body); // Log the request body for debugging
    

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    try {
      const token = await authService.login(username, password);
      return res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error: any) {
      return res.status(401).json({ success: false, message: error.message });
    }
  }
}

export const authController = new AuthController();

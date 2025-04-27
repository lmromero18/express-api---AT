import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { ResponseHelper } from "../helpers/response.helper";

export class UserController {
    constructor() { }

    /**
     * @description Create a new user.
     * @param req Express request object containing user data.
     * @param res Express response object to send the result.
     * @returns Response with created user data or error message.
     */
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const newUser = await userService.create(req.body);

            return ResponseHelper.success(res, newUser, 201);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 400);
        }
    }

    /**
     * @description Retrieve all users with optional pagination and filters.
     * @param req Express request object containing query parameters.
     * @param res Express response object to send the result.
     * @returns Response with list of users or error message.
     */
    async get(req: Request, res: Response): Promise<Response> {
        try {
            const result = await userService.get(req);
            return ResponseHelper.success(res, result);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message);
        }
    }

    /**
     * @description Retrieve a single user by ID.
     * @param req Express request object containing user ID in params.
     * @param res Express response object to send the result.
     * @returns Response with user data or not found error.
     */
    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const user = await userService.getById(id);
            if (!user) {
                return ResponseHelper.error(res, "User not found", 404);
            }
            return ResponseHelper.success(res, user);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message);
        }
    }

    /**
     * @description Update an existing user by ID.
     * @param req Express request object containing user ID and update data.
     * @param res Express response object to send the result.
     * @returns Response with updated user data or not found error.
     */
    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { username } = req.params;
            const updatedUser = await userService.update(username, req.body);
            if (!updatedUser) {
                return ResponseHelper.error(res, "User not found", 404);
            }
            return ResponseHelper.success(res, updatedUser);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message);
        }
    }

    /**
     * @description Delete a user by ID.
     * @param req Express request object containing user ID in params.
     * @param res Express response object to send the result.
     * @returns Response with deleted user data or not found error.
     */
    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { username } = req.params;
            const deletedUser = await userService.delete(username);
            if (!deletedUser) {
                return ResponseHelper.error(res, "User not found", 404);
            }
            return ResponseHelper.success(res, deletedUser);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message);
        }
    }


    /**
     * @description Change password for a user.
     * @param {Request} req - The request object containing username as param and passwords in body.
     * @param {Response} res - The response object to send the result.
     * @returns {Promise<Response>} - The response object.
     */
    public async changePassword(req: Request, res: Response): Promise<Response> {
        try {
            const { username } = req.params;
            const { oldPassword, newPassword } = req.body;

            if (!oldPassword || !newPassword) {
                return ResponseHelper.error(res, "Both old password and new password are required", 400);
            }

            const updatedUser = await userService.changePassword(username, {
                password: oldPassword,
                newPassword
            });

            return ResponseHelper.success(res, updatedUser, 200);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message);
        }
    }

    /**
     * @description Get a user by username.
     * @param {Request} req - The request object containing username as param.
     * @param {Response} res - The response object to send the result.
     * @returns {Promise<Response>} - The response object with user data or an error message.
     */
    public async getByUsername(req: Request, res: Response): Promise<Response> {
        try {
            const { username } = req.params;
            const user = await userService.getByUsername(username);
            if (!user) {
                return ResponseHelper.error(res, "User not found", 404);
            }
            return ResponseHelper.success(res, user);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message);
        }
    }
}

export const userController = new UserController();

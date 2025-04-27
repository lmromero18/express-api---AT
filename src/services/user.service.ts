import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user.model";
import { RepositoryService } from "../services/repository.service";

export class UserService extends RepositoryService<IUser> {
    constructor() {
        super(User);
    }

    /**
     * @description Register a new user with validation and password hashing.
     * @param data User registration data.
     * @returns The newly created user.
     * @throws Error if username already exists.
     */
    public async create(data: Partial<IUser> & { confirmPassword?: string }): Promise<IUser> {
        const { username, password, name, lastName, email, confirmPassword } = data;

        if (!username || !password || !name || !lastName || !email || !confirmPassword) {
            throw new Error("All fields are required");
        }

        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error("Username already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            ...data,
            password: hashedPassword,
        };

        const createdUser = await super.create(userData);

        delete (createdUser as any).password;

        return createdUser as IUser;
    }

    public async update(username: string, data: Partial<IUser>): Promise<IUser> {
        const { email, name, lastName } = data;

        if (!email && !name && !lastName) {
            throw new Error("At least one field must be provided to update");
        }

        // Verificar si el nuevo email ya está en uso
        if (email) {
            const existingUser = await User.findOne({ email, username: { $ne: username } });
            if (existingUser) {
                throw new Error("Email already exists");
            }
        }

        if (data.password) {
            throw new Error("Password cannot be updated using this method");
        }

        const updatedUser = await User.findOneAndUpdate(
            { username },
            data,
            { new: true }
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        delete (updatedUser as any).password;

        return updatedUser;
    }

    public async changePassword(username: string, data: { password: string; newPassword: string }): Promise<IUser> {
        const { password, newPassword } = data;

        if (!password || !newPassword) {
            throw new Error("All fields are required");
        }

        const user = await User.findOne({ username, status: "ACTIVE" });
        if (!user) {
            throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Invalid password");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();

        return user;
    }

    public async delete(username: string): Promise<IUser> {

        const deletedUser = await User.findOneAndUpdate(
            { username },
            { status: "INACTIVE" },
            { new: true }
        );

        if (!deletedUser) {
            throw new Error("User not found");
        }

        delete (deletedUser as any).password;

        return deletedUser;

    }

    /**
     * @description Get a user by username.
     * @param username Username of the user to retrieve.
     * @returns The user object or null if not found.
     */

    public async getByUsername(username: string): Promise<IUser | null> {
        const user = await User.findOne({ username });
        if (!user) {
            return null;
        }
        delete (user as any).password; // Remove password from the user object

        return user;

    }


}

export const userService = new UserService();

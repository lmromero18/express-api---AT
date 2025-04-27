import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    status: "ACTIVE" | "INACTIVE";
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
        validate: {
            validator: function (v: string) {
                return /^[a-zA-Z0-9._-]+$/.test(v);
            },
            message: (props: { value: string }) => `${props.value} is not a valid username`,
        },
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        validate: {
            validator: function (v: string) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: (props: { value: string }) => `${props.value} is not a valid name`,
        },
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        validate: {
            validator: function (v: string) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: (props: { value: string }) => `${props.value} is not a valid last name`,
        },
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v: string) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: (props: { value: string }) => `${props.value} is not a valid email`,
        },
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE",
        uppercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100      
    },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;

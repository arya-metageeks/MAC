import mongoose, { Model } from "mongoose";
import type { TAdmin } from "../types/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema<TAdmin>(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        }, 
        password: {
            type: String,
            minlength: [6, "password should have a minimum of 6 characters"],
            select: false,
        },
        role: {
            type: String,
            default: "admin",
        },
    },
    { timestamps: true }
);

interface adminModel extends Model<TAdmin> { }

adminSchema.pre<TAdmin>("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

adminSchema.methods.createJWT = function (
    this: TAdmin,
    accessToken?: string
) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment.");
    }

    interface Payload {
        id: string;
        accessToken?: string;
    }
    const payload: Payload = {
        id: this._id!,
    };

    if (accessToken) {
        payload.accessToken = accessToken;
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

adminSchema.methods.comparePassword = async function ( 
    givenPassword: string
) {
    // Debugging log to see the given password and the stored password
    console.log("Candidate password:", givenPassword);
    console.log("Stored password:", this.password);

    if (!givenPassword) {
        throw new Error("Password is required for comparison");
    }
    
    const isMatch = await bcrypt.compare(givenPassword, this.password);
    console.log("Password match result:", isMatch);
    return isMatch;
};

export default mongoose.model<TAdmin, adminModel>(
    "Admin",
    adminSchema
);

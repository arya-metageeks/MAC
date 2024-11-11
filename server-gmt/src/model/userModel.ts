import mongoose, { Model } from "mongoose";
import type { TUser } from "../types/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        gameId: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // validate: [validator.isEmail, "please enter a valid email"],
        },
        isEmailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        password: {
            type: String,
            minlength: [6, "password should have a minimum of 6 characters"],
            select: false,
        },
        avatar: {
            type: String,
            default: "",
        },
        domainName: {
            type: String,
            unique: true,
            default: ""
        },
        twitterUsername: {
            type: String,
            default: ""
        },
        discordUsername: {
            type: String,
            default: ""
        },
        metamaskAddress: {
            type: String,
            default: ""
        }, 
         kolsCart: [ {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Profile", 
            default:[]
        }],
        boughtKols: [ {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Profile", 
            default:[]
        }],
    },
    { timestamps: true }
);

interface userModel extends Model<TUser> { }

userSchema.pre<TUser>("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

userSchema.methods.createJWT = function (
    this: TUser,
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
        id: this._id,
    };

    if (accessToken) {
        payload.accessToken = accessToken;
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

userSchema.methods.comparePassword = async function ( 
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

export default mongoose.model<TUser, userModel>(
    "User",
    userSchema
);

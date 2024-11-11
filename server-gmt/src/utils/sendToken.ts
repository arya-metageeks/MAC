import { Response } from "express";

export const sendToken = async (user: any, statusCode: number, res: Response, accessToken?: string) => {
    let token = accessToken ? await user.createJWT({ accessToken, provider: user.provider }) : await user.createJWT();

    const options = {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
};
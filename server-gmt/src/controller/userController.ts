import catchAsyncError from "../middlewere/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import axios from "axios";
import User from "../model/userModel";
import { sendToken } from "../utils/sendToken";
import bcrypt from 'bcryptjs'; // Ensure bcrypt is imported
import activityModel from "../model/activityModel";

const serverGeneratedState = "12345678";

export const getUserGoogle = catchAsyncError(async (req, res, next) => {

    if (req.body.hasOwnProperty("error")) {
        const { error_description } = req.body;
        return next(new ErrorHandler(error_description, 401));
    }


    const { code, state } = req.body;
    if (serverGeneratedState !== state) {
        return next(new ErrorHandler("candidate is not authorized", 401));
    }

    const clientId = process.env.GOOGLE_CLIENT_ID || "";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
    const callbackUrl = process.env.GOOGLE_CALLBACK_URL || "";
    let accessToken = "";
    try {
        const { data } = await axios.post(`https://oauth2.googleapis.com/token`, {
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: callbackUrl,
            grant_type: "authorization_code",
            access_type: "offline",
            prompt: "consent",
        });
        accessToken = data.access_token;
        console.log(data, "data by google");
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Error while getting accessToken", 400));
    }
    let response;
    try {
        const { data } = await axios.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        response = data;
        console.log(data, "data by google");
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Error while getting userInfo", 400));
    }

    let user;
    const userObj = {
        email: response.email,
        firstName: response.given_name,
        lastName: response.family_name || ".",
        avatar: response.picture,
        isEmailVerified: response.verified_email,
    };

    user = await User.findOne({ email: response.email });
    if (!user) {
        user = await User.create(userObj);
    }
    await sendToken(user, 201, res, accessToken);
});

export const getUser = catchAsyncError(async (req, res, next) => {

    if (req.user) {

        return res.status(200).json({ user: req.user })
    }
    return next(new ErrorHandler("User not found", 404));
})

export const updateUser = catchAsyncError(async (req, res, next) => {

    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true, useFindAndModify: false });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({ user });
} ); 


export const signupUser = catchAsyncError(async (req, res, next) => {
    // Validate request body
    if (!req.body) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    const { firstName, lastName, email, password, avatar, domainName } = req.body;

    // Ensure all required fields are provided
    if (!firstName || !lastName || !email || !password) {
        return next(new ErrorHandler("Please provide all required values", 400));
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        return next(new ErrorHandler("User already exists", 400));
    } 

    // Create new user object
    const newUser = {
        firstName,
        lastName,
        email,
        password, // Ensure password is hashed in the model
        avatar: avatar || "", // Default to empty string if no avatar is provided
        isEmailVerified: false, // Default value
        domainName: email, // Set to null if not provided
    };

    // Create the user
    const user = await User.create(newUser); 
 
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
    });
});

export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body, "req.body");

    if (!email || !password) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    const user = await User.findOne({ email }).select("password"); 
    if (!user) {
        throw new Error("User not found");
    }

    const verifyPassword = await user.comparePassword(password); // Call the instance method

    if (!verifyPassword) {
        return next(new ErrorHandler("Invalid  Email or Password", 401));
    }

    sendToken(user, 200, res);
});
   
// add boughtKols to user.boughtKols
// export const addBoughtKols = catchAsyncError( async ( req, res, next ) =>
// {
//     const {boughtKols} = req.body;
//     console.log("kol:-",boughtKols,req.body)
//     try {
//         const user = req.user;
//         console.log("user:-",user)
//         user?.boughtKols?.push( ...boughtKols );
//         console.log("user after:-",user)
//         await user?.save();
//         res.status( 200 ).json( {
//             success: true,
//             message: "Bought Kols added successfully",
//             user:user
//         } ); 
//     } catch (error) {
//         console.log( "error in buying the kol:-", error );
//         return next( new ErrorHandler( "Failed to add bought Kols", 400 ) );
//     }
// } );

// add the kols ids to cart
export const addKolsToCart = catchAsyncError(async (req, res, next) => {
    const { kols } = req.body; // Ensure this matches what you're sending from the frontend
    console.log("kol:-", kols, req.body);

    try {
        const user = req.user; 
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        // add the activity to the activity model
        const  activity = await activityModel.create({
            // @ts-ignore
            userId: user?._id,
                // @ts-ignore 
            userName: `${user?.firstName} ${user?.lastName}`,
            activity: "added to cart",
            onKol: kols._id,
            kolName: kols.name,
        });

        console.log("Activity created:", activity); 
        console.log("user:-", user);
            // @ts-ignore
        user.kolsCart.push(kols._id);
        console.log("user after:-", user);
            // @ts-ignore 
        await user.save();
        res.status(200).json({
            success: true,
            message: "Kols added to cart successfully",
            user: user
        });
    } catch (error) {
        console.log("error in buying the kol:-", error);
        return next(new ErrorHandler("Failed to add Kols to cart", 400));
    }
});

    
    
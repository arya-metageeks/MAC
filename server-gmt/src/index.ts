import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Profile as TwitterProfile, Strategy as TwitterStrategy } from 'passport-twitter';
import {  addKolsToCart, getUser, getUserGoogle, loginUser, signupUser, updateUser } from './controller/userController';
import { isAuthenticatedUser } from './middlewere/auth';
import { default as User, default as UserModel } from './model/userModel';
import gameRouter from './routes/gameRoutes';
import tournamentRouter from './routes/tournaments';
import waitingRoomRouter from './routes/waitingRoom';
import profileRouter from './routes/profileRoues';
import adminRouter from './routes/adminRoutes';
import errorMiddleware from './middlewere/error';
import { TUser } from './types/user';
import joiningTournamentRouter from './routes/joiningTournament';
import activityRouter from './routes/activityRouter';
const DiscordStrategy = require('passport-discord').Strategy;
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(session({
  secret: 'thisissecretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
console.log(process.env.CLIENT_URL)
app.use(cors({
  origin: process.env.CLIENT_URL, credentials: true
}));
app.use(express.json());

const mongoURL = process.env.MONGO_URL || "";
mongoose.connect(mongoURL);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

app.post('/store', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user document using UserModel
    const newUser = new UserModel({ username, email, password });
    // Save the document to the database
    await newUser.save();

    res.status(201).json({ message: 'User data stored successfully' });
  } catch (error) {
    console.error('Error storing user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY!,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
  callbackURL: process.env.TWITTER_CONSUMER_CALLBACK_URL!,
}, async (token, tokenSecret, profile, done) => {
  try {
    const username = (profile as TwitterProfile).username;
    console.log("Successful authentication TWITTER username:", username);
    done(null, { username });
  } catch (error) {
    done(error);
  }
}));


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL!
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    if (!email) {
      return done(new Error('No email found in Google profile'));
    }
    console.log("Successful authentication GOOGLE email:", email);

    done(null, { email });
  } catch (error) {
  }
}));


passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID!,
  clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  callbackURL: process.env.DISCORD_CALLBACK_URL!,
  scope: ['identify', 'email']
}, async (accessToken: string, _: string, profile: any, done: any) => {
  try {
    const username = profile.username;
    return done(null, { username });
  } catch (error) {
    return done(error);
  }
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID!,
  clientSecret: process.env.FACEBOOK_APP_SECRET!,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
  profileFields: ['id', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    if (!email) {
      return done(new Error('No email found in Facebook profile'));
    }
    console.log("Successful authentication FACEBOOK email:", email);

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({ email });
    }
    done(null, user);
  } catch (error) {
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: process.env.CLIENT_URL }), isAuthenticatedUser,
  async (req, res) => {

    const reqUser = req.user as TUser;
    const user = await User.findById(reqUser._id)
    if (user) {
      user.twitterUsername = req.payloadName.username;
      await user.save()
    }

    const redirectPath = `${process.env.CLIENT_URL}/setting`;
    res.redirect(redirectPath);
  }
); 


app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }), isAuthenticatedUser,
  async (req, res) => {
    const reqUser = req.user as TUser;
    const user = await User.findById(reqUser._id)
    if (user) {
      user.discordUsername = req.payloadName.username;
      await user.save()
    }
    res.redirect(`${process.env.CLIENT_URL}/setting`);
  }
);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], state: "12345678" }));

app.use('/auth/admin', adminRouter);
app.post( '/auth/user', getUserGoogle );
app.post( '/create/user', signupUser );
app.post( '/user/login', loginUser );
app.get('/auth/getUser', isAuthenticatedUser, getUser);
app.patch('/auth/user/:id', isAuthenticatedUser, updateUser);
// app.post( '/user/buy-kols', isAuthenticatedUser,addBoughtKols );
app.post('/user/add-kol-to-cart',isAuthenticatedUser,addKolsToCart)
app.use('/game', gameRouter);
app.use('/tournament', tournamentRouter);
app.use('/waitingRoom', waitingRoomRouter);
app.use( '/profile', profileRouter );
app.use( '/tournament-joining', joiningTournamentRouter );
app.use("/activities",activityRouter)

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/setting`);
  }
);

app.post('/addemail', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const newUser = new UserModel({ email });
    await newUser.save();

    res.status(201).json({ message: 'Email added successfully' });
  } catch (error) {
    console.error('Error adding email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/save-user-data', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log("Hit")

    const newUser = new UserModel({ email });

    await newUser.save();

    res.status(201).json({ message: 'User data stored successfully' });
  } catch (error) {
    console.error('Error storing user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript server');
});

app.get('/greet', (req: Request, res: Response) => {
  const username = (req.user as any)?.username;
  res.send(`Welcome, ${username || 'Guest'}!`);
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// hello
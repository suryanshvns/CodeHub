import passport from "passport";
import dotenv from 'dotenv';
import { Strategy as GitHubStrategy } from "passport-github2";
import User from '../models/user.model.js';

dotenv.config();

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback"
}, async function(accessToken, refreshToken, profile, done) {
    try {
        // Check if the user already exists in the database
        let user = await User.findOne({ username: profile.username });
        
        // If user does not exist, create a new user
        if (!user) {
            user = new User({
                name: profile.displayName,
                username: profile.username,
                profileUrl: profile.profileUrl,
                avatarUrl: profile.photos[0].value,
                likedProfiles: [],
                likedBy: []
            });

            await user.save();
        }

        done(null, user);
    } catch (error) {
        done(error);
    }
}));

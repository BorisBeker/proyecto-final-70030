import passport from "passport";
import jwt from "passport-jwt";
import localStrategy from "passport-local";
import { userModel } from "../models/user.model.js";
import { JWT_SECRET } from "../utils/jwt.js";
import { createHash } from "../utils/hash.js";
import { verifyPassword } from "../utils/hash.js";

const LocalStrategy = localStrategy.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

function initializePassport() {
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            const user = await userModel.findOne({ email })

            if (!user) {
                return done(null, false, { message: "usuario no encontrado" })
            }

            const isPassordCorrect = await verifyPassword(password, user.password);

            if (!isPassordCorrect) {
                return done(null, false, { message: "la contraseña es incorrecta" })
            }
            return done(null, user)
        } catch (error) {
            return done("hubo un error " + error.message)
        }
    }))

    passport.use(
        "register",
        new LocalStrategy(
            {
                usernameField: "email",
                passReqToCallback: true,
            }, async (req, email, password, done) => {
                try {
                    const { first_name, last_name, age, role } = req.body;
                    if (!first_name || !last_name || !age || !role) {
                        return done(null, false, {
                            message: "todos los campos son requeridos",
                        });
                    }

                    const userExists = await userModel.findOne({ email });

                    if (userExists) {
                        return done(null, false, { message: "el usuario ya existe" });
                    }

                    const user = await userModel.create({
                        first_name,
                        last_name,
                        email,
                        age,
                        role,
                        password
                    });

                    return done(null, user);
                } catch (error) {
                    return done("hubo un error: " + error.message);
                }
            }
        ));

    passport.serializeUser((user, done) => {
            done(null, user._id);
        })

    passport.deserializeUser(async (id, done) => {
            try {
                const user = await userModel.findById(id);
                return done(null, user)
            } catch (error) {
                return done("hubo un error " + error.message)
            }
        })
}
passport.use(
    "jwt",
    new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET
    }, async (payload, done) => {
        try {
            done(null, payload)
        } catch (error) {
            return done(error)
        }
    })
)

function cookieExtractor(req) {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies.token;
    }

    return token;
}

export { initializePassport };
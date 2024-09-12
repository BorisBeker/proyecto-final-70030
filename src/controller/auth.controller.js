import { generateToken } from "../utils/jwt.js";
import passport from "passport";

class AuthController {
    async login(req, res) {
        const payload = {
            email: req.user.email,
            role: req.user.role,
        };

        const token = generateToken(payload);

        res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 2,
            httpOnly: true,
        });

        res.status(200).json({ message: "Login exitoso" });
    }

    async loginError(req, res) {
        res.status(401).json({ message: "Usuario o contraseña incorrecto" });
    }

    async register(req, res) {
        passport.authenticate("register", (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: "Error en el registro: " + err });
            }

            if (!user) {
                return res.status(400).json({ message: info.message || "No se pudo registrar el usuario" });
            }

            res.status(201).json({ message: "Registro exitoso", user: { email: user.email, name: `${user.first_name} ${user.last_name}`, role: user.role } });
        })(req, res);
    }

    async current(req, res) {
        if (!req.user) {
            return res.status(401).json({ message: "No estás autenticado" });
        }

        const user = {
            email: req.user.email,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            role: req.user.role,
        };

        res.status(200).json({ user });
    }

    async logout(req, res) {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout exitoso" });
    }
}

export default new AuthController();
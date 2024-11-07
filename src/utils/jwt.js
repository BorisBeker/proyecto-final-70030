import jwt from "jsonwebtoken";
import env from "../utils/env.util.js";

export const JWT_SECRET = env.JWT_SECRET;
export function generateToken(payload){
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn : "2h"});
    return token
}

export function verifyToken(token){
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error("Token inválido: " + error);
    }
}
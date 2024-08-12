import jwt from "jsonwebtoken";

export const JWT_SECRET = "3st0 s3 sup0n3 qu3 3s s3cr3t0";

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
import { generateToken } from "../../src/utils/jwt.js";
import assert from "assert";

describe("Auth Utils - Generate Token", function () {
    it("Debe generar un token válido", function () {
        const payload = { email: "test@example.com", role: "user" }; // Debe ser un email diferente cada vez
        const token = generateToken(payload);
        
        assert.strictEqual(token.split(".").length, 3, "El token debe tener 3 partes separadas por '.'");
    });
});
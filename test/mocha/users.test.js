import { userModel } from "../../src/models/user.model.js";
import assert from "assert";
import env from "../../src/utils/env.util.js"
import dbConnect from "../../src/utils/dbConnect.js";

describe("User Model - CRUD Operations", () => {
    before(async () => await dbConnect(env.MONGO_URI))
    it("Debe crear un usuario correctamente", async function () {
        const user = new userModel({
            first_name: "John",
            last_name: "Doe",
            email: "john.doe3@example.com",
            password: "password123",
            age: 25,
            role: "user",
        });

        const savedUser = await user.save();
        assert.strictEqual(savedUser.email, "john.doe3@example.com", "El email del usuario no coincide");
    });
});
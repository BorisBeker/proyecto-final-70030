import supertest from "supertest";
import {expect} from "chai";
import app from "../../src/server.js";

const request = supertest(app);

describe("Auth Routes", 
    ()=> {
    it("Debe registrar un usuario exitosamente", async function () {
        const user = {
            first_name: "John",
            last_name: "Doe",
            email: "test@example.com", //debes utilizar un email diferente cada vez
            password: "password123",
            age: "30",
            role: "user",
        };

        const res = await request.post("/api/auth/register").send(user);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("message", "Registro exitoso");
    });
});
import supertest from "supertest";
import env from "../../src/utils/env.util.js"
import dbConnect from "../../src/utils/dbConnect.js";
import { expect } from "chai";
import app from "../../src/server.js";

const request = supertest(app);

describe("User Routes", function () {
    let adminToken;

    before(async function () {
        await dbConnect(env.MONGO_URI)
        const loginResponse = await request
            .post("/api/auth/login") 
            .send({
                email: "mimamamemimahuevos8@cuervos.com", // Debes utilizar un email con permisos de administrador
                password: "123",
            });

        console.log(loginResponse.status)
        expect(loginResponse.status).to.equal(200);
        expect(loginResponse.body).to.have.property("message", "Login exitoso");

        const cookies = loginResponse.headers["set-cookie"];
        const tokenCookie = cookies.find((cookie) => cookie.includes("token="));
        if (tokenCookie) {
            adminToken = tokenCookie.split(";")[0].split("=")[1];
        } else {
            throw new Error("Token no encontrado en la cookie.");
        }
    });

    it("Debe obtener todos los usuarios", async function () {
        const res = await request
            .get("/api/users")
            .set("Cookie", `token=${adminToken}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    });

    it("Debe obtener un usuario por ID", async function () {
        const userId = "exampleID"; // Debes colocar un ID de un usuario de la base de datos
        const res = await request
            .get(`/api/users/${userId}`)
            .set("Cookie", `token=${adminToken}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("email");
    });
});
import supertest from "supertest";
import {expect} from "chai";
import env from "../../src/utils/env.util.js"
import dbConnect from "../../src/utils/dbConnect.js";
import app from "../../src/server.js";

const request = supertest(app);

describe("Cart Routes", function () {

    let adminToken;

    before(async function () {
        await dbConnect(env.MONGO_URI)
        const loginResponse = await request
            .post("/api/auth/login")
            .send({
                email: "example@email.com", // Debes utilizar un email con permisos de usuario
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

    it("Debe crear un carrito", async function () {
        const cartData = {
            email: "test@example.com",
            products: [{ product: "exampleID", quantity: 1 }], //debes cambiar el ID del product por uno real de la base de datos
        };

        const res = await request.post("/api/cart")
            .send(cartData)
            .set("Cookie", `token=${adminToken}`);
        expect(res.status).to.equal(201);
    });
});
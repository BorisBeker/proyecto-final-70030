import supertest from "supertest";
import {expect} from "chai";
import app from "../../src/server.js";

const request = supertest(app);

describe("Product Routes", function () {
    it("Debe obtener todos los productos", async function () {
        const res = await request.get("/api/products");
        expect(res.status).to.equal(200);
    });
});
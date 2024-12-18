import { cartDBManager } from "../../src/managers/cartDBManager.js";
import env from "../../src/utils/env.util.js"
import dbConnect from "../../src/utils/dbConnect.js";
import assert from "assert";
import mongoose from "mongoose";

describe("CartDBManager - createCart", function () {
    before(async () => await dbConnect(env.MONGO_URI))

    const CartManager = new cartDBManager();
    const productid = new mongoose.Types.ObjectId();

    it("Debe crear un carrito correctamente", async function () {
        const cartData = { products: [{ product: productid, quantity: 2 }] };
        const cart = await CartManager.createCart(cartData);
        
        assert.ok(cart._id, "El carrito debe tener un ID");
    });

    it("Debe crear un carrito correctamente", async function () {
        const cartData = { products: [{ product: productid, quantity: 2 }] };
        const cart = await CartManager.createCart(cartData);

        assert.strictEqual(cart.products[0].product, productid, "El ID del producto no coincide");
    });
});
import { productDBManager } from "../../src/managers/productDBManager.js";
import env from "../../src/utils/env.util.js"
import dbConnect from "../../src/utils/dbConnect.js";
import assert from "assert";

describe("ProductDBManager - createProduct", function () {
    before(async ()=> {await dbConnect(env.MONGO_URI)})

    const ProductManager = new productDBManager()

    it("Debe crear un producto correctamente", async function () {
        const productData = {
            title: "Test Product",
            description: "Test Description",
            code: 31431894318491,
            price: 100,
            stock: 10,
            category: "Test Category",
        };

        const product = await ProductManager.createProduct(productData);
        
        assert.ok(product._id, "El producto debe tener un ID");
    });

    it("Debe crear un producto correctamente", async function () {
        const productData2 = {
            title: "Test Product 2",
            description: "Test Description 2",
            code: 31431894318491,
            price: 100,
            stock: 10,
            category: "Test Category 2",
        };

        const product = await ProductManager.createProduct(productData2);
        
        assert.strictEqual(product.title, "Test Product 2", "El título del producto no coincide");
    });
});
import { Router } from "express"
import fs from "fs"
import { io } from "../server.js"

const router = Router();

const productos = JSON.parse(fs.readFileSync("./datos/productos.json", "utf-8"));

router.get("/", (req, res) => {
    io.emit("getProducts", productos)
    res.json(productos);
})

router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await productos.find(product => product.id == pid);

    if(!product) {
        res.status(404).json({ error: "No hay un producto con ese id"})
    } else {
        res.json(product);
    }
})

router.post("/", (req, res) => {
    const { title, description, code, price, stock, category } = req.body;

    const newId = productos[productos.length - 1].id + 1;

    if(!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: "Todos los campos son obligatorios"})
    } else {
        const newProduct = {
            id: newId,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category
        }
        productos.push(newProduct);
        fs.writeFileSync("./datos/productos.json", JSON.stringify(productos, null, "\t"));
        }
    io.emit("getProducts", productos);
    res.json(productos);
})

router.put("/:pid", (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, stock, category } = req.body;

    if(!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: "Todos los campos son obligatorios"})
    } else {
        const product = productos.find(product => product.id == pid);

        if(!product) {
            res.status(404).json({ error: "No hay un producto con ese id"})
        } else {
            product.title = title;
            product.description = description;
            product.code = code;
            product.price = price;
            product.stock = stock;
            product.category = category;
            fs.writeFileSync("./datos/productos.json", JSON.stringify(productos, null, "\t"));
            io.emit("getProducts", productos)
            res.json(product);
        }
    }
})

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    const productIndex = productos.findIndex(product => product.id == pid)
    
    if (pid > productos[productos.length - 1].id) {
        res.status(400).json(`No hay un producto con el id: ${pid}`);
    } else {
        try{
            const product = await productos.splice(productIndex, 1)
            io.emit("getProducts", productos)
            res.json(product);
            fs.writeFileSync("./datos/productos.json", JSON.stringify(productos, null, "\t"));
        } catch(err) {
            res.status(400).json(`Hubo un error al realizar la petición: ${err}`);
        };
    }
})

export default router
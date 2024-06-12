import { Router } from "express";
import fs from "fs";

const router = Router();
let productos = JSON.parse(fs.readFileSync("./datos/productos.json", "utf-8"));

router.get("/", (req, res) => {
    res.render("home", { productos });
});

router.get("/realTimeProducts", (req, res) => {
    res.render("realTimeProducts", { productos });
});

export default router;
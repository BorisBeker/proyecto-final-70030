import express from "express"
import products from "./routes/products.routes.js"

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

app.use("/api/products", products);
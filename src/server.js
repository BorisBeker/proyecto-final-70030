import Express from "express";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import mongoose from "mongoose";

const app = Express();

const url = "mongodb://localhost:27017/proyectofinal";
mongoose.connect(url);

const PORT = 5000;
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`);
});

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
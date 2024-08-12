import Express from "express";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import authRoutes from "./routes/auth.routes.js"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import morgan from "morgan";

const app = Express();

const url = "mongodb://localhost:27017/proyectofinal";
mongoose.connect(url).then(()=>{console.log("MongoDB Conected")}).catch((error) =>{console.log(error)});

const PORT = 5000;
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`);
});

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/auth", authRoutes)
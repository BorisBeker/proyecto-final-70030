import Express from "express";
import { authenticate, authorizations } from "./middlewares/authorization.middleware.js";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import opts from "./utils/swagger.utils.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware.js";
import mocksRouter from './routes/mocks.routes.js';
import env from "./utils/env.util.js"
import dbConnect from "./utils/dbConnect.js";

const app = Express();
const MONGO_URI = env.MONGO_URI;
const dbconnect = dbConnect(MONGO_URI);

const PORT = env.PORT;
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`);
});

app.use(errorHandler);

// Documentation
const specs = swaggerJSDoc(opts);
app.use("/api/doc", serve, setup(specs))


// routers
app.use("/api/products", productsRoutes);
app.use('/api/mocks', mocksRouter);
app.use("/api/cart", authenticate("jwt"), authorizations(["user"]), cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", authenticate("jwt"), authorizations(["admin"]), userRoutes);

export default app;
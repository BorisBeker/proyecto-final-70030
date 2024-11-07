import { config } from "dotenv";
import args from "./args.util.js"

const { mode } = args;
const path = "./.env." + mode;
config({ path })

export default {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
}
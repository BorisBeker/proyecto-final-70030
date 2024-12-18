import mongoose from "mongoose";

const dbConnect = async (uri) => {
    try {
        const MONGO_URI = uri;
        await mongoose.connect(MONGO_URI).then(() => { console.log("MongoDB Conected") }).catch((error) => { console.log(error) });
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default dbConnect;
import mongoose from 'mongoose';

const carritosCollection = 'carritos';

const carritoSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "productos"
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
});

export const carritoModel = mongoose.model(carritosCollection, carritoSchema);
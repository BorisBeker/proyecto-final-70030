import { Schema, model } from "mongoose";

const carritoSchema = new Schema(
    {
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: "productos" },
                quantity: { type: Number, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

carritoSchema.pre("findOne", async function (next) {
    this.populate("products.product");
    next();
});

export const carritoModel = model("cart", carritoSchema);
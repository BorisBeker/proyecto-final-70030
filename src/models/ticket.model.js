import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

ticketSchema.pre('save', function (next) {
    this.code = uuidv4(); // Autogenerar un código único
    next();
});

export const ticketModel = mongoose.model('Ticket', ticketSchema);
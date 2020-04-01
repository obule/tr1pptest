import mongoose, { Schema } from 'mongoose';

const ReceiptSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Products',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Receipts', ReceiptSchema);

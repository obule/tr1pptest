import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Product name is required'],
    },
    quantityInStock: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

ProductSchema.statics = {
  createProduct(args) {
    return this.create({
      ...args,
    });
  },

  AllProducts({ skip = 0, limit = 5 } = {}) {
    return this.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  },
};

export default mongoose.model('Products', ProductSchema);

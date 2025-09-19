const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["laptops", "mobiles", "accessories"],
    },
    brand: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    specifications: {
      type: Map,
      of: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    tags: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    discount: {
      percentage: {
        type: Number,
        min: 0,
        max: 100,
      },
      expiresAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
productSchema.index({
  name: "text",
  description: "text",
  category: 1,
  brand: 1,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

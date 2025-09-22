const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: {
        values: ["laptops", "mobiles", "accessories", "tablets", "wearables"],
        message: "Please select a valid category",
      },
    },
    brand: {
      type: String,
      required: [true, "Product brand is required"],
      enum: {
        values: ["Apple", "Samsung", "Dell", "HP", "Oppo", "Redmi", "Motorola"],
        message: "Please select a valid Brand",
      },
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    specifications: {
      type: Map,
      of: String,
    },
    rating: {
      value: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    tags: [String],
    status: {
      type: String,
      enum: {
        values: [
          "active",
          "inactive",
          "out-of-stock",
          "low-stock",
          "discontinued",
        ],
        message: "Please select a valid status",
      },
      default: "active",
    },
    discount: {
      percentage: {
        type: Number,
        min: 0,
        max: 100,
      },
      expiresAt: Date,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    weight: {
      type: Number,
      min: 0,
    },
    sales: {
      type: Number,
      min: 0,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    warranty: {
      type: String,
      default: "1 year",
    },
    createdBy: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: Date,
      default: Date.now,
    },
    sku: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

//  Indexes for better performance
productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1, brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ status: 1 });
productSchema.index({ createdAt: -1 });

//  Pre-save middleware to generate SKU automatically
productSchema.pre("save", async function (next) {
  if (!this.sku || this.sku.trim() === "") {
    const count = await mongoose.model("Product").countDocuments();
    this.sku = `SKU-${String(count + 1).padStart(6, "0")}`;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

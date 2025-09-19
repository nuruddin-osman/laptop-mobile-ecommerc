const express = require("express");
const Product = require("../../models/dashboard/product.model");
const router = express.Router();

// // Get all products with filtering, sorting, and pagination
// router.get(
//   "/",
//   protect,
//   advancedResults(Product, {
//     path: "createdBy",
//     select: "name email",
//   }),
//   async (req, res) => {
//     res.status(200).json(res.advancedResults);
//   }
// );

// // Get product statistics
// router.get("/stats", protect, async (req, res) => {
//   try {
//     const stats = await Product.getStatistics();

//     // Get category-wise counts
//     const categoryStats = await Product.aggregate([
//       {
//         $group: {
//           _id: "$category",
//           count: { $sum: 1 },
//           totalStock: { $sum: "$stock" },
//         },
//       },
//     ]);

//     // Get status-wise counts
//     const statusStats = await Product.aggregate([
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       data: {
//         overview: stats,
//         byCategory: categoryStats,
//         byStatus: statusStats,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// // Get single product
// router.get("/:id", protect, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("createdBy", "name email")
//       .populate("updatedBy", "name email");

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// Create new product
router.post("/", async (req, res) => {
  try {
    // // Add createdBy field
    // req.body.createdBy = req.user.id;

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// // Update product
// router.put("/:id", protect, async (req, res) => {
//   try {
//     // Add updatedBy field
//     req.body.updatedBy = req.user.id;

//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     })
//       .populate("createdBy", "name email")
//       .populate("updatedBy", "name email");

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       const messages = Object.values(error.errors).map((val) => val.message);
//       return res.status(400).json({
//         success: false,
//         message: messages.join(", "),
//       });
//     }
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// // Delete product
// router.delete("/:id", protect, authorize("admin"), async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     await product.deleteOne();

//     res.status(200).json({
//       success: true,
//       data: {},
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// // Bulk operations
// router.post("/bulk", protect, authorize("admin"), async (req, res) => {
//   try {
//     const { operation, ids, data } = req.body;

//     let result;
//     switch (operation) {
//       case "delete":
//         result = await Product.deleteMany({ _id: { $in: ids } });
//         break;
//       case "update-status":
//         result = await Product.updateMany(
//           { _id: { $in: ids } },
//           { status: data.status, updatedBy: req.user.id }
//         );
//         break;
//       case "update-stock":
//         result = await Product.updateMany(
//           { _id: { $in: ids } },
//           { stock: data.stock, updatedBy: req.user.id }
//         );
//         break;
//       default:
//         return res.status(400).json({
//           success: false,
//           message: "Invalid operation",
//         });
//     }

//     res.status(200).json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// // Search products
// router.get("/search/advanced", protect, async (req, res) => {
//   try {
//     const {
//       q,
//       category,
//       brand,
//       minPrice,
//       maxPrice,
//       status,
//       minStock,
//       maxStock,
//       featured,
//       sortBy = "createdAt",
//       sortOrder = "desc",
//       page = 1,
//       limit = 10,
//     } = req.query;

//     // Build query
//     let query = {};

//     // Text search
//     if (q) {
//       query.$text = { $search: q };
//     }

//     // Category filter
//     if (category) {
//       query.category = category;
//     }

//     // Brand filter
//     if (brand) {
//       query.brand = new RegExp(brand, "i");
//     }

//     // Price range
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     // Status filter
//     if (status) {
//       query.status = status;
//     }

//     // Stock range
//     if (minStock || maxStock) {
//       query.stock = {};
//       if (minStock) query.stock.$gte = Number(minStock);
//       if (maxStock) query.stock.$lte = Number(maxStock);
//     }

//     // Featured filter
//     if (featured !== undefined) {
//       query.featured = featured === "true";
//     }

//     // Sort options
//     const sortOptions = {};
//     sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

//     // Pagination
//     const skip = (page - 1) * limit;

//     const products = await Product.find(query)
//       .sort(sortOptions)
//       .limit(limit * 1)
//       .skip(skip)
//       .populate("createdBy", "name email");

//     const total = await Product.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       data: {
//         products,
//         pagination: {
//           current: parseInt(page),
//           pages: Math.ceil(total / limit),
//           total,
//         },
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

module.exports = router;

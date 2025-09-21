import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaSort,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [sortOrder, setSortOrder] = useState("desc");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "laptops",
    price: "",
    description: "",
    tags: [],
    rating: {
      value: "",
      count: "",
    },
    stock: "",
    discount: {
      percentage: 0,
      expiresAt: "",
    },
    status: "active",
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
    warranty: "",
  });

  const normalizeProductData = (formData) => {
    return {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      weight: Number(formData.weight),
      discount: {
        ...formData.discount,
        percentage: Number(formData.discount.percentage),
        expiresAt: formData.discount.expiresAt
          ? new Date(formData.discount.expiresAt).toISOString()
          : null,
      },
      dimensions: {
        length: Number(formData.dimensions.length),
        width: Number(formData.dimensions.width),
        height: Number(formData.dimensions.height),
      },
      rating: {
        value: Number(formData.rating.value),
        count: Number(formData.rating.count),
      },
      description: formData.description || "",
      warranty: formData.warranty || "1 year",
    };
  };

  const handleTagsChange = (e) => {
    const value = e.target.value;
    const tagsArray = value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  const handleDiscountChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      discount: {
        ...prev.discount,
        [name]: value,
      },
    }));
  };

  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      rating: {
        ...prev.rating,
        [name]: Number(value),
      },
    }));
  };

  // Stats data - FIXED: NaN error for products without sales
  const stats = {
    totalProducts: products.length,
    totalSales: products.reduce(
      (sum, product) => sum + (product.sales || 0),
      0
    ),
    outOfStock: products.filter((product) => product.stock === 0).length,
    totalRevenue: products.reduce(
      (sum, product) => sum + product.price * (product.sales || 0),
      0
    ),
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchProducts = async ({
    searchTerm = "",
    categoryFilter = "all",
    statusFilter = "all",
    brandFilter = "all",
    priceRange = "all",
    sortBy = "newest",
    sortOrder = "desc",
  }) => {
    try {
      let minPrice, maxPrice;
      switch (priceRange) {
        case "0-500":
          minPrice = 0;
          maxPrice = 500;
          break;
        case "500-1000":
          minPrice = 500;
          maxPrice = 1000;
          break;
        case "1000-1500":
          minPrice = 1000;
          maxPrice = 1500;
          break;
        case "1500+":
          minPrice = 1500;
          maxPrice = null;
          break;
        default:
          minPrice = null;
          maxPrice = null;
      }

      // Sort options conversion
      let backendSortBy;
      let backendSortOrder = sortOrder;

      switch (sortBy) {
        case "newest":
          backendSortBy = "createdAt";
          break;
        case "oldest":
          backendSortBy = "createdAt";
          backendSortOrder = "asc";
          break;
        case "name":
          backendSortBy = "name";
          backendSortOrder = "asc";
          break;
        case "price-high":
          backendSortBy = "price";
          backendSortOrder = "desc";
          break;
        case "price-low":
          backendSortBy = "price";
          backendSortOrder = "asc";
          break;
        default:
          backendSortBy = "createdAt";
      }

      const response = await axios.get(
        `http://localhost:4000/api/dashboard/product`,
        {
          params: {
            search: searchTerm,
            category: categoryFilter !== "all" ? categoryFilter : undefined,
            status: statusFilter !== "all" ? statusFilter : undefined,
            brand: brandFilter !== "all" ? brandFilter : undefined,
            minPrice: minPrice,
            maxPrice: maxPrice,
            sortBy: backendSortBy,
            sortOrder: backendSortOrder,
          },
        }
      );
      if (response.data) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // First time load
  useEffect(() => {
    fetchProducts({
      searchTerm,
      categoryFilter,
      statusFilter,
      brandFilter,
      priceRange,
      sortBy,
      sortOrder,
    });
  }, []);

  // Every term change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts({
        searchTerm,
        categoryFilter,
        statusFilter,
        brandFilter,
        priceRange,
        sortBy,
        sortOrder,
      });
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [
    searchTerm,
    categoryFilter,
    statusFilter,
    brandFilter,
    priceRange,
    sortBy,
    sortOrder,
  ]);

  // Handle add product - IMPROVED: Better error handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const normalizedData = normalizeProductData(formData);

      if (editingProduct) {
        const response = await axios.put(
          `http://localhost:4000/api/dashboard/product/${editingProduct._id}`,
          normalizedData
        );
        if (response.data.success) {
          alert("Product updated successfully!");
        } else {
          alert(`Error: ${response.data.message}`);
        }
      } else {
        const response = await axios.post(
          `http://localhost:4000/api/dashboard/product`,
          normalizedData
        );
        if (response.data.success) {
          alert("Product created successfully!");
        } else {
          alert(`Error: ${response.data.message}`);
        }
      }

      setIsModalOpen(false);
      setEditingProduct(null);

      // Reset form
      setFormData({
        name: "",
        brand: "",
        category: "laptops",
        price: "",
        description: "",
        tags: [],
        rating: {
          value: "",
          count: "",
        },
        stock: "",
        discount: {
          percentage: 0,
          expiresAt: "",
        },
        status: "active",
        weight: 0,
        dimensions: {
          length: 0,
          width: 0,
          height: 0,
        },
        warranty: "",
      });

      // Refresh products list
      fetchProducts({
        searchTerm,
        categoryFilter,
        statusFilter,
        brandFilter,
        priceRange,
        sortBy,
        sortOrder,
      });
    } catch (error) {
      console.error("Product operation error:", error);

      // IMPROVED: Better error messages
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred while saving the product");
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name || "",
      brand: product.brand || "",
      category: product.category || "laptops",
      price: product.price || "",
      description: product.description || "",
      tags: product.tags || [],
      rating: {
        value: product.rating?.value || "",
        count: product.rating?.count || "",
      },
      stock: product.stock || "",
      discount: {
        percentage: product.discount?.percentage || 0,
        expiresAt: product.discount?.expiresAt || "",
      },
      status: product.status || "active",
      weight: product.weight || 0,
      dimensions: {
        length: product.dimensions?.length || 0,
        width: product.dimensions?.width || 0,
        height: product.dimensions?.height || 0,
      },
      warranty: product.warranty || "",
    });
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/dashboard/product/${id}`
      );
      if (response.data) {
        alert("Delete success");
        // Refresh with current filters
        fetchProducts({
          searchTerm,
          categoryFilter,
          statusFilter,
          brandFilter,
          priceRange,
          sortBy,
          sortOrder,
        });
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Product Dashboard
          </h1>
          <p className="text-gray-600">Manage your products and inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaBox className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Products
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalProducts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaShoppingCart className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Sales
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalSales}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <FaTimes className="text-red-600 text-xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Out of Stock
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.outOfStock}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaMoneyBillWave className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Revenue
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FaFilter className="mr-2" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPlus className="mr-2" />
                Add Product
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="laptops">Laptops</option>
                    <option value="mobiles">Mobiles</option>
                    <option value="accessories">Accessories</option>
                    {/* REMOVED: wearables option because it's not in backend enum */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="out-of-stock">Out of Stock</option>
                    <option value="discontinued">Discontinued</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Brands</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Redmi">Redmi</option>
                    <option value="Motorola">Motorola</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-500">$0 - $500</option>
                    <option value="500-1000">$500 - $1000</option>
                    <option value="1000-1500">$1000 - $1500</option>
                    <option value="1500+">$1500+</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <FaBox className="text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.brand}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sales || 0}{" "}
                      {/* FIXED: Show 0 if sales is undefined */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : product.status === "out-of-stock"
                            ? "bg-red-100 text-red-800"
                            : product.status === "discontinued"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.status === "active"
                          ? "Active"
                          : product.status === "out-of-stock"
                          ? "Out of Stock"
                          : product.status === "discontinued"
                          ? "Discontinued"
                          : product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add or Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b">
                <h3 className="text-xl font-semibold text-gray-800 font-open-sans">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                    // Reset form when closing modal
                    setFormData({
                      name: "",
                      brand: "",
                      category: "laptops",
                      price: "",
                      description: "",
                      tags: [],
                      rating: {
                        value: "",
                        count: "",
                      },
                      stock: "",
                      discount: {
                        percentage: 0,
                        expiresAt: "",
                      },
                      status: "active",
                      weight: 0,
                      dimensions: {
                        length: 0,
                        width: 0,
                        height: 0,
                      },
                      warranty: "",
                    });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="overflow-y-auto">
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column - Basic Information */}
                    <div className="space-y-5">
                      <h4 className="font-semibold text-gray-700 border-b pb-2">
                        Basic Information
                      </h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Brand <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all"
                          required
                        >
                          <option value="">Select Brand</option>
                          <option value="Apple">Apple</option>
                          <option value="Samsung">Samsung</option>
                          <option value="Dell">Dell</option>
                          <option value="HP">HP</option>{" "}
                          {/* FIXED: Changed from "Hp" to "HP" */}
                          <option value="Oppo">Oppo</option>
                          <option value="Redmi">Redmi</option>
                          <option value="Motorola">Motorola</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all"
                            required
                          >
                            <option value="">Select Category</option>
                            <option value="laptops">Laptops</option>
                            <option value="mobiles">Mobiles</option>
                            <option value="accessories">Accessories</option>
                            <option value="tablets">Tablets</option>
                            {/* REMOVED: wearables option because it's not in backend enum */}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                            <FaSort />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating
                          </label>
                          <div className="">
                            <input
                              type="number"
                              name="value"
                              placeholder="Rating Value"
                              value={formData.rating.value}
                              onChange={handleRatingChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              min="0"
                              max="5"
                              step="0.1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Count
                          </label>
                          <div className="">
                            <input
                              type="number"
                              name="count"
                              placeholder="Rating Count"
                              value={formData.rating.count}
                              onChange={handleRatingChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tags
                        </label>
                        <input
                          type="text"
                          name="tags"
                          onChange={handleTagsChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="e.g., electronics, premium, wireless"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Separate tags with commas
                        </p>
                      </div>
                    </div>

                    {/* Right Column - Pricing & Details */}
                    <div className="space-y-5">
                      <h4 className="font-semibold text-gray-700 border-b pb-2">
                        Pricing & Details
                      </h4>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price ($) <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500">$</span>
                            </div>
                            <input
                              type="number"
                              name="price"
                              value={formData.price}
                              onChange={handleInputChange}
                              className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Discount (%)
                          </label>
                          <div className="flex flex-col gap-2">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">%</span>
                              </div>
                              <input
                                type="number"
                                name="percentage"
                                value={formData.discount.percentage}
                                onChange={handleDiscountChange}
                                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="0"
                                min="0"
                                max="100"
                              />
                            </div>
                            <div className="relative">
                              <input
                                type="date"
                                name="expiresAt"
                                value={formData.discount.expiresAt}
                                onChange={handleDiscountChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Stock <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="0"
                            min="0"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Weight (kg)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              name="weight"
                              value={formData.weight}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="0.0"
                              min="0"
                              step="0.1"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500">kg</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Warranty
                          </label>
                          <div className="relative">
                            <select
                              name="warranty"
                              value={formData.warranty || ""}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all"
                            >
                              <option value="">Select Warranty</option>
                              <option value="no-warranty">No Warranty</option>
                              <option value="30-days">30 Days</option>
                              <option value="3-months">3 Months</option>
                              <option value="6-months">6 Months</option>
                              <option value="1-year">1 Year</option>
                              <option value="2-years">2 Years</option>
                              <option value="lifetime">Lifetime</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                              <FaSort />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                          </label>
                          <div className="relative">
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="out-of-stock">Out of Stock</option>
                              <option value="discontinued">Discontinued</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                              <FaSort />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dimensions (L × W × H)
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="relative">
                            <input
                              type="number"
                              name="length"
                              value={formData.dimensions?.length || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  dimensions: {
                                    ...formData.dimensions,
                                    length: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Length"
                              min="0"
                              step="0.1"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 text-xs">cm</span>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              name="width"
                              value={formData.dimensions?.width || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  dimensions: {
                                    ...formData.dimensions,
                                    width: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Width"
                              min="0"
                              step="0.1"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 text-xs">cm</span>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              name="height"
                              value={formData.dimensions?.height || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  dimensions: {
                                    ...formData.dimensions,
                                    height: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Height"
                              min="0"
                              step="0.1"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 text-xs">cm</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Describe the product features and specifications..."
                          required
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Image
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FaPlus className="w-8 h-8 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                Click to upload image
                              </p>
                              <p className="text-xs text-gray-500">
                                SVG, PNG, JPG or GIF (MAX. 5MB)
                              </p>
                            </div>
                            <input type="file" className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t border-gray-100 bg-gray-50">
                  <div className="text-sm text-gray-500">
                    Fields marked with <span className="text-red-500">*</span>{" "}
                    are required
                  </div>
                  <div className="flex justify-end pt-4 border-t">
                    <button
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg mr-3 transition-colors"
                      onClick={() => {
                        setIsModalOpen(false);
                        setEditingProduct(null);
                        // Reset form when closing modal
                        setFormData({
                          name: "",
                          brand: "",
                          category: "laptops",
                          price: "",
                          description: "",
                          tags: [],
                          rating: {
                            value: "",
                            count: "",
                          },
                          stock: "",
                          discount: {
                            percentage: 0,
                            expiresAt: "",
                          },
                          status: "active",
                          weight: 0,
                          dimensions: {
                            length: 0,
                            width: 0,
                            height: 0,
                          },
                          warranty: "",
                        });
                      }}
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {editingProduct ? "আপডেট করুন" : "যোগ করুন"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

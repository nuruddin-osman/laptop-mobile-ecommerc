import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import useProducts from "../../components/FetchProducts";

const Products = () => {
  const { category } = useParams();
  const [showFilters, setShowFilters] = useState(false);

  const { products, loading, error, filters, updateFilters, refetch } =
    useProducts({
      categoryFilter: category || "all",
      sortBy: "newest",
    });
  const categories = [...new Set(products.map((item) => item.category))];
  const brands = [...new Set(products.map((item) => item.brand))];

  const handleSearch = (searchTerm) => {
    updateFilters({ searchTerm });
  };
  const handleBrand = (brandValue) => {
    updateFilters({ brandFilter: brandValue });
  };
  const handlePrice = (priceValue) => {
    updateFilters({ priceRange: priceValue });
  };

  const handleCategoryChange = (categoryValue) => {
    updateFilters({ categoryFilter: categoryValue });
  };
  const handleRatingSort = (ratingValue) => {
    updateFilters({ sortBy: ratingValue });
  };

  // Reset all filters
  const handleResetFilters = () => {
    updateFilters({
      searchTerm: "",
      categoryFilter: "all",
      brandFilter: "all",
      priceRange: "all",
      sortBy: "newest",
      sortOrder: "desc",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {category
          ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
          : "All Products"}
      </h1>

      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar - Hidden on mobile by default */}
        <div
          className={`md:w-1/4 mb-6 md:mb-0 md:pr-6 ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <button
                onClick={handleResetFilters}
                className="text-sm text-white hover:bg-amber-700 bg-red-600 px-3 py-1.5 rounded-md cursor-pointer"
              >
                Filter Reset
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Category</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="category"
                    className="mr-2"
                    checked={filters.categoryFilter === "all"}
                    onChange={() => handleCategoryChange("all")}
                  />
                  All Products
                </label>
                {categories?.map((item) => (
                  <label key={item} className="flex items-center capitalize">
                    <input
                      type="checkbox"
                      name="category"
                      className="mr-2"
                      checked={filters.categoryFilter === item}
                      onChange={() => handleCategoryChange(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="space-y-2">
                {[
                  { value: "all", label: "All Prices" },
                  { value: "0-500", label: "Under $500" },
                  { value: "500-1000", label: "$500 - $1000" },
                  { value: "1000-1500", label: "$1000 - $1500" },
                  { value: "1500+", label: "Over $1500" },
                ].map((price) => (
                  <label key={price.value} className="flex items-center">
                    <input
                      type="checkbox"
                      name="price"
                      className="mr-2"
                      checked={filters.priceRange === price.value}
                      onChange={() => handlePrice(price.value)}
                    />
                    {price.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Brand</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="brand"
                    className="mr-2"
                    checked={filters.brandFilter === "all"}
                    onChange={() => handleBrand("all")}
                  />
                  All Brand
                </label>
                {brands?.map((item) => (
                  <label key={item} className="flex items-center">
                    <input
                      type="checkbox"
                      name="brand"
                      className="mr-2"
                      checked={filters.brandFilter === item}
                      onChange={() => handleBrand(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{products.length} products found</p>
            <button
              className="md:hidden flex items-center bg-blue-600 text-white py-2 px-4 rounded-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" />
              Filters
            </button>

            <select
              value={filters.sortBy}
              onChange={(e) => handleRatingSort(e.target.value)}
              className="hidden md:block bg-white border border-gray-300 rounded-md py-2 px-4"
            >
              <option value="all">Sort by: All</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating-high">Rating: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

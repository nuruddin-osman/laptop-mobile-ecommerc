// hooks/useProducts.js
import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    searchTerm: "",
    categoryFilter: "all",
    statusFilter: "all",
    brandFilter: "all",
    priceRange: "all",
    sortBy: "newest",
    sortOrder: "desc",
    ...initialFilters,
  });

  const BASE_URL_TOW = `${import.meta.env.VITE_API_URL}/api/dashboard/product`;

  const fetchProducts = async (customFilters = {}) => {
    const currentFilters = { ...filters, ...customFilters };

    try {
      setLoading(true);
      setError(null);

      let minPrice, maxPrice;
      switch (currentFilters.priceRange) {
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
      let backendSortOrder = currentFilters.sortOrder;

      switch (currentFilters.sortBy) {
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
        case "rating-high":
          backendSortBy = "rating";
          backendSortOrder = "desc";
          break;
        default:
          backendSortBy = "createdAt";
      }

      const response = await axios.get(`${BASE_URL_TOW}`, {
        params: {
          search: currentFilters.searchTerm,
          category:
            currentFilters.categoryFilter !== "all"
              ? currentFilters.categoryFilter
              : undefined,
          status:
            currentFilters.statusFilter !== "all"
              ? currentFilters.statusFilter
              : undefined,
          brand:
            currentFilters.brandFilter !== "all"
              ? currentFilters.brandFilter
              : undefined,
          minPrice: minPrice,
          maxPrice: maxPrice,
          sortBy: backendSortBy,
          sortOrder: backendSortOrder,
        },
      });

      if (response.data) {
        setProducts(response.data.data);
      }
    } catch (error) {
      setError(error.message);
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update filters and refetch
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Debounced fetch on filter changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [
    filters.searchTerm,
    filters.categoryFilter,
    filters.statusFilter,
    filters.brandFilter,
    filters.priceRange,
    filters.sortBy,
    filters.sortOrder,
  ]);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    filters,
    updateFilters,
    refetch: fetchProducts,
  };
};

export default useProducts;

import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Laptop_01 from "../../assets/images/laptop/laptop-img01.png";
import Laptop_02 from "../../assets/images/laptop/laptop-img02.png";
import Laptop_03 from "../../assets/images/laptop/laptop-img03.png";
import Laptop_04 from "../../assets/images/laptop/laptop-img04.png";
import laptop_banner_01 from "../../assets/images/laptop/laptop_banner_01.jpg";
import laptop_banner_02 from "../../assets/images/laptop/laptop_banner_02.jpg";
import laptop_banner_03 from "../../assets/images/laptop/laptop_banner_03.jpg";

// Import Swiper styles and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [sortOrder, setSortOrder] = useState("desc");
  const [priceRange, setPriceRange] = useState("all");

  const BASE_URL_TOW =
    "https://laptop-mobile-ecommerc.onrender.com/api/dashboard/product";

  const productSlice = products.slice(0, 4);

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

      const response = await axios.get(`${BASE_URL_TOW}`, {
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
      });
      if (response.data) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
  // Sample products data - in real app, this would come from API
  const featuredProducts = [
    {
      id: 1,
      name: "MacBook Pro 16",
      price: 2399,
      rating: 4.5,
      reviewCount: 132,
      description: "Powerful laptop for professionals with M2 Pro chip",
      image: Laptop_01,
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      price: 999,
      rating: 4.8,
      reviewCount: 245,
      description: "Latest iPhone with Dynamic Island and 48MP camera",
      image: Laptop_02,
    },
    {
      id: 3,
      name: "Dell XPS 13",
      price: 1299,
      rating: 4.3,
      reviewCount: 87,
      description: "Ultra-thin laptop with InfinityEdge display",
      image: Laptop_03,
    },
    {
      id: 4,
      name: "Samsung Galaxy S23",
      price: 899,
      rating: 4.6,
      reviewCount: 156,
      description: "Android flagship with powerful camera system",
      image: Laptop_04,
    },
  ];

  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      title: "Latest Tech Gadgets",
      subtitle: "Discover the newest technology at amazing prices",
      image: laptop_banner_01,
      buttonText: "Shop Now",
      buttonLink: "/products",
      textColor: "text-white",
      overlay: "bg-black/30",
    },
    {
      id: 2,
      title: "Summer Sale Up to 30% Off",
      subtitle: "Special discounts on laptops and mobile phones",
      image: laptop_banner_02,
      buttonText: "View Offers",
      buttonLink: "/products?discount=true",
      textColor: "text-white",
      overlay: "bg-black/30",
    },
    {
      id: 3,
      title: "Premium Quality Laptops",
      subtitle: "Experience the power of next-generation computing",
      image: laptop_banner_03,
      buttonText: "Explore Laptops",
      buttonLink: "/products/laptops",
      textColor: "text-white",
      overlay: "bg-black/30",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Swiper Slider */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 500000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          effect={"fade"}
          fadeEffect={{
            crossFade: true,
          }}
          onInit={(swiper) => {
            // when single slide then navigation disable
            if (swiper.slides.length <= 1) {
              swiper.navigation.disable();
            }
          }}
          onSlideChange={(swiper) => {
            // Beginning  disable prev
            if (swiper.isBeginning) {
              swiper.navigation.prevEl.classList.add(
                "opacity-50",
                "pointer-events-none"
              );
            } else {
              swiper.navigation.prevEl.classList.remove(
                "opacity-50",
                "pointer-events-none"
              );
            }

            // End  disable next
            if (swiper.isEnd) {
              swiper.navigation.nextEl.classList.add(
                "opacity-50",
                "pointer-events-none"
              );
            } else {
              swiper.navigation.nextEl.classList.remove(
                "opacity-50",
                "pointer-events-none"
              );
            }
          }}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id} className="relative h-full">
              <div className={`absolute inset-0 ${slide.overlay} z-10`}></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-4 text-center">
                  <h1
                    className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${slide.textColor}`}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${slide.textColor}`}
                  >
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.buttonLink}
                    className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* custom buttons */}
          <div
            className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 
                      flex items-center justify-center w-10 h-10 sm:w-6 sm:h-6 
                      rounded-full shadow cursor-pointer z-50"
          >
            <FaAngleLeft className="!w-8 !h-8 sm:!w-12 sm:!h-12 text-white" />
          </div>
          <div
            className="custom-next absolute top-1/2 right-2 -translate-y-1/2 
                      flex items-center justify-center w-10 h-10 sm:w-6 sm:h-6 
                      rounded-full shadow cursor-pointer z-50"
          >
            <FaAngleRight className="!w-8 !h-8 sm:w-!12 sm:!h-12 text-white" />
          </div>
        </Swiper>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productSlice.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Browse Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/products/laptops" className="relative group">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://via.placeholder.com/600x300?text=Laptops"
                  alt="Laptops"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-3xl text-white font-bold">Laptops</h3>
                </div>
              </div>
            </Link>
            <Link to="/products/mobiles" className="relative group">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://via.placeholder.com/600x300?text=Mobiles"
                  alt="Mobiles"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-3xl text-white font-bold">Mobiles</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

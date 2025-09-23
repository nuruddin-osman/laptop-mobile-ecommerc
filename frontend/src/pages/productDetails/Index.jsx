import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaShoppingCart, FaHeart, FaShare } from "react-icons/fa";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const BASE_URL = "https://laptop-mobile-ecommerc.onrender.com";
  const BASE_URL_TOW =
    "https://laptop-mobile-ecommerc.onrender.com/api/dashboard/product";

  const findProducts = allProducts.filter(
    (item) => item.category === product.category && item._id !== product._id
  );

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL_TOW}/${id}`);
      if (response.data) {
        setProduct(response.data.data);
      } else {
        alert("Product fectch is not working");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL_TOW}`);
      if (response.data) {
        setAllProducts(response.data.data);
      } else {
        alert("Product fectch is not working");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchAllProducts();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={
                product?.image?.[0]?.url &&
                `${BASE_URL}${product.image[0]?.url}`
              }
              alt={product?.images?.[0]?.alt || product?.name || "No Image"}
              className="w-full h-96 object-contain rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {/* {product.images.map((image, index) => (
              <button
                key={index}
                className={`border-2 rounded-lg overflow-hidden ${
                  selectedImage === index
                    ? "border-blue-600"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))} */}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < product?.rating?.value && product.rating.value
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600">
              ({product?.rating?.count && product.rating.count} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-blue-600 mb-6">
            ${product.price}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Specifications</h3>
            <ul className="list-disc list-inside text-gray-700">
              {/* {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium">{key}:</span> {value}
                </li>
              ))} */}
            </ul>
          </div>

          <div className="flex items-center mb-6">
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${
                product.stock ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span>{product.stock ? "In Stock" : "Out of Stock"}</span>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            {/* <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="px-3 py-2 text-gray-600"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                className="px-3 py-2 text-gray-600"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div> */}

            <button
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!product.stock}
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>

            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100">
              <FaHeart />
            </button>

            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-100">
              <FaShare />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {findProducts.map((item) => (
            <Link to={`/product/${item._id}`} className="block" key={item._id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="">
                  <img
                    src={
                      item?.image?.[0]?.url &&
                      `${BASE_URL}${item.image[0]?.url}`
                    }
                    alt={item?.images?.[0]?.alt || item?.name || "No Image"}
                    className="w-full h-40 object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={14}
                          className={
                            i < product?.rating?.value && product.rating.value
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    ${item.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

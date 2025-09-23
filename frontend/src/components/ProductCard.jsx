import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../featurs/slice/cartSlice";

const ProductCard = ({ product }) => {
  const BASE_URL = "https://laptop-mobile-ecommerc.onrender.com";

  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product._id}`}>
        <img
          src={`${BASE_URL}${product.image[0]?.url}`}
          alt={product.image[0]?.alt}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < product.rating.value ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-gray-600 ml-2">({product.rating.count})</span>
        </div>
        <p className="text-gray-600 mb-4">
          {product.description.substring(0, 60)}...
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-[#f57224] text-white py-2 px-4 rounded-full flex items-center hover:bg-[#d0611e] transition-colors cursor-pointer"
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

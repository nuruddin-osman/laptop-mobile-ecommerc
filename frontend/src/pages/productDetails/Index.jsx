import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaShoppingCart, FaHeart, FaShare } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Sample product data - in real app, this would come from API based on id
  const product = {
    id: 1,
    name: "MacBook Pro 16",
    price: 2399,
    rating: 4.5,
    reviewCount: 132,
    description:
      "The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro or M2 Max chip — the first ever designed for pro workflows — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, all the ports you need, and pro camera and audio. It's a notebook without equal.",
    images: [
      "https://via.placeholder.com/600x400?text=MacBook+Pro+Front",
      "https://via.placeholder.com/600x400?text=MacBook+Pro+Side",
      "https://via.placeholder.com/600x400?text=MacBook+Pro+Back",
      "https://via.placeholder.com/600x400?text=MacBook+Pro+Open",
    ],
    specifications: {
      display: "16.2-inch Liquid Retina XDR display",
      chip: "Apple M2 Pro or M2 Max chip",
      memory: "Up to 96GB unified memory",
      storage: "Up to 8TB SSD storage",
      battery: "Up to 22 hours battery life",
      camera: "1080p FaceTime HD camera",
      ports:
        "HDMI port, SDXC card slot, three Thunderbolt 4 ports, MagSafe 3 port",
    },
    category: "laptops",
    brand: "Apple",
    inStock: true,
  };

  const relatedProducts = [
    {
      id: 2,
      name: "MacBook Air M2",
      price: 1199,
      rating: 4.7,
      image: "https://via.placeholder.com/300x200?text=MacBook+Air",
    },
    {
      id: 3,
      name: "Apple Magic Mouse",
      price: 99,
      rating: 4.1,
      image: "https://via.placeholder.com/300x200?text=Magic+Mouse",
    },
    {
      id: 4,
      name: "USB-C to MagSafe Cable",
      price: 49,
      rating: 4.3,
      image: "https://via.placeholder.com/300x200?text=MagSafe+Cable",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
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
            ))}
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
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-blue-600 mb-6">
            ${product.price}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Specifications</h3>
            <ul className="list-disc list-inside text-gray-700">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium">{key}:</span> {value}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center mb-6">
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${
                product.inStock ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-md">
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
            </div>

            <button
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!product.inStock}
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
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="w-full h-40 object-contain"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(relatedProduct.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-lg font-bold text-blue-600">
                  ${relatedProduct.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

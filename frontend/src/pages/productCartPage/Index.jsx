import React, { use } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  removeFromCart,
} from "../../featurs/slice/cartSlice";

const Cart = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Start shopping to add items to your cart
          </p>
          <Link
            to="/products"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 border-b border-gray-200 p-4 font-semibold">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-12 gap-4 border-b border-gray-200 p-4 items-center"
                >
                  <div className="col-span-12 md:col-span-6 flex items-center">
                    <img
                      src={`${BASE_URL}${item.image[0]?.url}`}
                      alt={item.image[0]?.alt}
                      className="w-16 h-16 object-contain mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-red-500 flex items-center text-sm mt-1 cursor-pointer"
                      >
                        <FaTrash className="mr-1" size={12} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-2 text-center">
                    <span className="md:hidden font-semibold mr-2">Price:</span>
                    ${item.price}
                  </div>

                  <div className="col-span-4 md:col-span-2 flex justify-center">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        className="px-2 py-1 text-gray-600 cursor-pointer"
                        onClick={() => dispatch(decreaseQty(item._id))}
                      >
                        <FaMinus size={16} />
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        className="px-2 py-1 text-gray-600 cursor-pointer"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        <FaPlus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-2 text-center">
                    <span className="md:hidden font-semibold mr-2">Total:</span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link
                to="/products"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-md hover:bg-blue-700 font-semibold"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

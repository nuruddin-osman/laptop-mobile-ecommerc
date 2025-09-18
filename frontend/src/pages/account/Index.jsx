import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaHistory,
  FaMapMarkerAlt,
  FaLock,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    profileImage: "https://via.placeholder.com/150?text=JD",
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home Address",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work Address",
      street: "456 Office Blvd",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      isDefault: false,
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: "ORD-12345",
      date: "2023-05-15",
      status: "Delivered",
      items: [
        { name: "MacBook Pro 16", quantity: 1, price: 2399 },
        { name: "USB-C Cable", quantity: 2, price: 29 },
      ],
      total: 2457,
    },
    {
      id: "ORD-12346",
      date: "2023-06-20",
      status: "Processing",
      items: [{ name: "iPhone 14 Pro", quantity: 1, price: 999 }],
      total: 999,
    },
  ]);

  const handleEditProfile = () => {
    // Edit profile logic here
    alert("Edit profile functionality would open a form");
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center mb-6">
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-gray-600">{userData.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                </div>

                <button
                  onClick={handleEditProfile}
                  className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Security</h3>
                <button className="w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-100 flex items-center justify-between mb-4">
                  <span>Change Password</span>
                  <FaLock />
                </button>

                <button className="w-full bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-100 flex items-center justify-between">
                  <span>Two-Factor Authentication</span>
                  <span className="text-sm text-gray-500">Disabled</span>
                </button>
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Order History</h2>

            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  You haven't placed any orders yet.
                </p>
                <Link
                  to="/products"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          Placed on {order.date}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-b border-gray-200 py-4 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between mb-2">
                          <p>
                            {item.quantity} x {item.name}
                          </p>
                          <p>${item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="font-semibold">Total: ${order.total}</p>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "addresses":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Saved Addresses</h2>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Add New Address
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-8">
                <FaMapMarkerAlt className="text-gray-400 text-4xl mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  You haven't saved any addresses yet.
                </p>
                <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                  Add Address
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 relative ${
                      address.isDefault
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    {address.isDefault && (
                      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                    <h3 className="font-semibold mb-2">{address.name}</h3>
                    <p className="text-gray-600 mb-2">{address.street}</p>
                    <p className="text-gray-600">
                      {address.city}, {address.state} {address.zipCode}
                    </p>

                    <div className="flex mt-4 space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefaultAddress(address.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                        >
                          Set as Default
                        </button>
                      )}
                      {!address.isDefault && (
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-600 hover:text-red-800 text-sm flex items-center"
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            <div className="flex items-center mb-6 p-2">
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div>
                <p className="font-semibold">{userData.name}</p>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-3 rounded-md text-left ${
                  activeTab === "profile"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FaUser className="mr-3" />
                Profile Information
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center px-4 py-3 rounded-md text-left ${
                  activeTab === "orders"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FaHistory className="mr-3" />
                Order History
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center px-4 py-3 rounded-md text-left ${
                  activeTab === "addresses"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FaMapMarkerAlt className="mr-3" />
                Addresses
              </button>

              <button className="w-full flex items-center px-4 py-3 rounded-md text-left text-gray-600 hover:bg-gray-100">
                <FaLock className="mr-3" />
                Change Password
              </button>

              <hr className="my-2" />

              <button className="w-full flex items-center px-4 py-3 rounded-md text-left text-red-600 hover:bg-red-50">
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default AccountPage;

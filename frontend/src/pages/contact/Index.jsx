import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";
import FaqAccordion from "../../components/FaqAccordion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert("আপনার বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            আপনার কোন প্রশ্ন বা মতামত থাকলে আমরা সর্বদা আপনার কাছ থেকে শুনতে
            আগ্রহী
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaPhone className="text-blue-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">ফোন</h3>
              <p className="text-gray-600">+৮৮০ ১৭০০-১২৩৪৫৬</p>
              <p className="text-gray-600">+৮৮০ ১৮১৯-৯৮৭৬৫৪</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <FaEnvelope className="text-green-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">ইমেইল</h3>
              <p className="text-gray-600">info@techbazar.com</p>
              <p className="text-gray-600">support@techbazar.com</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <FaMapMarkerAlt className="text-purple-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">ঠিকানা</h3>
              <p className="text-gray-600">১২৩/ক বিজয়নগর</p>
              <p className="text-gray-600">ঢাকা-১২১২, বাংলাদেশ</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 p-4 rounded-full">
                  <FaClock className="text-yellow-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">কাজের সময়</h3>
              <p className="text-gray-600">শনি-বৃহস্পতি: সকাল ৯টা - রাত ১০টা</p>
              <p className="text-gray-600">শুক্রবার: বন্ধ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">আমাদেরকে বার্তা পাঠান</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ইমেইল ঠিকানা *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    বিষয় *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    আপনার বার্তা *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FaPaperPlane className="mr-2" />
                  বার্তা পাঠান
                </button>
              </form>
            </div>

            {/* Map and Social Media */}
            <div>
              <div className="bg-gray-200 h-80 rounded-lg mb-8 overflow-hidden">
                {/* Google Map Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116834.00977741619!2d90.349285767855!3d23.78077774449029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1642165152998!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TechBazar Office Location"
                ></iframe>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">
                  আমাদের সাথে সংযুক্ত থাকুন
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <FaFacebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors"
                  >
                    <FaTwitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqAccordion />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">আরও তথ্যের প্রয়োজন?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            আমাদের গ্রাহক সেবা দল ২৪/৭ আপনার প্রশ্নের উত্তর দিতে প্রস্তুত
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="tel:+8801700123456"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <FaPhone className="mr-2" />
              এখনই কল করুন
            </a>
            <a
              href="mailto:support@techbazar.com"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
            >
              <FaEnvelope className="mr-2" />
              ইমেইল করুন
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

import React from "react";
import { Link } from "react-router-dom";
import {
  FaShippingFast,
  FaHeadset,
  FaShieldAlt,
  FaRecycle,
  FaAward,
  FaUsers,
} from "react-icons/fa";

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "রিয়াদ হাসান",
      position: "প্রধান নির্বাহী কর্মকর্তা",
      image: "https://via.placeholder.com/250x250?text=রিয়াদ",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: 2,
      name: "আনিকা ইসলাম",
      position: "বিপণন প্রধান",
      image: "https://via.placeholder.com/250x250?text=আনিকা",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: 3,
      name: "সজল আহমেদ",
      position: "প্রযুক্তি পরিচালক",
      image: "https://via.placeholder.com/250x250?text=সজল",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: 4,
      name: "তানহা রহমান",
      position: "গ্রাহক সেবা ব্যবস্থাপক",
      image: "https://via.placeholder.com/250x250?text=তানহা",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
  ];

  const stats = [
    { number: "10,000+", label: "সন্তুষ্ট গ্রাহক" },
    { number: "5,000+", label: "প্রোডাক্ট" },
    { number: "15+", label: "বছরের অভিজ্ঞতা" },
    { number: "98%", label: "সন্তুষ্টির হার" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About NuruddinTech
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            বাংলাদেশের অন্যতম সেরা ইলেকট্রনিক্স পণ্যের অনলাইন Marketplace
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">আমাদের গল্প</h2>
              <p className="text-gray-700 mb-4">
                ২০০৮ সালে যাত্রা শুরু করে, টেকবাজার বাংলাদেশের শীর্ষস্থানীয়
                ইলেকট্রনিক্স রিটেইলারে পরিণত হয়েছে। আমরা বিশ্বাস করি যে সবাই
                deserves মানসম্মত প্রযুক্তি পণ্য ব্যবহারের সুযোগ।
              </p>
              <p className="text-gray-700 mb-4">
                আমাদের লক্ষ্য হল গ্রাহকদের জন্য সেরা quality এর ল্যাপটপ, মোবাইল
                এবং অন্যান্য ইলেকট্রনিক্স পণ্য সাশ্রয়ী মূল্যে পৌঁছে দেওয়া।
                আমরা শুধু পণ্য বিক্রি করি না, আমরা peace of mind offer করি।
              </p>
              <p className="text-gray-700">
                আমাদের dedicated team সবসময় ready থাকে আপনার needs বুঝতে এবং
                সেরা solution দিতে। আমাদের সাথে আপনার Tech journey হবে
                effortless এবং enjoyable।
              </p>
            </div>
            <div className="order-first lg:order-last">
              <img
                src="https://via.placeholder.com/600x400?text=Tech+Bazaar+Office"
                alt="TechBazar Office"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">আমাদের মিশন ও ভিশন</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              আমরা প্রতিশ্রুতিবদ্ধ বাংলাদেশের প্রতিটি মানুষকে quality টেকনোলজি
              পণ্য সহজলভ্য করতে
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                আমাদের মিশন
              </h3>
              <p className="text-gray-700">
                বাংলাদেশের প্রতিটি মানুষকে বিশ্বস্ততার সাথে quality ইলেকট্রনিক্স
                পণ্য সরবরাহ করা, competitive price এ এবং exceptional customer
                service এর মাধ্যমে। আমরা চাই technology হবে accessible সকলের
                জন্য।
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">
                আমাদের ভিশন
              </h3>
              <p className="text-gray-700">
                বাংলাদেশের number one technology retailer হওয়া, যেখানে
                customers trust করতে পারে product quality, pricing এবং service
                এর উপর। আমরা aim করি technological advancement এর মাধ্যমে দেশের
                digital transformation এ contribute করতে।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-4">
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">আমাদের মূল্যবোধ</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              আমরা যা বিশ্বাস করি এবং যা আমাদেরকে আলাদা করে তোলে
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <FaShieldAlt className="text-blue-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">বিশ্বস্ততা</h3>
              <p className="text-gray-600">
                আমরা authenticity এবং reliability guarantee করি আমাদের প্রতিটি
                product এর জন্য
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <FaHeadset className="text-blue-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">গ্রাহক সেবা</h3>
              <p className="text-gray-600">
                ২৪/৭ support এবং expert guidance আমাদের customer service এর
                hallmark
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <FaShippingFast className="text-blue-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">দ্রুত ডেলিভারি</h3>
              <p className="text-gray-600">
                সারাদেশে fastest delivery service যাতে আপনি সময়মত পেয়ে যান
                আপনার কাঙ্ক্ষিত পণ্য
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <FaRecycle className="text-blue-600 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">টেকসইতা</h3>
              <p className="text-gray-600">
                Environmental responsibility এবং sustainable practices আমাদের
                operation এর integral part
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">আমাদের টিম</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              আমাদের দক্ষ এবং অভিজ্ঞ team members যারা আপনাকে সেরা service দিতে
              committed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md text-center transition-transform hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.position}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.social.facebook}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-gray-600 hover:text-blue-400"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="text-gray-600 hover:text-blue-700"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">আমাদের সাথে যোগ দিন</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            হাজারো সন্তুষ্ট গ্রাহকের অংশ হয়ে উঠুন এবং experience করুন
            বিশ্বস্ততার shopping experience
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              এখনই শপিং করুন
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              যোগাযোগ করুন
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "আমি কিভাবে অর্ডার করতে পারি?",
      answer:
        "আপনি আমাদের ওয়েবসাইট থেকে সরাসরি পণ্য নির্বাচন করে কার্টে যোগ করে চেকআউট সম্পন্ন করতে পারেন। অথবা আমাদের হেল্পলাইনে ফোন করে直接 অর্ডার দিতে পারেন।",
    },
    {
      question: "ডেলিভারি সময় কত?",
      answer:
        "ঢাকা শহরের মধ্যে ১-২ কার্যদিবস, এবং বিভাগীয় শহরগুলোতে ২-৪ কার্যদিবস সময় লাগে। রিমোট area গুলোতে ৫-৭ কার্যদিবস সময় লাগতে পারে।",
    },
    {
      question: "প্রোডাক্ট রিটার্ন的政策是什么?",
      answer:
        "আপনি পণ্য গ্রহণের ৭ দিনের মধ্যে রিটার্ন করতে পারবেন। পণ্য অক্ষত এবং original packaging এ থাকতে হবে। কিছু ইলেকট্রনিক পণ্যের আলাদা রিটার্ন政策 থাকতে পারে।",
    },
    {
      question: "পেমেন্ট有哪些方式?",
      answer:
        "আমরা cash on delivery, bKash, Nagad, Rocket, bank transfer এবং credit/debit cards等多种付款方式 গ্রহণ করি। সব পেমেন্ট method সম্পূর্ণ secure.",
    },
    {
      question: "ওয়ারেন্টি কীভাবে claim করব?",
      answer:
        "ওয়ারেন্টি claim করতে আমাদের হেল্পলাইনে যোগাযোগ করুন অথবা warranty card সহ nearest service center এ যোগাযোগ করুন। প্রোডাক্টের receipt সংরক্ষণ করুন।",
    },
    {
      question: "আমি কি showroom থেকে পণ্য কিনতে পারি?",
      answer:
        "হ্যাঁ, আমাদের ঢাকা এবং চট্টগ্রামে showroom আছে। আপনি directly showroom থেকে পণ্য কিনতে পারেন এবং physically check করতে পারেন। showroom এর ঠিকানা contact information section এ পাবেন।",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          সচরাচর জিজ্ঞাসিত প্রশ্ন
        </h2>

        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-4">
                <button
                  className={`flex justify-between items-center w-full p-6 text-left bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors ${
                    activeIndex === index ? "bg-blue-50" : ""
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <span className="ml-4 flex-shrink-0">
                    {activeIndex === index ? (
                      <FaMinus className="text-blue-600" />
                    ) : (
                      <FaPlus className="text-blue-600" />
                    )}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 bg-white border-t border-gray-200 rounded-b-lg">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;

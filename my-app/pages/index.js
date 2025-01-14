import { useState } from "react";
import Filters from "@/components/Filters";
import { fetchCategories } from "../api/Api";
import CategoryCard from "../components/CategoryCard";
import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa";

export async function getStaticProps() {
  try {
    const categories = await fetchCategories();
    return {
      props: {
        categories: categories || [], // Ensure categories is always an array
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      props: {
        categories: [], // Return empty categories in case of an error
      },
    };
  }
}

export default function Home({ categories }) {
  const [filteredCategories, setFilteredCategories] = useState(categories);

  // Filter change handler
  const handleFilterChange = (selectedCategories) => {
    console.log("Selected categories:", selectedCategories);

    if (selectedCategories.length === 0) {
      // If no categories are selected, show all categories
      setFilteredCategories(categories);
    } else {
      // Filter categories based on selected categories
      const filtered = categories.filter(
        (category) => selectedCategories.includes(category.toLowerCase()) // Match category name
      );
      setFilteredCategories(filtered);
    }
  };

  if (!Array.isArray(categories) || categories.length === 0) {
    return <div>Error: categories data is not available.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Responsive Banner */}
      <div className="relative w-full">
        <Image
          src="/images/image2.webp"
          alt="Shop the best categories"
          width={500}
          height={450}
          className="w-full h-auto max-h-[450px] object-fit"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <h1
            className="text-white text-3xl sm:text-4xl font-bold text-center"
            data-aos="zoom-in"
          >
            Shop the Best Categories
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div className="my-6 px-4 text-center">
        <Filters onFilterChange={handleFilterChange} />
      </div>

      {/* Categories Section */}
      <h2 className="text-2xl font-bold text-center my-6">Browse Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCategories.map((category, index) => (
          <div
            key={category + index}
            className="transition-transform duration-500 transform hover:scale-105"
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>

      {/* Map and Contact Form */}
      <div className="flex flex-col lg:flex-row gap-8 my-12">
        {/* Google Maps Section */}
        <div className="flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15125.855373426746!2d73.736006!3d18.5981955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1736761174028!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-64 sm:h-80 lg:h-[450px] rounded-lg shadow-lg"
          ></iframe>
        </div>

        {/* Contact Form Section */}
        <div className="flex-1 max-w-lg mx-auto bg-white rounded-lg shadow-lg p-12 sm:p-6 ">
          <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-700 transition flex items-center justify-center space-x-2"
            >
              <span>Send Message</span>
              <FaLocationArrow />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

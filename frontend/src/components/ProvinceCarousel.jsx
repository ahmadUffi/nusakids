import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ApiService } from "../services/api";

export default function ProvinceCarousel() {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getAllDatas();
        setProvinces(data || []);
      } catch (error) {
        console.error("Gagal mengambil data provinsi:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3) % provinces.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 + provinces.length) % provinces.length);
  };

  const currentProvinces = provinces.slice(currentIndex, currentIndex + 3);

  if (currentProvinces.length < 3 && provinces.length > 0) {
    const remaining = 3 - currentProvinces.length;
    currentProvinces.push(...provinces.slice(0, remaining));
  }

  if (loading) {
    return (
      <div className="w-full py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat provinsi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            Jelajahi 38 Provinsi Indonesia
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Temukan keragaman budaya, tradisi, dan kearifan lokal dari setiap
            penjuru Nusantara
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:bg-blue-50"
          >
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:bg-blue-50"
          >
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Books Container */}
          <div className="flex justify-center items-center gap-8 py-8">
            <AnimatePresence mode="wait">
              {currentProvinces.map((province, index) => (
                <motion.div
                  key={`${province.id}-${currentIndex}`}
                  initial={{ opacity: 0, y: 50, rotateY: -30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    scale: index === 1 ? 1.1 : 1,
                    zIndex: index === 1 ? 10 : 1,
                  }}
                  exit={{ opacity: 0, y: -50, rotateY: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Book Shape */}
                  <div className="relative w-48 h-64 mx-auto">
                    {/* Book Shadow */}
                    <div className="absolute inset-0 bg-gray-400 rounded-r-lg transform translate-x-2 translate-y-2 opacity-20"></div>

                    {/* Book Cover */}
                    <div className="relative w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-white transform group-hover:-translate-y-2 group-hover:shadow-3xl transition-all duration-300">
                      {/* Book Cover Image */}
                      <div className="absolute inset-0">
                        <img
                          src={province.url_image}
                          alt={province.nama_provinsi}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>

                      {/* Book Spine Effect */}
                      <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-black/20 to-transparent"></div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-lg mb-1 text-shadow">
                          {province.nama_provinsi}
                        </h3>
                        <p className="text-sm opacity-90 text-shadow">
                          Budaya Nusantara
                        </p>
                      </div>

                      {/* Bookmark */}
                      <div className="absolute top-0 right-4 w-8 h-12 bg-gradient-to-b from-red-500 to-red-600 transform -translate-y-2 rounded-b-lg shadow-lg"></div>

                      {/* Page Lines */}
                      <div className="absolute top-16 left-6 right-6 space-y-2 opacity-20">
                        <div className="h-px bg-gray-600"></div>
                        <div className="h-px bg-gray-600"></div>
                        <div className="h-px bg-gray-600"></div>
                      </div>
                    </div>

                    {/* Book Title on Spine */}
                    <div className="absolute left-0 top-0 w-6 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-l-lg flex items-center justify-center">
                      <div className="text-white text-xs font-bold transform -rotate-90 whitespace-nowrap">
                        {province.nama_provinsi.length > 10
                          ? province.nama_provinsi.substring(0, 10) + "..."
                          : province.nama_provinsi}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect - Read Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/membaca/${province.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white rounded-full shadow-lg font-semibold text-blue-600 hover:bg-blue-50 transition-colors duration-300"
                      >
                        📖 Baca Sekarang
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(provinces.length / 3) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * 3)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / 3) === index
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              )
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link to="/membaca">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              Lihat Semua Provinsi
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

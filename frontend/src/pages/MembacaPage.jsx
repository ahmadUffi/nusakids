import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ApiService } from "../services/api";

const bookCategories = [
  { 
    id: "cerita-rakyat", 
    title: "Cerita Rakyat", 
    color: "from-emerald-500 to-teal-500",
    icon: "🏰",
    description: "Legenda dan dongeng dari seluruh Nusantara"
  },
  { 
    id: "budaya", 
    title: "Budaya Nusantara", 
    color: "from-purple-500 to-indigo-500",
    icon: "🎭",
    description: "Pelajari kebudayaan Indonesia yang kaya"
  },
  { 
    id: "sejarah", 
    title: "Sejarah Indonesia", 
    color: "from-amber-500 to-orange-500",
    icon: "📜",
    description: "Perjalanan sejarah bangsa Indonesia"
  },
  { 
    id: "pahlawan", 
    title: "Kisah Pahlawan", 
    color: "from-red-500 to-pink-500",
    icon: "⚔️",
    description: "Kisah heroik para pahlawan nasional"
  }
];

export default function MembacaPage() {
  const [provinces, setProvinces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const data = await ApiService.getProvinces();
      setProvinces(data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchBooks = async (category) => {
    setLoading(true);
    try {
      // Simulate fetching books for category
      const mockBooks = provinces.slice(0, 8).map((province, index) => ({
        id: `${category}-${province.id}`,
        title: `${bookCategories.find(cat => cat.id === category)?.title} ${province.name}`,
        province: province.name,
        author: "Tim NusaKids",
        pages: Math.floor(Math.random() * 50) + 20,
        description: `Jelajahi ${bookCategories.find(cat => cat.id === category)?.description.toLowerCase()} khususnya dari daerah ${province.name}`,
        coverColor: bookCategories.find(cat => cat.id === category)?.color || "from-blue-500 to-cyan-500",
        readTime: `${Math.floor(Math.random() * 15) + 5} menit`
      }));
      setBooks(mockBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchBooks(category.id);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeBookDetail = () => {
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6">
            ← Kembali ke Beranda
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            📚 Perpustakaan Digital NusaKids
          </motion.h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Jelajahi koleksi cerita, sejarah, dan budaya Indonesia yang dikemas dalam buku digital interaktif
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            /* Category Selection */
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Pilih Kategori Buku</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {bookCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleCategoryClick(category)}
                    className="group cursor-pointer"
                  >
                    <div className={`relative bg-gradient-to-br ${category.color} rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2`}>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-4xl">{category.icon}</div>
                        <h3 className="text-2xl font-bold">{category.title}</h3>
                      </div>
                      <p className="text-white/90 mb-4">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">Tersedia {Math.floor(Math.random() * 20) + 10} buku</span>
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          →
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Books Grid */
            <motion.div
              key="books"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-7xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedCategory.icon} {selectedCategory.title}
                  </h2>
                  <p className="text-gray-600">{selectedCategory.description}</p>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl hover:bg-white transition-colors shadow-lg"
                >
                  ← Kembali ke Kategori
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {books.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleBookClick(book)}
                      className="group cursor-pointer perspective-1000"
                    >
                      {/* Book Card with 3D Effect */}
                      <div className="relative w-full h-80 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-12">
                        {/* Book Cover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${book.coverColor} rounded-2xl shadow-2xl p-6 text-white flex flex-col justify-between backface-hidden`}>
                          <div>
                            <div className="text-2xl mb-2">{selectedCategory.icon}</div>
                            <h3 className="text-lg font-bold mb-2 line-clamp-3">{book.title}</h3>
                            <p className="text-white/80 text-sm mb-3">oleh {book.author}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-white/80">
                              <span>📄 {book.pages} halaman</span>
                              <span>⏱️ {book.readTime}</span>
                            </div>
                            <div className="bg-white/20 rounded-lg px-3 py-1 text-xs">
                              {book.province}
                            </div>
                          </div>
                        </div>

                        {/* Book Spine */}
                        <div className={`absolute top-0 right-0 w-4 h-full bg-gradient-to-b ${book.coverColor} opacity-70 rounded-r-2xl transform rotate-y-90 origin-right shadow-xl`}></div>
                      </div>

                      {/* Hover indicator */}
                      <div className="text-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm text-gray-600">Klik untuk membaca</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Book Detail Modal */}
        <AnimatePresence>
          {selectedBook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeBookDetail}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              >
                {/* Modal Header */}
                <div className={`bg-gradient-to-r ${selectedBook.coverColor} text-white p-8 relative`}>
                  <button
                    onClick={closeBookDetail}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    ✕
                  </button>
                  <div className="flex items-start space-x-6">
                    <div className="text-6xl">{selectedCategory.icon}</div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2">{selectedBook.title}</h2>
                      <p className="text-white/90 mb-1">oleh {selectedBook.author}</p>
                      <p className="text-white/80 text-sm">Provinsi {selectedBook.province}</p>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-2xl">
                      <div className="text-3xl mb-2">📄</div>
                      <p className="font-bold text-gray-800">{selectedBook.pages}</p>
                      <p className="text-sm text-gray-600">Halaman</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-2xl">
                      <div className="text-3xl mb-2">⏱️</div>
                      <p className="font-bold text-gray-800">{selectedBook.readTime}</p>
                      <p className="text-sm text-gray-600">Estimasi Baca</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-2xl">
                      <div className="text-3xl mb-2">🌟</div>
                      <p className="font-bold text-gray-800">4.8</p>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Deskripsi</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedBook.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <Link
                      to={`/membaca/${selectedBook.id}`}
                      className={`flex-1 bg-gradient-to-r ${selectedBook.coverColor} text-white text-center py-4 rounded-2xl font-bold hover:shadow-lg transition-all`}
                    >
                      📖 Mulai Membaca
                    </Link>
                    <button className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors">
                      💾 Simpan
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        .rotate-y-90 {
          transform: rotateY(90deg);
        }
        .origin-right {
          transform-origin: right;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

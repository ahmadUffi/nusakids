import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

// Sample Indonesian culture books data
const cultureBooks = [
  {
    id: "batik-indonesia",
    title: "Keajaiban Batik Indonesia",
    slug: "batik-indonesia",
    description:
      "Pelajari sejarah dan makna batik dari berbagai daerah di Indonesia",
    cover: "/images/batik-book.jpg",
    author: "Soekarno Hatta",
    pages: "120 halaman",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "tarian-tradisional",
    title: "Ragam Tarian Nusantara",
    slug: "tarian-tradisional",
    description:
      "Eksplorasi keindahan tarian tradisional dari Sabang sampai Merauke",
    cover: "/images/dance-book.jpg",
    author: "Dewi Sartika",
    pages: "98 halaman",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "kuliner-indonesia",
    title: "Cita Rasa Nusantara",
    slug: "kuliner-indonesia",
    description:
      "Jelajahi kekayaan kuliner tradisional Indonesia yang menggugah selera",
    cover: "/images/food-book.jpg",
    author: "Kartini Muljadi",
    pages: "156 halaman",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "rumah-adat",
    title: "Arsitektur Rumah Adat",
    slug: "rumah-adat",
    description:
      "Keunikan dan filosofi rumah adat dari berbagai suku di Indonesia",
    cover: "/images/house-book.jpg",
    author: "Diponegoro Ahmad",
    pages: "134 halaman",
    color: "from-green-500 to-teal-600",
  },
  {
    id: "musik-tradisional",
    title: "Harmoni Musik Tradisional",
    slug: "musik-tradisional",
    description: "Mengenal alat musik dan lagu daerah dari seluruh Indonesia",
    cover: "/images/music-book.jpg",
    author: "Cut Nyak Dhien",
    pages: "89 halaman",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "kerajinan-tangan",
    title: "Seni Kerajinan Nusantara",
    slug: "kerajinan-tangan",
    description:
      "Keterampilan dan keindahan kerajinan tangan tradisional Indonesia",
    cover: "/images/craft-book.jpg",
    author: "Raden Ajeng Kartini",
    pages: "145 halaman",
    color: "from-pink-500 to-purple-600",
  },
];

export default function MembacaPage() {
  const [hoveredBook, setHoveredBook] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6"
          >
            ← Kembali ke Beranda
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            📚 Buku Budaya Indonesia
          </motion.h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Jelajahi kekayaan budaya Indonesia melalui koleksi buku digital yang
            menarik dan edukatif
          </p>
        </div>

        {/* Books Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cultureBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group perspective-1000"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
              >
                <Link to={`/membaca/${book.slug}`}>
                  <div className="relative transform-style-preserve-3d transition-all duration-500 hover:scale-105">
                    {/* Book Cover */}
                    <div
                      className={`relative bg-gradient-to-br ${
                        book.color
                      } rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform ${
                        hoveredBook === book.id ? "rotate-y-12" : ""
                      }`}
                    >
                      {/* Book Spine Effect */}
                      <div className="absolute inset-y-0 left-0 w-2 bg-black/20 rounded-l-2xl"></div>

                      {/* Content */}
                      <div className="relative z-10 text-white">
                        <div className="flex justify-between items-start mb-4">
                          <div className="text-2xl">📖</div>
                          <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
                            {book.pages}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold mb-3 line-clamp-2">
                          {book.title}
                        </h3>

                        <p className="text-white/90 text-sm mb-4 line-clamp-3">
                          {book.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <p className="text-white/80">Oleh:</p>
                            <p className="font-medium">{book.author}</p>
                          </div>
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <span className="text-lg">→</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Book Pages Effect */}
                    <div
                      className={`absolute top-1 left-1 right-1 bottom-1 bg-white/50 rounded-2xl -z-10 transform ${
                        hoveredBook === book.id ? "translate-x-1" : ""
                      } transition-transform duration-300`}
                    ></div>
                    <div
                      className={`absolute top-2 left-2 right-2 bottom-2 bg-white/30 rounded-2xl -z-20 transform ${
                        hoveredBook === book.id ? "translate-x-2" : ""
                      } transition-transform duration-300`}
                    ></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .rotate-y-12 {
            transform: rotateY(12deg);
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </div>
  );
}

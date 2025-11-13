import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { ApiService } from "../services/api";

export default function BookReader() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bookContent, setBookContent] = useState([]);
  const [fontSize, setFontSize] = useState("text-base");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    fetchBookData();
  }, [id]);

  const fetchBookData = async () => {
    try {
      // Mock book data - in real app, fetch from API
      const mockBook = {
        id: id,
        title: "Cerita Rakyat Jawa Barat",
        author: "Tim NusaKids",
        pages: 25,
        coverColor: "from-emerald-500 to-teal-500",
        province: "Jawa Barat"
      };

      // Mock content - in real app, this would come from API
      const mockContent = Array.from({ length: 25 }, (_, index) => ({
        pageNumber: index + 1,
        title: index === 0 ? "Sangkuriang dan Tangkuban Perahu" : `Halaman ${index + 1}`,
        content: index === 0 
          ? `Pada zaman dahulu kala, di tanah Priangan, Jawa Barat, hiduplah seorang putri raja yang sangat cantik bernama Dayang Sumbi. Dia memiliki kesaktian dan selalu tampak muda.

Suatu hari, Dayang Sumbi sedang menenun di istana. Tanpa sengaja, peralatan tenunnya terjatuh ke tanah. Karena merasa malas untuk mengambilnya, dia berkata, "Siapa yang mau mengambilkan alat tenunku, jika laki-laki akan kujadikan suami, jika perempuan akan kujadikan saudara."

Ternyata yang mengambilkan adalah seekor anjing jantan bernama Tumang. Karena sudah berjanji, Dayang Sumbi terpaksa menikahi Tumang. Dari pernikahan itu, lahirlah seorang anak laki-laki yang diberi nama Sangkuriang.

Sangkuriang tumbuh menjadi anak yang kuat dan pemberani. Dia gemar berburu ke hutan bersama Tumang, tanpa mengetahui bahwa Tumang adalah ayahnya sendiri.`
          : `Ini adalah konten halaman ${index + 1} dari cerita Sangkuriang. Dalam halaman ini, kita akan melanjutkan petualangan Sangkuriang dan mengungkap lebih banyak tentang legenda Tangkuban Perahu yang terkenal di Jawa Barat.

${index % 2 === 0 
  ? "Sangkuriang semakin mahir dalam berburu. Setiap hari dia pergi ke hutan bersama Tumang untuk mencari binatang buruan. Namun, dia tidak pernah tahu siapa sebenarnya Tumang itu."
  : "Suatu hari, Sangkuriang tidak berhasil mendapatkan buruan apapun. Dia merasa kesal dan menyalahkan Tumang atas kegagalannya. Dalam kemarahannya, hal yang tak terduga pun terjadi."
}

Cerita ini mengajarkan kita tentang pentingnya kesabaran dan tidak mudah marah. Mari kita lanjutkan membaca untuk mengetahui apa yang terjadi selanjutnya.`
      }));

      setBook(mockBook);
      setBookContent(mockContent);
    } catch (error) {
      console.error("Error fetching book:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (currentPage < bookContent.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= bookContent.length) {
      setCurrentPage(pageNum);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat buku...</p>
        </div>
      </div>
    );
  }

  const currentContent = bookContent[currentPage - 1];

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gradient-to-br from-amber-50 via-white to-orange-50`}>
      {/* Header Controls */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/membaca" 
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Kembali ke Perpustakaan
              </Link>
              {book && (
                <div>
                  <h1 className="font-bold text-gray-800">{book.title}</h1>
                  <p className="text-sm text-gray-600">oleh {book.author}</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Page Navigation */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ←
                </button>
                <span className="text-sm text-gray-600 min-w-[80px] text-center">
                  {currentPage} / {bookContent.length}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === bookContent.length}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  →
                </button>
              </div>

              {/* Font Size Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFontSize("text-sm")}
                  className={`px-3 py-1 rounded ${fontSize === "text-sm" ? "bg-blue-100 text-blue-700" : "bg-gray-100"}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("text-base")}
                  className={`px-3 py-1 rounded ${fontSize === "text-base" ? "bg-blue-100 text-blue-700" : "bg-gray-100"}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("text-lg")}
                  className={`px-3 py-1 rounded ${fontSize === "text-lg" ? "bg-blue-100 text-blue-700" : "bg-gray-100"}`}
                >
                  A
                </button>
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                {isFullscreen ? "⊡" : "⛶"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Book Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Paper texture background */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-12 min-h-[600px] relative">
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-300 opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-300 opacity-50"></div>

                {currentContent && (
                  <div className="prose prose-lg max-w-none">
                    {/* Page Title */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b-2 border-amber-300 pb-4">
                      {currentContent.title}
                    </h2>

                    {/* Page Content */}
                    <div className={`${fontSize} leading-relaxed text-gray-700 space-y-6`}>
                      {currentContent.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-justify">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Page Number */}
                    <div className="text-center mt-12 pt-8 border-t border-amber-200">
                      <span className="text-sm text-gray-500">- {currentPage} -</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Page Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>←</span>
              <span>Halaman Sebelumnya</span>
            </button>

            {/* Page Dots */}
            <div className="flex items-center space-x-2">
              {bookContent.slice(Math.max(0, currentPage - 3), Math.min(bookContent.length, currentPage + 2)).map((_, index) => {
                const pageNum = Math.max(0, currentPage - 3) + index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      pageNum === currentPage 
                        ? 'bg-blue-500 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                );
              })}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === bookContent.length}
              className="flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Halaman Selanjutnya</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reading Progress */}
      <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
        <div className="text-sm text-gray-600 mb-2">Progress Membaca</div>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${(currentPage / bookContent.length) * 100}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {Math.round((currentPage / bookContent.length) * 100)}% selesai
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

// Data provinsi Indonesia dengan informasi budaya
const indonesianProvinces = [
  {
    id: "aceh",
    title: "Aceh",
    slug: "aceh",
    overview:
      "Serambi Mekkah dengan kekayaan budaya Islam dan tradisi yang kuat",
    image:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
    color: "from-emerald-500 to-teal-600",
    icon: "🕌",
  },
  {
    id: "sumatera-utara",
    title: "Sumatera Utara",
    slug: "sumatera-utara",
    overview:
      "Tanah Batak dengan Danau Toba yang memukau dan budaya yang beragam",
    image: "/images/sumut.jpg",
    color: "from-blue-500 to-cyan-600",
    icon: "🏔️",
  },
  {
    id: "sumatera-barat",
    title: "Sumatera Barat",
    slug: "sumatera-barat",
    overview:
      "Ranah Minang dengan rumah gadang dan tradisi merantau yang terkenal",
    image: "/images/sumbar.jpg",
    color: "from-amber-500 to-orange-600",
    icon: "🏠",
  },
  {
    id: "riau",
    title: "Riau",
    slug: "riau",
    overview: "Negeri Melayu dengan istana megah dan seni budaya yang memesona",
    image: "/images/riau.jpg",
    color: "from-purple-500 to-indigo-600",
    icon: "👑",
  },
  {
    id: "kepulauan-riau",
    title: "Kepulauan Riau",
    slug: "kepulauan-riau",
    overview: "Pulau seribu dengan pantai eksotis dan budaya maritim yang kaya",
    image: "/images/kepri.jpg",
    color: "from-cyan-500 to-blue-600",
    icon: "🏝️",
  },
  {
    id: "jambi",
    title: "Jambi",
    slug: "jambi",
    overview: "Bumi Sepucuk Jamang dengan sejarah kerajaan dan kearifan lokal",
    image: "/images/jambi.jpg",
    color: "from-green-500 to-emerald-600",
    icon: "🌿",
  },
  {
    id: "sumatera-selatan",
    title: "Sumatera Selatan",
    slug: "sumatera-selatan",
    overview:
      "Bumi Sriwijaya dengan warisan sejarah maritim dan songket yang indah",
    image: "/images/sumsel.jpg",
    color: "from-red-500 to-rose-600",
    icon: "⛵",
  },
  {
    id: "bangka-belitung",
    title: "Bangka Belitung",
    slug: "bangka-belitung",
    overview: "Negeri Serumpun Sebalai dengan pantai menawan dan tambang timah",
    image: "/images/babel.jpg",
    color: "from-slate-500 to-gray-600",
    icon: "⚡",
  },
  {
    id: "bengkulu",
    title: "Bengkulu",
    slug: "bengkulu",
    overview: "Bumi Rafflesia dengan pantai panjang dan sejarah kolonial",
    image: "/images/bengkulu.jpg",
    color: "from-pink-500 to-rose-600",
    icon: "🌺",
  },
  {
    id: "lampung",
    title: "Lampung",
    slug: "lampung",
    overview: "Bumi Ruwa Jurai dengan budaya Siger dan kopi robusta terbaik",
    image: "/images/lampung.jpg",
    color: "from-yellow-500 to-amber-600",
    icon: "☕",
  },
  {
    id: "dki-jakarta",
    title: "DKI Jakarta",
    slug: "dki-jakarta",
    overview: "Ibu kota dengan perpaduan budaya modern dan tradisi Betawi",
    image: "/images/jakarta.jpg",
    color: "from-orange-500 to-red-600",
    icon: "🏙️",
  },
  {
    id: "jawa-barat",
    title: "Jawa Barat",
    slug: "jawa-barat",
    overview: "Tatar Sunda dengan budaya yang halus dan pemandangan yang asri",
    image: "/images/jabar.jpg",
    color: "from-green-500 to-teal-600",
    icon: "🎋",
  },
];

export default function MembacaPage() {
  const [hoveredProvince, setHoveredProvince] = useState(null);

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
            🇮🇩 38 Provinsi Yang Ada Di Indonesia
          </motion.h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Jelajahi keindahan dan kekayaan budaya dari setiap provinsi di
            Indonesia
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari Provinsi"
              className="w-full px-4 py-3 pl-12 bg-white rounded-2xl shadow-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Provinces Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {indonesianProvinces.map((province, index) => (
              <motion.div
                key={province.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
                onMouseEnter={() => setHoveredProvince(province.id)}
                onMouseLeave={() => setHoveredProvince(null)}
              >
                <Link to={`/membaca/${province.slug}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                    {/* Province Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${province.color} opacity-90`}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {province.image ? (
                          <img
                            src={province.image}
                            alt={province.title}
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-6xl">{province.icon}</span>
                        )}
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Province Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {province.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {province.overview}
                      </p>

                      {/* Read More Button */}
                      <div className="mt-4 flex items-center text-blue-500 text-sm font-medium group-hover:text-blue-700 transition-colors">
                        <span>Pelajari Lebih Lanjut</span>
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
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

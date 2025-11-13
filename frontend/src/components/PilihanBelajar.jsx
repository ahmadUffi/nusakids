import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function PilihanBelajar() {
  const learningMethods = [
    {
      id: 1,
      title: "Belajar Membaca Interaktif",
      subtitle: "Jelajahi Budaya Nusantara",
      description:
        "Temukan keunikan budaya dari 38 provinsi di Indonesia melalui pengalaman membaca yang interaktif. Dilengkapi dengan model 3D, diskusi dengan AI Saraswati, dan konten edukatif yang menarik.",
      features: [
        "📚 38 Provinsi Indonesia",
        "🤖 Chat dengan AI Saraswati",
        "🏛️ Model 3D Interaktif",
        "🎨 Budaya & Tradisi",
      ],
      image: "/images/membaca.jpeg",
      videoPlaceholder:
        "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Reading+Animation",
      navigate: "/membaca",
      gradient: "from-blue-500 to-purple-600",
      bgPattern: "bg-gradient-to-br from-blue-50 to-purple-50",
    },
    {
      id: 2,
      title: "Generator Gambar AI",
      subtitle: "Ciptakan Avatar Budayamu",
      description:
        "Wujudkan dirimu dalam balutan pakaian adat dari berbagai daerah di Indonesia menggunakan teknologi AI yang canggih. Rasakan pengalaman menjadi bagian dari budaya Nusantara.",
      features: [
        "🎨 AI Image Generator",
        "👘 Pakaian Adat Nusantara",
        "📸 Avatar Personal",
        "✨ Teknologi Canggih",
      ],
      image: "/images/createGambar.png",
      videoPlaceholder:
        "https://via.placeholder.com/600x400/EC4899/FFFFFF?text=AI+Generator+Demo",
      navigate: "/imagegenerator",
      gradient: "from-pink-500 to-rose-600",
      bgPattern: "bg-gradient-to-br from-pink-50 to-rose-50",
    },
    {
      id: 3,
      title: "Asah Pengetahuanmu Dengan Quiz",
      subtitle: "Quiz Budaya Indonesia",
      description:
        "Uji pengetahuanmu tentang budaya Indonesia dengan berbagai pertanyaan seru seputar tradisi, rumah adat, pakaian adat, alat musik, dan sejarah Nusantara. Raih skor tertinggi dan jadilah juara budaya!",
      features: [
        "📚 Soal Pilihan Ganda",
        "🎨 Budaya Indonesia",
        "🏆 Dapatkan Badge",
        "🎓 Edukasi Budaya Nusantara",
      ],
      image: "/images/berbicara.jpeg",
      videoPlaceholder:
        "https://via.placeholder.com/600x400/10B981/FFFFFF?text=Chat+Interface",
      navigate: "/quiz",
      gradient: "from-green-500 to-teal-600",
      bgPattern: "bg-gradient-to-br from-green-50 to-teal-50",
    },
  ];

  return (
    <div className="w-full py-20" id="start">
      {/* Header Section */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6"
        >
          Pilih Cara Belajarmu
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Tiga cara seru untuk menjelajahi kekayaan budaya Indonesia dengan
          teknologi modern
        </motion.p>
      </div>

      {/* Learning Methods */}
      <div className="max-w-7xl mx-auto px-4 space-y-32">
        {learningMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            {/* Content Section */}
            <div
              className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
            >
              <div className="space-y-6">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${method.bgPattern} border border-white/20`}
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${method.gradient}`}
                  ></div>
                  Metode {method.id}
                </div>

                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {method.title}
                  </h3>
                  <p
                    className={`text-lg font-semibold bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent`}
                  >
                    {method.subtitle}
                  </p>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {method.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {method.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link to={method.navigate}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r ${method.gradient} text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                >
                  Mulai Belajar
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

            {/* Media Section */}
            <div
              className={`${
                index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${method.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                ></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                  {/* Placeholder for video/gif */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <img
                      src={method.image}
                      alt={method.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-20 h-20 rounded-full bg-gradient-to-r ${method.gradient} flex items-center justify-center shadow-lg cursor-pointer`}
                      >
                        <svg
                          className="w-8 h-8 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${method.gradient}`}
                        ></div>
                        <span className="text-sm font-medium text-gray-500">
                          Preview Interactive
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

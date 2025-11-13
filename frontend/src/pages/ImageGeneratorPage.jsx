import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ApiService } from "../services/api";

const provinsiIndonesia = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan",
  "Bengkulu", "Lampung", "Bangka Belitung", "Kepulauan Riau", "DKI Jakarta",
  "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten",
  "Bali", "NTB", "NTT", "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan",
  "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Sulawesi Tengah",
  "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
  "Maluku", "Maluku Utara", "Papua", "Papua Barat"
];

export default function ImageGeneratorPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [province, setProvince] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [scratchRevealed, setScratchRevealed] = useState(false);

  const handleImageChange = (e) => {
    const maxSize = 4 * 1024 * 1024;
    const file = e.target.files[0];

    if (file) {
      if (file.size > maxSize) {
        setError("Ukuran gambar maksimal 4MB ya!");
        return;
      }

      setError("");
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        setUploadedImage({ base64, name: file.name });
        setPreview(reader.result);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image || !province) {
      setError("Upload foto dan pilih provinsi dulu ya!");
      return;
    }

    setError("");
    setLoading(true);
    setStep(3);

    try {
      const response = await ApiService.generateImageFromTextAndImage({
        image_base64: uploadedImage.base64,
        province,
      });

      if (response && response.image_base64) {
        setResult(response.image_base64);
        // Play success sound
        const audio = new Audio("/sounds/gosok.mp3");
        audio.play().catch(console.error);
      } else {
        setError("Gagal generate gambar. Coba lagi ya!");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan. Coba lagi ya!");
    } finally {
      setLoading(false);
    }
  };

  const resetGenerator = () => {
    setImage(null);
    setPreview(null);
    setUploadedImage(null);
    setProvince("");
    setResult(null);
    setError("");
    setStep(1);
    setScratchRevealed(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors mb-6">
            ← Kembali ke Beranda
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            🎨 Generator Avatar Budaya
          </motion.h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Wujudkan dirimu dalam balutan pakaian adat Indonesia dengan teknologi AI yang canggih!
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Form */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
            >
              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      step >= num 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {num}
                    </div>
                    {num < 3 && (
                      <div className={`w-16 h-1 mx-2 transition-all ${
                        step > num ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Foto Kamu</h3>
                      <p className="text-gray-600">Pilih foto terbaikmu untuk dijadikan avatar budaya</p>
                    </div>
                    
                    <div className="border-2 border-dashed border-pink-300 rounded-2xl p-8 text-center hover:border-pink-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="text-6xl mb-4">📸</div>
                        <p className="text-gray-600 mb-2">Klik untuk upload foto</p>
                        <p className="text-sm text-gray-500">PNG, JPG maksimal 4MB</p>
                      </label>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Pilih Provinsi</h3>
                      <p className="text-gray-600">Pilih pakaian adat dari provinsi mana yang ingin kamu pakai</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-2">
                      {provinsiIndonesia.map((prov) => (
                        <button
                          key={prov}
                          onClick={() => setProvince(prov)}
                          className={`p-3 rounded-xl text-sm font-medium transition-all ${
                            province === prov
                              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {prov}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={handleGenerate}
                      disabled={!province}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ✨ Generate Avatar Budaya
                    </button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 text-center"
                  >
                    {loading ? (
                      <div>
                        <div className="text-6xl mb-4">🎨</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Sedang Membuat Avatar...</h3>
                        <p className="text-gray-600 mb-6">AI sedang bekerja keras membuat avatar budayamu!</p>
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                        </div>
                      </div>
                    ) : result ? (
                      <div>
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Avatar Budaya Siap!</h3>
                        <p className="text-gray-600 mb-6">Gosok gambar di sebelah kanan untuk melihat hasilnya</p>
                        <button
                          onClick={resetGenerator}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transition-all"
                        >
                          🔄 Buat Avatar Lagi
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-6xl mb-4">😔</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops! Ada Kesalahan</h3>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                          onClick={() => setStep(2)}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transition-all"
                        >
                          🔄 Coba Lagi
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {error && step !== 3 && (
                <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
            </motion.div>

            {/* Right Side - Preview/Result */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {preview ? "Preview & Hasil" : "Preview Foto"}
              </h3>
              
              <div className="space-y-6">
                {/* Original Image Preview */}
                {preview && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Foto Asli:</p>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-48 h-48 mx-auto object-cover rounded-2xl shadow-lg border border-gray-200"
                    />
                  </div>
                )}

                {/* Result with Scratch Effect */}
                {result ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Avatar Budaya {province}:</p>
                    <div className="relative w-64 h-64 mx-auto">
                      {/* Simple scratch-to-reveal effect */}
                      <div className="relative group cursor-pointer">
                        <img
                          src={`data:image/jpeg;base64,${result}`}
                          alt="Generated Result"
                          className="w-full h-full object-cover rounded-2xl shadow-2xl"
                        />
                        {!scratchRevealed && (
                          <div 
                            className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-2xl flex items-center justify-center text-white font-bold text-lg cursor-pointer"
                            onClick={() => setScratchRevealed(true)}
                          >
                            <div className="text-center">
                              <div className="text-4xl mb-2">✨</div>
                              <p>Klik untuk melihat hasil!</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-64 h-64 mx-auto flex items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🎭</div>
                      <p className="text-sm">Avatar budaya akan muncul di sini</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

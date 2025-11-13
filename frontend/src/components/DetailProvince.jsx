import { useEffect, useState } from "react";
import { ApiService } from "../services/api";
import ModelViewer from "./ModelViewer";
import Button from "./Button";
import { Link } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";

export default function DetailProvince({ slug }) {
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { deviceName } = useResponsive();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getDataBySlug(slug);
        setDatas(data);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat data budaya...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Data Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/membaca">
            <Button className="bg-blue-500 text-white px-6 py-2">
              Kembali ke Daftar Provinsi
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const aboutIndonesia = [
    {
      variant: "baju adat",
      title: datas.nama_provinsi,
      desc:
        datas.pakaian_adat?.deskripsi_pakaian_adat ||
        "Deskripsi belum tersedia",
      gambar3d: datas.pakaian_adat?.url_pakaian_adat || "",
    },
    {
      variant: "rumah adat",
      title: datas.nama_provinsi,
      desc:
        datas.rumah_adat?.deskripsi_rumah_adat || "Deskripsi belum tersedia",
      gambar3d: datas.rumah_adat?.url_rumah_adat || "",
    },
    {
      variant: "alat musik",
      title: datas.nama_provinsi,
      desc:
        datas.alat_musik?.deskripsi_alat_musik || "Deskripsi belum tersedia",
      gambar3d: datas.alat_musik?.url_alat_musik || "",
    },
  ];

  const [selected, setSelected] = useState("baju adat");
  const filterdata = aboutIndonesia.filter((data) => data.variant === selected);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            to="/membaca"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Kembali ke Daftar Provinsi
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Budaya {datas.nama_provinsi}
            </h1>
            <p className="text-blue-100">
              Jelajahi kekayaan budaya dan tradisi dari {datas.nama_provinsi}
            </p>
          </div>

          {/* Category Buttons */}
          <div className="p-6 bg-gray-50 border-b">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                className={`px-6 py-3 rounded-lg transition-all ${
                  selected === "baju adat"
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-red-50"
                }`}
                onclick={() => setSelected("baju adat")}
              >
                👘 Baju Adat
              </Button>
              <Button
                className={`px-6 py-3 rounded-lg transition-all ${
                  selected === "rumah adat"
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-green-50"
                }`}
                onclick={() => setSelected("rumah adat")}
              >
                🏠 Rumah Adat
              </Button>
              <Button
                className={`px-6 py-3 rounded-lg transition-all ${
                  selected === "alat musik"
                    ? "bg-amber-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-amber-50"
                }`}
                onclick={() => setSelected("alat musik")}
              >
                🎵 Alat Musik
              </Button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* 3D Model */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-4 min-h-[300px] flex items-center justify-center">
                  {filterdata[0]?.gambar3d?.trim() ? (
                    <ModelViewer
                      src={filterdata[0].gambar3d}
                      width={deviceName === "mobile" ? "90vw" : "600px"}
                      height={deviceName === "mobile" ? "300px" : "450px"}
                      cameraOrbit="0deg 75deg 0"
                      alt="3D Object"
                    />
                  ) : (
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🗺️</div>
                      <p className="text-gray-600 text-sm">
                        Gambar 3D belum tersedia
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        Gambar 3D tersedia di provinsi: Bali, Jawa Tengah,
                        Maluku, Sumatera Utara
                      </p>
                      <ModelViewer
                        src="/ui/petaIndonesia.glb"
                        width={deviceName === "mobile" ? "90vw" : "400px"}
                        height={deviceName === "mobile" ? "200px" : "300px"}
                        cameraOrbit="90deg 75deg 0"
                        alt="Peta Indonesia"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    {selected.charAt(0).toUpperCase() + selected.slice(1)}{" "}
                    {filterdata[0]?.title}
                  </h2>
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <p>{filterdata[0]?.desc}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all">
                    🔍 Pelajari Lebih Lanjut
                  </Button>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all">
                    💬 Chat dengan AI
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Ingin belajar budaya dari provinsi lain?
            <Link
              to="/membaca"
              className="text-blue-600 hover:text-blue-800 font-medium ml-1"
            >
              Jelajahi semua provinsi →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

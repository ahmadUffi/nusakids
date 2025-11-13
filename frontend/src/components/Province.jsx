"use client";

import { Marquee } from "./magicui/marquee";
import { ShineBorder } from "./magicui/shine-border";
import { SparklesText } from "./magicui/sparkles-text";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { ApiService } from "../services/api";
import { Link } from "react-router-dom";

export default function Province() {
  const [selected, setSelected] = useState("");
  const [provinces, setProvince] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getAllDatas();
        setProvince(data);
      } catch (error) {
        console.error("Gagal mengambil data provinsi:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const isMatch = (name) =>
    selected && name.toLowerCase().includes(selected.toLowerCase());

  const threed = {
    color: "#2b7fff",
    fontWeight: "900",
    textShadow: `0.0075em 0.0075em 0 rgba(20, 60, 120, 0.2),
      0.005em 0.005em 0 rgba(20, 60, 120, 0.3),
      0.01em 0.01em 0 rgba(20, 60, 120, 0.4),
      0.015em 0.015em 0 rgba(20, 60, 120, 0.5),
      0.02em 0.02em 0 rgba(20, 60, 120, 0.6),
      0.025em 0.025em 0 rgba(20, 60, 120, 0.7),
      0.03em 0.03em 0 rgba(20, 60, 120, 0.8),
      0.035em 0.035em 0 rgba(20, 60, 120, 0.9)`,
  };

  const rows = [
    provinces.slice(0, 10),
    provinces.slice(10, 20),
    provinces.slice(20, 30),
    provinces.slice(30, 38),
  ];

  const Card = ({ id, province }) => {
    const name = province.nama_provinsi;
    const slug = province.slug;
    const image = province.url_image;
    return (
      <Link to={`/membaca/${slug}`}>
        <div
          id="province"
          key={id}
          className={`w-max h-max bg-white text-gray-800 cursor-pointer py-3 px-6 rounded-lg
          shadow-[0_4px_0_#e5e7eb] border border-gray-200 
          hover:translate-y-0.5 hover:shadow-[0_2px_0_#e5e7eb] 
          active:translate-y-1.5 active:shadow-[0_1px_0_#e5e7eb] 
          transition-all duration-200 ease-in-out flex items-center ${
            isMatch(name)
              ? "opacity-100 font-bold ring-2 ring-blue-300"
              : "opacity-75 font-semibold"
          }`}
        >
          <div className="flex size-12 items-center justify-center rounded-full overflow-hidden mr-3 bg-gradient-to-br from-blue-100 to-purple-100">
            <img
              src={image}
              width={48}
              height={48}
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="title text-sm font-medium">{name}</div>
        </div>
      </Link>
    );
  };

  return (
    <div className="lg:h-max min-h-[600px] flex flex-col mt-20 text-blue-500 relative z-30 backdrop-blur-sm bg-white/80 border border-white/20 rounded-2xl shadow-xl p-8">
      <ShineBorder
        borderWidth={2.5}
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      />

      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <SparklesText>
          <h5
            className="mt-2 lg:text-4xl md:text-3xl text-2xl mb-2"
            style={threed}
          >
            38 Provinsi Yang Ada Di Indonesia
          </h5>
        </SparklesText>
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input
            type="text"
            placeholder="🔍 Cari Provinsi..."
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="rounded-lg border-2 border-blue-200 focus:border-blue-400 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-gray-600 font-medium">
                Sedang memuat data provinsi...
              </p>
            </div>
          </div>
        ) : (
          rows.map((row, idx) => (
            <Marquee
              key={idx}
              reverse={idx % 2 !== 0}
              pauseOnHover
              className="[--duration:45s]"
            >
              {row.map((province) => (
                <Card key={province.id} id={province.id} province={province} />
              ))}
            </Marquee>
          ))
        )}
      </div>
    </div>
  );
}

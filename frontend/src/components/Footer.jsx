"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().getFullYear().toString());
  }, []);

  return (
    <footer
      id="footer"
      className="bg-gradient-to-br from-slate-50 to-blue-50 text-gray-700 py-12 mt-16 border-t border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NusaKids
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Platform edukasi interaktif untuk anak-anak Indonesia, belajar
              sambil bermain dan berbudaya Berbasis AI.
            </p>
          </div> */}

        {/* <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Fitur</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>🎯 Pembelajaran Interaktif</li>
              <li>🤖 AI Assistant</li>
              <li>🎨 Kreasi Digital</li>
              <li>📚 Budaya Nusantara</li>
            </ul>
          </div> */}

        {/* <div className="text-start md:text-right">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-start">
              Kontak
            </h3>
            <div className="space-y-2 text-sm text-gray-600 text-start">
              <p>📧 info@nusakids.id</p>
              <p>🌐 www.nusakids.id</p>
              <p>🇮🇩 Indonesia</p>
            </div>
          </div> */}
        {/* </div> */}

        {/* Divider */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500">
              &copy; {date} NusaKids. Semua hak dilindungi.
            </div>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>Made with ❤️ for Indonesia</span>
              <span>•</span>
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

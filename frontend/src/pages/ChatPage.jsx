export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        <div className="text-8xl mb-6">💬</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Chat dengan Saraswati
        </h1>
        <p className="text-gray-600 text-lg mb-6 max-w-md">
          Fitur akan segera hadir! Kamu bisa. asah kemampuanmu dengan quiz seru
          tentang budaya Indonesia.
        </p>
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
          <span className="text-yellow-800 font-semibold">
            🚧 Dalam Pengembangan
          </span>
        </div>
      </div>
    </div>
  );
}

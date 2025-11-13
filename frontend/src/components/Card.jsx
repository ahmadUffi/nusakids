import { cn } from "../lib/utils";

export default function Card({
  id,
  image = "",
  title = "",
  description = "",
  className = "",
}) {
  return (
    <div
      className={cn(
        "relative z-10 cursor-pointer min-w-[230px] w-[250px] max-w-[280px] h-80 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl",
        id === 2 && "cursor-not-allowed opacity-75",
        className
      )}
    >
      {id === 2 && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex justify-center items-center z-20">
          <h1 className="text-xl font-extrabold text-gray-800 shadow-md tracking-wide animate-pulse">
            🚧 Coming Soon 🚧
          </h1>
        </div>
      )}

      <img
        src={image}
        alt={title}
        className="w-full h-53 object-cover relative"
        loading="lazy"
      />

      {/* Overlay Gradient + Text */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent text-white">
        <h3 className="text-base font-bold leading-tight drop-shadow-sm">
          {title}
        </h3>
        {description && (
          <p className="text-sm font-light leading-snug drop-shadow-sm mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

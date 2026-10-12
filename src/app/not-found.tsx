import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-green-500/10 blur-3xl"></div>

      <div className="relative text-center max-w-lg p-10 rounded-3xl backdrop-blur-md bg-white/30 shadow-xl border border-white/20">
        {/* Big 404 with glowing effect */}
        <h1 className="text-[9rem] sm:text-[11rem] font-black leading-none bg-gradient-to-b from-green-500 to-emerald-700 bg-clip-text text-transparent drop-shadow-[0_5px_25px_rgba(16,185,129,0.6)] animate-pulse select-none">
          404
        </h1>

        {/* Divider line with glow */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="h-px w-16 bg-gradient-to-r from-green-400 to-emerald-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-500 animate-ping"></span>
          <span className="h-px w-16 bg-gradient-to-r from-emerald-400 to-green-400"></span>
        </div>

        {/* Message */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-3 tracking-wide">
          Page Not Found
        </h2>
        <p className="text-green-800/80 mb-8 leading-relaxed text-lg">
          Oops! The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back on track.
        </p>

        {/* Button with animation */}
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-full font-semibold text-white
                     bg-gradient-to-r from-green-500 to-emerald-600
                     shadow-lg shadow-green-500/40
                     hover:from-green-600 hover:to-emerald-700
                     hover:shadow-xl hover:shadow-green-600/50
                     hover:-translate-y-0.5
                     active:translate-y-0
                     transition-all duration-300 ease-out animate-bounce"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

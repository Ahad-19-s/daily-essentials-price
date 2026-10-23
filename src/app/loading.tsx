const LoadingPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-green-100 via-emerald-200 to-green-400 
                    bg-[length:200%_200%] animate-gradient px-4"
    >
      <div className="relative text-center max-w-md p-8 rounded-3xl backdrop-blur-md bg-white/30 shadow-xl border border-white/20">
        {/* Animated spinner */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 border-r-emerald-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-ping"></div>
          </div>
        </div>

        {/* Divider line */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="h-px w-16 bg-gradient-to-r from-green-400 to-emerald-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
          <span className="h-px w-16 bg-gradient-to-r from-emerald-400 to-green-400"></span>
        </div>

        {/* Message */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-3 tracking-wide">
          Loading…
        </h2>
        <p className="text-green-800/80 leading-relaxed text-lg">
          Please wait, we’re preparing everything for you
        </p>

        {/* Animated bouncing dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-3 h-3 rounded-full bg-green-400 animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

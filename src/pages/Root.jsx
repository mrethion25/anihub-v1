
import { Link } from "react-router-dom";
import { FaStar, FaPlay, FaUsers, FaGlobe } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Root = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <Helmet>
        <title>blinime - Premium Anime Streaming Platform</title>
        <meta
          name="description"
          content="Experience the ultimate anime streaming destination. Watch thousands of episodes in HD quality with subtitles. Join AniHub today."
        />
      </Helmet>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/2 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <FaPlay className="text-black text-lg" />
          </div>
          <h1 className="text-2xl font-bold">BliNime</h1>
        </div>
        <Link
          to="/home"
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105"
        >
          Enter Site
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
            <FaStar className="text-white mr-2" />
            <span className="text-sm font-medium">Premium Anime Experience</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Watch Anime
            <br />
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Like Never Before
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover thousands of anime episodes in stunning HD quality. 
            Stream instantly with multiple subtitle options and zero ads.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/home"
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <FaPlay className="text-lg" />
              <span>Start Watching</span>
            </Link>
            <a 
              href="https://discord.gg/jH7HpVQbH3"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 inline-block text-center"
            >
              Join Bliss cafe
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <FaPlay className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">HD Streaming</h3>
            <p className="text-gray-400">
              Crystal clear video quality with adaptive streaming for the best viewing experience.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <FaGlobe className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-Language</h3>
            <p className="text-gray-400">
              Watch with subtitles in multiple languages or enjoy dubbed versions.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <FaUsers className="text-white text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Active Community</h3>
            <p className="text-gray-400">
              Join millions of anime fans and discover your next favorite series.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20 pt-8 border-t border-white/10">
          <div className="text-center">
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-gray-400 text-sm">Anime Episodes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">500+</div>
            <div className="text-gray-400 text-sm">Anime Series</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">1M+</div>
            <div className="text-gray-400 text-sm">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-gray-400 text-sm">Streaming</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-white/10 mt-20">
        <p className="text-gray-400">
          © 2025 BliNime. made with 💜 by arima.
        </p>
      </footer>
    </div>
  );
};

export default Root;

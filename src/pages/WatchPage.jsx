import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import Player from "../components/Player";
import Episodes from "../layouts/Episodes";
import { useApi } from "../services/useApi";
import PageNotFound from "./PageNotFound";
import { MdTableRows, MdGridView, MdSearch, MdFilterList, MdBookmark, MdShare, MdDownload } from "react-icons/md";
import { HiMiniViewColumns } from "react-icons/hi2";
import { FaHeart, FaStar, FaEye, FaClock } from "react-icons/fa";
import { Helmet } from "react-helmet";

const WatchPage = () => {
  const { id, ep: pathEp } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [layout, setLayout] = useState("row");
  const [episodeSearch, setEpisodeSearch] = useState("");
  const [episodeFilter, setEpisodeFilter] = useState("all"); // all, watched, unwatched, filler
  const [showAnimeInfo, setShowAnimeInfo] = useState(false);

  const ep = searchParams.get("ep") || pathEp;

  const { data, isError } = useApi(`/episodes/${id}`);
  const episodes = data?.data;

  const updateParams = (newParam) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("ep", newParam);
      return newParams;
    });
  };
  // Update document title

  // Auto-redirect to first episode if no `ep` param exists
  useEffect(() => {
    if (!ep && Array.isArray(episodes) && episodes.length > 0) {
      const ep = episodes[0].id.split("ep=").pop();
      updateParams(ep);
    }
  }, [ep, episodes, setSearchParams]);

  if (isError) {
    return <PageNotFound />;
  }

  if (!episodes) {
    return <Loader className="h-screen" />;
  }

  const currentEp =
    episodes &&
    ep !== null &&
    episodes.find((e) => e.id.split("ep=").pop() === ep);

  const changeEpisode = (action) => {
    if (!currentEp) return;
    
    if (action === "next") {
      const nextEp = episodes[currentEp.episodeNumber - 1 + 1];
      if (!nextEp) return;
      updateParams(nextEp.id.split("ep=").pop());
    } else {
      const prevEp = episodes[currentEp.episodeNumber - 1 - 1];
      if (!prevEp) return;
      updateParams(prevEp.id.split("ep=").pop());
    }
  };

  const hasNextEp = currentEp ? Boolean(episodes[currentEp.episodeNumber - 1 + 1]) : false;
  const hasPrevEp = currentEp ? Boolean(episodes[currentEp.episodeNumber - 1 - 1]) : false;

  return (
    <div className="min-h-screen bg-black pt-16 pb-safe-area-bottom">
      <Helmet>
        <title>
          Watch {id.split("-").slice(0, 2).join(" ")} Online, Free Anime
          Streaming Online on AniHub Anime Website
        </title>
        <meta property="og:title" content="watch - BliNime" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-white/60 mb-4 lg:mb-6 overflow-x-auto whitespace-nowrap custom-scrollbar">
          <Link to="/home" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>•</span>
          <Link to={`/anime/${id}`} className="hover:text-white transition-colors">
            {id.split("-").slice(0, 2).join(" ")}
          </Link>
          <span>•</span>
          <span>Episode {currentEp?.episodeNumber || ep}</span>
        </div>

        {/* Video Player */}
        {ep && id && (
          <div className="mb-8">
            <Player
              id={id}
              episodeId={`${id}?ep=${ep}`}
              currentEp={currentEp}
              changeEpisode={changeEpisode}
              hasNextEp={hasNextEp}
              hasPrevEp={hasPrevEp}
            />
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
          {/* Episodes Section */}
          <div className="xl:col-span-3">
            <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              {/* Episodes Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">Episodes</h3>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {episodes?.length || 0} Episodes
                  </span>
                </div>
                
                {/* Controls */}
                <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
                  {/* Search */}
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={episodeSearch}
                      onChange={(e) => setEpisodeSearch(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white transition-colors w-32 md:w-48"
                      data-testid="input-episode-search"
                    />
                  </div>
                  
                  {/* Filter */}
                  <select
                    value={episodeFilter}
                    onChange={(e) => setEpisodeFilter(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors"
                    data-testid="select-episode-filter"
                  >
                    <option value="all">All Episodes</option>
                    <option value="watched">Watched</option>
                    <option value="unwatched">Unwatched</option>
                    <option value="filler">Filler Only</option>
                    <option value="canon">Canon Only</option>
                  </select>
                  
                  {/* Layout Toggle */}
                  <div className="flex bg-white/10 rounded-lg overflow-hidden border border-white/20">
                    <button
                      className={`p-2 transition-colors ${
                        layout === "row" 
                          ? "bg-white text-black" 
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                      onClick={() => setLayout("row")}
                      title="List View"
                      data-testid="button-layout-row"
                    >
                      <MdTableRows size={18} />
                    </button>
                    <button
                      className={`p-2 transition-colors ${
                        layout === "column" 
                          ? "bg-white text-black" 
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                      onClick={() => setLayout("column")}
                      title="Grid View"
                      data-testid="button-layout-grid"
                    >
                      <MdGridView size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Episodes Grid */}
              <div
                className={`max-h-[60vh] overflow-y-auto custom-scrollbar grid gap-3 ${
                  layout === "row"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12"
                }`}
              >
                {episodes && Array.isArray(episodes) && episodes.length > 0 ? (
                  episodes
                    .filter((episode) => {
                      // Apply search filter
                      const matchesSearch = episode.title.toLowerCase().includes(episodeSearch.toLowerCase()) ||
                                          episode.episodeNumber.toString().includes(episodeSearch);
                      
                      // Apply type filter
                      const matchesFilter = episodeFilter === "all" ||
                                          (episodeFilter === "filler" && episode.isFiller) ||
                                          (episodeFilter === "canon" && !episode.isFiller);
                      
                      return matchesSearch && matchesFilter;
                    })
                    .map((episode) => (
                      <Episodes
                        key={episode.id}
                        episode={episode}
                        currentEp={currentEp}
                        layout={layout}
                      />
                    ))
                ) : (
                  <div className="col-span-full text-center text-white/60 py-8">
                    No episodes available
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Anime Info Sidebar */}
          <div className="xl:col-span-1 order-first xl:order-last">
            <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-xl p-4 lg:p-6 xl:sticky xl:top-4 mb-4 xl:mb-0">
              <div className="text-center mb-6">
                <h4 className="text-lg font-bold text-white mb-2">Quick Actions</h4>
                <div className="grid grid-cols-4 xl:grid-cols-2 gap-2 lg:gap-3">
                  <button className="bg-white/20 hover:bg-white/30 text-white p-2 lg:p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1" data-testid="button-favorite">
                    <FaHeart className="text-lg" />
                    <span className="text-xs hidden xl:block">Favorite</span>
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white p-2 lg:p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1" data-testid="button-bookmark">
                    <MdBookmark className="text-lg" />
                    <span className="text-xs hidden xl:block">Bookmark</span>
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white p-2 lg:p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1" data-testid="button-share">
                    <MdShare className="text-lg" />
                    <span className="text-xs hidden xl:block">Share</span>
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white p-2 lg:p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1" data-testid="button-download">
                    <MdDownload className="text-lg" />
                    <span className="text-xs hidden xl:block">Download</span>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <FaStar className="text-white" />
                    Progress
                  </h5>
                  <div className="text-white/70 text-sm">
                    Episode {currentEp?.episodeNumber || ep} of {episodes?.length}
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-white to-gray-300 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentEp?.episodeNumber || parseInt(ep) || 0) / (episodes?.length || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl">
                  <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <FaClock className="text-white" />
                    Watch Stats
                  </h5>
                  <div className="space-y-2 text-sm text-white/70">
                    <div className="flex justify-between">
                      <span>Total Episodes:</span>
                      <span className="text-white">{episodes?.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Filler Episodes:</span>
                      <span className="text-white">{episodes?.filter(ep => ep.isFiller).length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current:</span>
                      <span className="text-white">Episode {currentEp?.episodeNumber || ep}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;

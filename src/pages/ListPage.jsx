/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useInfiniteApi } from "../services/useApi";
import Loader from "../components/Loader";
import PageNotFound from "./PageNotFound";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "../components/Image";
import Heading from "../components/Heading";
import AZ from "../layouts/AZ";
import React, { useState } from "react";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import { FaFilter, FaThLarge, FaList, FaSortAmountDown, FaStar, FaCalendar, FaPlay } from "react-icons/fa";

const ListPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  
  const validateQueries = [
    "top-airing",
    "most-popular",
    "most-favorite",
    "completed",
    "recently-added",
    "recently-updated",
    "top-upcoming",
    "subbed-anime",
    "dubbed-anime",
    "movie",
    "tv",
    "ova",
    "ona",
    "special",
    "az-list",
    "genre",
    "producer",
  ];
  const { category, query = null } = useParams();

  const isValidQuery = validateQueries.includes(category);

  if (!isValidQuery) {
    return <PageNotFound />;
  }

  const endpoint = `/animes/${category}${query ? `/${query}` : ""}?page=`;
  const { data, isError, error, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteApi(endpoint);

  if (isError) {
    return <PageNotFound />;
  }
  const pages = data?.pages;

  const getCategoryTitle = (category, query) => {
    const titles = {
      "top-airing": "Top Airing",
      "most-popular": "Most Popular",
      "most-favorite": "Most Favorite",
      "completed": "Completed",
      "recently-added": "Recently Added",
      "recently-updated": "Recently Updated",
      "top-upcoming": "Top Upcoming",
      "subbed-anime": "Subbed Anime",
      "dubbed-anime": "Dubbed Anime",
      "movie": "Movies",
      "tv": "TV Series",
      "ova": "OVA",
      "ona": "ONA",
      "special": "Special",
      "az-list": "A-Z List",
      "genre": query ? `${query.charAt(0).toUpperCase() + query.slice(1)} Genre` : "Genres",
      "producer": query ? `${query} Studio` : "Studios",
    };
    return titles[category] || category;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "top-airing": <FaPlay className="text-green-500" />,
      "most-popular": <FaStar className="text-yellow-500" />,
      "most-favorite": <FaStar className="text-red-500" />,
      "recently-added": <FaCalendar className="text-blue-500" />,
      "recently-updated": <FaCalendar className="text-purple-500" />,
    };
    return icons[category] || <FaPlay className="text-white" />;
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <Helmet>
        <title>{getCategoryTitle(category, query)} - BliNime</title>
        <meta property="og:title" content={`${getCategoryTitle(category, query)} - AniHub`} />
        <meta property="og:description" content={`Browse ${getCategoryTitle(category, query)} anime collection on AniHub`} />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-4">
            {getCategoryIcon(category)}
            <Heading className="text-3xl md:text-4xl font-bold">
              {getCategoryTitle(category, query)}
            </Heading>
          </div>
          <p className="text-white/70 text-lg max-w-2xl">
            Discover amazing anime from our {getCategoryTitle(category, query).toLowerCase()} collection. 
            {data?.pages?.[0]?.data?.response?.length && ` Found ${data.pages.flat().reduce((acc, page) => acc + page.data.response.length, 0)}+ titles.`}
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        {category === "az-list" && (
          <div className="my-8">
            <AZ selected={query} />
          </div>
        )}
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="flex items-center gap-4">
            <span className="text-white/70 text-sm font-medium">View:</span>
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid" 
                    ? "bg-white text-black" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <FaThLarge size={14} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list" 
                    ? "bg-white text-black" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <FaList size={14} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-white/70 text-sm font-medium">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/40"
            >
              <option value="default">Default</option>
              <option value="title">Title A-Z</option>
              <option value="rating">Rating</option>
              <option value="year">Release Year</option>
            </select>
          </div>
        </div>
        
        {pages && !isLoading ? (
          <InfiniteScroll
            dataLength={data?.pages.flat().reduce((acc, page) => acc + page.data.response.length, 0) || 0}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="py-12 flex justify-center">
                <div className="flex items-center gap-3 text-white/70">
                  <Loader className="h-8 w-8" />
                  <span>Loading more anime...</span>
                </div>
              </div>
            }
            endMessage={<Footer />}
          >
            <div className={`${
              viewMode === "grid" 
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6" 
                : "space-y-4"
            } mb-8`}>
              {pages?.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.data.response.map((item, index) => (
                    <div key={item.id + index} className={`${
                      viewMode === "grid" 
                        ? "transform hover:-translate-y-2 transition-all duration-300" 
                        : "bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                    }`}>
                      {viewMode === "grid" ? (
                        <Image data={item} />
                      ) : (
                        <div className="flex gap-4">
                          <div className="w-20 h-28 flex-shrink-0">
                            <Image data={item} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-lg line-clamp-2 mb-2">
                              {item.title}
                            </h3>
                            <p className="text-white/60 text-sm line-clamp-1 mb-2">
                              {item.alternativeTitle}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-white/50">
                              {item.type && <span className="bg-white/10 px-2 py-1 rounded">{item.type}</span>}
                              {item.year && <span>{item.year}</span>}
                              {item.rating && <span className="flex items-center gap-1"><FaStar className="text-yellow-500" />{item.rating}</span>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <Loader className="h-16 w-16 mb-4" />
            <p className="text-white/70 text-lg">Loading amazing anime...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPage;

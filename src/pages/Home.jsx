import Loader from "../components/Loader";
import { useApi } from "../services/useApi";
import HeroBanner from "../components/HeroBanner";
import notify from "../utils/Toast";
import TrendingLayout from "../layouts/TrendingLayout";
import DynamicLayout from "../layouts/DynamicLayout";
import MainLayout from "../layouts/MainLayout";
import GenresLayout from "../layouts/GenresLayout";
import Top10Layout from "../layouts/Top10Layout";
import useGenresStore from "../store/genresStore";
import { useEffect } from "react";
import useTopTenStore from "../store/toptenStore";
import Footer from "../components/Footer";

import { genres } from "../utils/genres";
import { Helmet } from "react-helmet";
const Home = () => {
  const { data, isLoading, error, isError } = useApi("/home");

  const setGenres = useGenresStore((state) => state.setGenres);
  const setTopTen = useTopTenStore((state) => state.setTopTen);

  useEffect(() => {
    setGenres(genres);
  }, []);

  useEffect(() => {
    if (data?.data) {
      setTopTen(data.data.top10);
    }
  }, [data]);

  useEffect(() => {
    if (isError && error) {
      notify("error", error.message);
    }
  }, [isError, error]);
  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20 relative overflow-x-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-60 right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      <Helmet>
        <title>
          Watch Anime Online, Free Anime Streaming Online on BliNime Anime
          Website
        </title>
        <meta
          name="description"
          content=" Blinime is a free no ads anime site to watch free anime. Online anime streaming at BliNime with DUB, SUB in HD."
        />
        <meta property="og:title" content="home - AniHub" />
      </Helmet>
      
      {isLoading ? (
        <Loader className="h-[100dvh]" />
      ) : (
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-8 md:mb-12">
            <HeroBanner slides={data?.data?.spotlight} />
          </div>

          {/* Trending Section */}
          <div className="mb-10 md:mb-16">
            <TrendingLayout data={data?.data?.trending} />
          </div>

          {/* Quick Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
            <DynamicLayout
              title="Top Airing"
              endpoint="top-airing"
              data={data?.data?.topAiring}
            />
            <DynamicLayout
              title="Most Popular"
              endpoint="most-popular"
              data={data?.data?.mostPopular}
            />
            <DynamicLayout
              title="Most Favorite"
              endpoint="most-favorite"
              data={data?.data?.mostFavorite}
            />
            <DynamicLayout
              title="Latest Completed"
              endpoint="completed"
              data={data?.data?.latestCompleted}
            />
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-16">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8 md:space-y-12">
              <MainLayout
                title="Latest Episode"
                endpoint="recently-updated"
                data={data?.data?.latestEpisode}
              />
              <MainLayout
                title="New Added"
                endpoint="recently-added"
                data={data?.data?.newAdded}
              />
              <MainLayout
                title="Top Upcoming"
                endpoint="top-upcoming"
                data={data?.data?.topUpcoming}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6 md:space-y-10">
              <GenresLayout />
              <Top10Layout />
            </div>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default Home;

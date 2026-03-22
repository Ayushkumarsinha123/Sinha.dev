import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchSearchResults } from "../../services/reelService";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Grab the search word from the URL ( ?query=pizza)
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const getResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchSearchResults(query);
        setResults(data);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    };

    getResults();
  }, [query]); 

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8 pb-12">
        
        {/* Dynamic Header */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {query
              ? `Search results for "${query}"`
              : "Discover delicious food"}
          </h1>
          <p className="text-gray-500 mt-2">
            Find your next craving and click to watch.
          </p>
        </div>

        {loading && (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500 font-semibold animate-pulse">
              Finding delicious food...
            </p>
          </div>
        )}

        {!loading && results.length === 0 && query && (
          <div className="text-center py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xl text-gray-600">
              No dishes found for{" "}
              <span className="font-bold text-red-500">"{query}"</span>.
            </p>
            <p className="text-gray-500 mt-2">
              Try searching for something else like "pizza" or "burger"!
            </p>
          </div>
        )}

      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((reel) => (
            <div
              key={reel._id}
              onClick={() => navigate(`/feed?videoId=${reel._id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group"
            >
              <div className="relative h-80 w-full bg-black">
                <video
                  src={reel.videoUrl}
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-gray-900 shadow-sm">
                  ₹{reel.price}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {reel.dishName}
                </h3>
                {reel.restaurant && (
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    By{" "}
                    <span className="font-medium text-red-500">
                      {reel.restaurant.name}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
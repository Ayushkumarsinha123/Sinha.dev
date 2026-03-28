import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchSearchResults } from "../../services/reelService";
import { motion } from "framer-motion";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

 
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
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden font-sans selection:bg-orange-500/30">
      
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

     
      <div className="relative z-10 max-w-7xl mx-auto pt-28 px-4 sm:px-6 lg:px-8 pb-12 min-h-screen flex flex-col">
        
      
        <div className="mb-10 border-b border-white/10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {query ? (
              <>
                Search results for <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">"{query}"</span>
              </>
            ) : (
              "Discover delicious food"
            )}
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Find your next craving and click to watch.
          </p>
        </div>

        
        {loading && (
          <div className="flex-1 flex items-center justify-center py-20">
            <p className="text-xl text-orange-500 font-bold animate-pulse tracking-wider">
              Finding delicious food...
            </p>
          </div>
        )}

        
        {!loading && results.length === 0 && query && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-md shadow-2xl mt-10"
          >
            <p className="text-2xl text-white font-bold mb-3">
              No dishes found for <span className="text-orange-500">"{query}"</span>
            </p>
            <p className="text-gray-400 text-lg">
              Try searching for something else like "pizza", "burger", or "sushi"!
            </p>
          </motion.div>
        )}

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {results.map((reel, index) => (
            <motion.div
              key={reel._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }} 
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => navigate(`/feed?videoId=${reel._id}`)}
              className="bg-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all duration-300 cursor-pointer border border-white/10 group flex flex-col"
            >
            
              <div className="relative h-72 sm:h-80 w-full bg-neutral-900 overflow-hidden">
                <video
                  src={reel.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full font-bold text-white border border-white/20 shadow-lg">
                  ₹{reel.price}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/40">
                <div>
                  <h3 className="text-xl font-bold text-white truncate drop-shadow-md">
                    {reel.dishName}
                  </h3>
                  {reel.restaurant && (
                    <p className="text-sm text-gray-400 mt-1 truncate">
                      By <span className="font-bold text-orange-400 group-hover:text-orange-500 transition-colors">{reel.restaurant.name}</span>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Search;
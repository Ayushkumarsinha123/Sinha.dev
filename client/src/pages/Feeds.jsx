import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Reel from "../components/reels/Reels"; 
import { fetchReels } from "../services/reelService";

const Feed = () => {
  const [reels, setReels] = useState([]);
  const [searchParams] = useSearchParams();

  const scrollRef = useRef(null);
  const targetedVideoId = searchParams.get("videoId");

  useEffect(() => {
    const loadReels = async () => {
      try {
        const data = await fetchReels();
        let finalData = [...data]; 

        if (targetedVideoId) {
          const selectedReel = finalData.find((r) => r._id === targetedVideoId);

          if (selectedReel) {
            finalData = finalData.filter((r) => r._id !== targetedVideoId);
            finalData.unshift(selectedReel);
          }
        }

        setReels(finalData); 

        // Snap to top
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0;
        }
      } catch (error) {
        console.error("Error loading feed:", error);
      }
    };

    loadReels();
  }, [targetedVideoId]);

  return (
    
    <div className="fixed inset-0 bg-neutral-950 flex items-center justify-center z-0 pt-[80px] overflow-hidden font-sans">
      
      
      <div className="hidden sm:block absolute top-1/4 left-1/3 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="hidden sm:block absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      
      <div className="relative w-full h-full sm:w-[380px] sm:h-[800px] sm:max-h-[90vh] bg-black sm:rounded-[3rem] sm:border-[14px] sm:border-neutral-900 shadow-2xl overflow-hidden flex flex-col z-10">
        
       
        <div className="hidden sm:block absolute top-0 inset-x-0 h-6 bg-neutral-900 w-40 mx-auto rounded-b-3xl z-50 shadow-sm" />

        
        <div
          ref={scrollRef}
          className="w-full h-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar relative bg-neutral-900"
        >
          
          <div className="absolute top-0 left-0 w-full p-6 pt-10 sm:pt-8 z-40 flex justify-between items-center text-white bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-md">
              Bitezy.
            </h1>
            <div className="font-bold text-sm bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full pointer-events-auto cursor-pointer border border-white/10 shadow-lg hover:bg-white/20 transition-colors">
              Near You
            </div>
          </div>

         
          {reels.map((reel) => (
            <Reel
              key={reel._id}
              _id={reel._id}
              videoUrl={reel.videoUrl}
              dishName={reel.dishName}
              price={reel.price}
              restaurantName={reel.restaurant?.name || "Unknown Chef"}
            />
          ))}
        </div>
      </div>

      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default Feed;
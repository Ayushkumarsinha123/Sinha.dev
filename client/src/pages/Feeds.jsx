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
   
    <div className="absolute inset-0 flex justify-center bg-black sm:bg-gray-50">
      
      

      <div
        ref={scrollRef}
        className="w-full h-full sm:max-w-md sm:mx-auto bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar relative"
      >
        
        <div className="absolute top-0 left-0 w-full p-4 z-10 flex justify-between items-center text-white bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
          <h1 className="text-2xl font-extrabold tracking-tight drop-shadow-md">
            FeedArea
          </h1>
          <div className="font-semibold drop-shadow-md pointer-events-auto cursor-pointer">
            Near You
          </div>
        </div>

       
        {reels.map((reel) => (
          <Reel
            key={reel._id}
            videoUrl={reel.videoUrl}
            dishName={reel.dishName}
            price={reel.price}
            restaurantName={reel.restaurant?.name || "Unknown Chef"}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
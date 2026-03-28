import { useRef, useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CartContext"

const Reel = ({ _id, videoUrl, dishName, restaurantName, price }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { addToCart } = useCart()

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8, // Video must be 80% visible to trigger
    };

    const handlePlay = (entries) => {
      entries.forEach((entry) => {
        // 👇 Safety check to prevent React crashes!
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(handlePlay, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleOrderClick = (e) => {
    e.stopPropagation(); 
    addToCart({
      _id,
      dishName,
      price,
      restaurantName
    });
    // Optional: You could replace this alert with a cool toast notification later!
    alert(`Added ${dishName} to your cart! 🛒`);
  };

  return (
    // 👇 Notice the change to h-full here so it fits perfectly inside the phone!
    <div className="relative w-full h-full snap-start bg-neutral-900 flex justify-center overflow-hidden shrink-0">
      
      {/* Video Player */}
      <video
        ref={videoRef}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
        src={videoUrl}
        loop
        muted 
      />

     
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white pb-24 sm:pb-8 z-10">
        
       
        <div className="mb-4 pr-16">
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold text-orange-400 mb-3 shadow-sm">
            📍 {restaurantName}
          </div>
          <h2 className="text-3xl font-extrabold mb-1 drop-shadow-lg leading-tight">{dishName}</h2>
        </div>
        
       
        <button 
          onClick={handleOrderClick}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:scale-[1.02] shadow-[0_0_15px_rgba(249,115,22,0.4)] text-white font-black text-lg py-4 px-6 rounded-full w-full flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <ShoppingCartIcon />
          Add to Cart • ₹{price}
        </button>
      </div>

      
      <div className="absolute right-4 bottom-32 sm:bottom-28 flex flex-col gap-6 items-center text-white z-20">
        
        
        <div className="w-12 h-12 rounded-full border-2 border-white bg-orange-500 flex items-center justify-center font-bold shadow-lg overflow-hidden text-xl">
          {restaurantName.charAt(0).toUpperCase()}
        </div>

        <div className="flex flex-col items-center group">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-full border border-white/10 group-hover:bg-white/20 transition-colors cursor-pointer shadow-lg">
            <FavoriteBorderIcon fontSize="medium" />
          </div>
          <span className="text-xs font-bold mt-1.5 drop-shadow-md">1.2k</span>
        </div>

        <div className="flex flex-col items-center group">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-full border border-white/10 group-hover:bg-white/20 transition-colors cursor-pointer shadow-lg">
            <ShareIcon fontSize="medium" />
          </div>
          <span className="text-xs font-bold mt-1.5 drop-shadow-md">Share</span>
        </div>
      </div>
    </div>
  );
};

export default Reel;
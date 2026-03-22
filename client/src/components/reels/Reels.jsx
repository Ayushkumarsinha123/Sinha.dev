import { useRef, useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../context/CartContext"

const Reel = ({ _id,videoUrl, dishName, restaurantName, price }) => {
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
    alert(`Added ${dishName} to your cart! 🛒`);
  };

  return (
    <div className="relative w-full h-screen snap-start bg-black flex justify-center">
      
      <video
        ref={videoRef}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
        src={videoUrl}
        loop
        muted 
      />

      {/* Dish & Restaurant Info */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent text-white">
        <h2 className="text-2xl font-bold mb-1">{dishName}</h2>
        <p className="text-sm font-light mb-3">📍 {restaurantName}</p>
        {/* The Magic Button */}
        <button 
          onClick={handleOrderClick}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full w-full flex items-center justify-center gap-2 transition-colors active:scale-95"
        >
          <ShoppingCartIcon />
          Order Now • ₹{price}
        </button>
      </div>

      {/* Right Overlay: Social Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center text-white">
        <div className="flex flex-col items-center">
          <div className="bg-black/40 p-3 rounded-full hover:bg-black/60 cursor-pointer">
            <FavoriteBorderIcon fontSize="large" />
          </div>
          <span className="text-xs mt-1">1.2k</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-black/40 p-3 rounded-full hover:bg-black/60 cursor-pointer">
            <ShareIcon fontSize="large" />
          </div>
          <span className="text-xs mt-1">Share</span>
        </div>
      </div>
    </div>
  );
};

export default Reel;

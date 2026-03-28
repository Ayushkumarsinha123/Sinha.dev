import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import FoodCat2 from "../assets/FoodCat2.jfif";
import { useAuth } from "../context/AuthContext";


const darkInputStyles = {
  input: { color: 'white' },
  label: { color: '#9ca3af' }, 
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: '#f97316' }, 
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
};

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);
      const loggedInUser = data.user || data; 
      
      login(loggedInUser, data.token);

      if (loggedInUser.role === "restaurant") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/feed", { replace: true });
      }
    } catch (err) {
      const backendErrorMessage = err.response?.data?.message || err.message;
      alert("Login failed: " + backendErrorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-4 relative overflow-hidden font-sans selection:bg-orange-500/30">
      
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-neutral-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl flex w-full max-w-5xl overflow-hidden border border-white/10 relative z-10 md:max-h-[85vh]"
      >
        
        
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center overflow-y-auto hide-scrollbar">
          <div className="mb-8 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              onClick={() => navigate('/')} 
              className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent cursor-pointer inline-block mb-2"
            >
              Bitezy.
            </motion.div>
            <p className="text-gray-400">Log in to pick up where you left off.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              sx={darkInputStyles}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              sx={darkInputStyles}
            />

            <button 
              type="submit" 
              className="mt-2 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-full font-bold text-lg hover:scale-[1.02] shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all"
            >
              Log In
            </button>
          </form>

          <p className="text-center mt-8 text-gray-400">
            Don't have an account yet?{" "}
            <span 
              onClick={() => navigate("/signup")} 
              className="text-orange-500 font-bold cursor-pointer hover:text-orange-400 hover:underline transition-all"
            >
              Sign Up
            </span>
          </p>
        </div>

        
        <div className="hidden md:block md:w-1/2 relative bg-neutral-950">
          <img
            src={FoodCat2}
            alt="Delicious Food"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-transparent to-transparent z-10" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-12 z-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            >
              <h2 className="text-white text-4xl font-extrabold leading-[1.1] mb-4">
                Ready for your <br/><span className="text-orange-500">next craving?</span>
              </h2>
            </motion.div>
          </div>
        </div>

      </motion.div>

      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

export default Login;
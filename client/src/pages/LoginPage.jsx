import { useContext, useState } from "react";
import { loginUser } from "../services/authService";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FoodCat2 from "../assets/FoodCat2.jfif";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Login() {
  const {login } = useAuth(); 
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);
      console.log(data);

      // save user globally 
      login(data, data.token);
      alert("Login successful");
      console.log(data);
      if(data.role === "restaurant") {
        navigate('/dashboard');
      } else {
        navigate("/feed")
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <div className="bg-white rounded-2xl shadow-xl flex w-full max-w-5xl overflow-hidden">

        
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              LOGIN
            </Button>

          </form>

        </div>

        
        <div className="hidden md:block md:w-1/2 h-[500px]">

          <img
            src={FoodCat2}
            alt="food cat"
            className="w-full h-full object-cover"
          />

        </div>

      </div>

    </div>
  );
}

export default Login;
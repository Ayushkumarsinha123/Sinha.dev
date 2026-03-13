import { useState } from "react";
import { signupUser } from "../services/authService";
import {useNavigate} from "react-router-dom"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FoodPanda from "../assets/FoodPanda.jfif"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useAuth } from "../context/AuthContext";

function Signup() {

  const navigate = useNavigate()
  const { login} = useAuth
    const [form, setForm ] = useState({
      name : "",
      email: "",
      password: ""
    });

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name] : e.target.value
      });
    };

    const handleSubmit = async(e) => {
      e.preventDefault();

      try{
        const data = await signupUser(form);
        console.log(data);

        // Save user globally
      login(data.user, data.token);
        alert("sinup successfull");

        if (form.role === "restaurant") {
        navigate("/dashboard");
      } else {
        navigate("/feed");
      }
      }
      catch(err){
        console.log(err);
        alert("signup failed")
      }
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl flex w-full max-w-4xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center">Signup</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                />

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
          
          <FormControl>
              <FormLabel>Who are you?</FormLabel>

              <RadioGroup
                row
                name="role"
                value={form.role}
                onChange={handleChange}
              >

                <FormControlLabel
                  value="customer"
                  control={<Radio />}
                  label="Customer"
                />

                <FormControlLabel
                  value="restaurant"
                  control={<Radio />}
                  label="Restaurant"
                />

              </RadioGroup>

            </FormControl>

            <Button type="submit" variant="contained" size="large">
              SIGN UP
            </Button>
        </form>
        </div>
        <div className="hidden md:block md:w-1/2 h-[500px]">
        
                  <img
                    src={FoodPanda}
                    alt="food panda"
                    className="w-full h-full object-cover"
                  />
        
                </div>
      </div>
      </div>
    )
}

export default Signup;
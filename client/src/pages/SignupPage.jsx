import { useState } from "react";
import { signupUser } from "../services/authService";

function Signup() {
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
        alert("sinup successfull");
      }
      catch(err){
        console.log(err);
        alert("signup failed")
      }
    }
    return (
      <div>
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}/>

          <input 
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}/>

          <input 
          type="password"
          name="password"
          placeholder="Password" 
          onChange={handleChange}/>

          <button type="submit">signup</button>
        </form>
      </div>
    )
}

export default Signup;
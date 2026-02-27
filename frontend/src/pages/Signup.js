import "./../styles/signup.css";
import { useState } from "react";
import { registerUser } from "../apis/auth.api.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await registerUser(form)
        navigate('/login')
    }
    catch{
        console.log(e.error)
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
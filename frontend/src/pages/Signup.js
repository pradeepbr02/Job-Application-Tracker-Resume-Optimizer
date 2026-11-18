import "./../styles/signup.css";
import { useState } from "react";
import { registerUser } from "../apis/auth.api.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try{
        await registerUser(form)
        navigate('/login')
    }
    catch(error){
        setError(error.message);
    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>

        <input
          type="text"
          name="name"
          aria-label="Full Name"
          value={form.name}
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          aria-label="Email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          aria-label="Password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

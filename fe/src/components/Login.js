import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth"; // Adjust the import path based on your project structure
import axios from "axios";
import toast from 'react-hot-toast';
import "../Navbar.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/login", { email, password });
      console.log(res.data); // Log the response for debugging
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-center mt-3 fs-3">LOGIN FORM</h1>
      <div className="container shadow pt-1 box">
        <form onSubmit={submitHandler}>
          <div className="mb-3 mt-3">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter email"
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pwd" className="mb-2">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-block mb-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

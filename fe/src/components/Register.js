
import { useState } from "react";
import "../Navbar.css";
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


function Register(){
  const [ firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/register", {
        firstname,
        email,
        lastname,
        password
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
    return(
     <div>
        <h1 className="text-center mt-3 fs-3">REGISTRATION FORM</h1>
        <div className="container shadow pt-1 box">
        <form onSubmit={ submitHandler}>
          <div className="mb-3 mt-3">
            <label for="product" className="mb-2">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="product"
              onChange={(e) => setFirstname(e.target.value)}
              
            required></input>
          </div>
          <div className="mb-3">
            <label for="quantity" className="mb-2">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              onChange={(e) => setLastname(e.target.value)}
             
            required></input>
          </div>
          <div class="mb-3 mt-3">
            <label for="email" className="mb-2">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              
            required></input>
          </div>
          <div class="mb-3">
            <label for="pwd" className="mb-2">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            
            required></input>
          </div>
          <div className="d-grid ">
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Submit
            </button>
          </div>
        </form>
        </div>
     </div>
    );
}
export default Register;
import "./App.css";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import AddSales from "./components/AddSales";
import TopSales from "./components/TopSales";
import TotalRevenue from "./components/TotalRevenue";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<AddSales />}></Route>
        <Route exact path="/Top5Sales" element={<TopSales />}></Route>
        <Route exact path="/Totalrevenue" element={<TotalRevenue />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;

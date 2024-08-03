import { useState } from "react";
import "../Navbar.css";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from 'react-hot-toast';

function AddSales() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [auth] = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate that quantity and amount are numbers
    const quantityNum = Number(quantity);
    const amountNum = Number(amount);

    if (isNaN(quantityNum) || isNaN(amountNum)) {
      toast.error("Quantity and Amount must be valid numbers");
      return;
    }

    if (!auth.token) {
      toast.error("Authentication token is missing");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/addsales",
        { product, quantity: quantityNum, amount: amountNum },
        {
          headers: {
            'Authorization': `Bearer ${auth.token}` // Include the token in the request headers
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error("Failed to enter");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-center mt-3 fs-3">ADD SALE ENTRY</h1>
      <div className="container shadow pt-2 box">
        <form onSubmit={submitHandler}>
          <div className="mb-3 mt-3">
            <label htmlFor="product" className="mb-2">Product Name</label>
            <input
              type="text"
              className="form-control shadow-0"
              id="product"
              onChange={(e) => setProduct(e.target.value)}
              name="product"
              value={product}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="mb-2">Quantity</label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              name="quantity"
              value={quantity}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="mb-2">Amount</label>
            <input
              type="text"
              className="form-control"
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>
          <div className="d-grid ">
            <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSales;

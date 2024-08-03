import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from 'react-hot-toast';

function TotalRevenue() {
  const [data, setData] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    if (!auth.token) {
      toast.error("Authentication token is missing");
      return;
    }

    axios
      .get("http://localhost:4000/addsales", {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [auth.token]);

  const totalAmount = data.reduce((total, item) => total + item.amount, 0);

  return (
    <div>
      <h1 className="text-center mt-3 fs-3">TODAY'S REVENUE IS {totalAmount}</h1>
    </div>
  );
}

export default TotalRevenue;

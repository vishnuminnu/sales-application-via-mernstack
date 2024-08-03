import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from 'react-hot-toast';

function TopSales() {
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
        console.error("error fetching data:", error);
      });
  }, [auth.token]);

  return (
    <div>
      <h1 className="text-center mt-3 fs-3">TOP SALES</h1>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Sales id:</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Sale Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopSales;

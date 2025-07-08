import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getAuthHeader } from "../../model/Model";



const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [count,setCount] = useState({
    productCount : "",
    userCount : "",
    orderCount : ""
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://stylarobackend.zeabur.app/monthlyOrderChart",{
          headers : getAuthHeader()
        })
        const rescount = await axios.get("https://stylarobackend.zeabur.app/getDashboardCount",{
          headers : getAuthHeader()
        })
        setCount(rescount.data)
        setOrderData(res.data);
      } catch (error) {

      }
    }
    fetchData()
  }, [])
  return (
    <div className="flex">
      <div className="w-full min-h-screen bg-gray-100">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Welcome, Admin</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">Users: {count.userCount}</div>
            <div className="bg-white p-6 rounded-xl shadow">Orders: {count.orderCount}</div>
            <div className="bg-white p-6 rounded-xl shadow">Product: {count.productCount}</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Monthly Orders</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

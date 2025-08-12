// src/pages/Admin/AdminAnalytics.jsx
import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ResponsiveContainer
} from 'recharts';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    axiosSecure.get('/api/analytics')
      .then(res => {
        setAnalytics(res.data);
      })
      .catch();
  }, [axiosSecure]);

  if (!analytics) return <p>Loading charts...</p>;

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-3xl font-bold mb-6">📈 Admin Analytics Dashboard</h2>

      {/* Pie Chart - Scholarships by Category */}
      <div className="w-full md:w-[600px] mx-auto">
        <h3 className="text-xl font-semibold mb-3">🎓 Scholarships by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={analytics.scholarshipByCategory}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {analytics.scholarshipByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Application by Status */}
      <div className="w-full md:w-[600px] mx-auto">
        <h3 className="text-xl font-semibold mb-3">📝 Applications by Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.applicationByStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

     
    </div>
  );
};

export default AdminAnalytics;

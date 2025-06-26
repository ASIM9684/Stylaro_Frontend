

const Dashboard = () => {
  return (
    <div className="flex">
   
      <div className="w-full min-h-screen bg-gray-100">
     
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Welcome, Admin</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">Users: 120</div>
            <div className="bg-white p-6 rounded-xl shadow">Orders: 85</div>
            <div className="bg-white p-6 rounded-xl shadow">Revenue: $9,200</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
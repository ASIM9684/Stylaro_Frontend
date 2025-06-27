import { Bell, Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow flex justify-between items-center p-4 px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">

        <button className="lg:hidden" onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 text-gray-600" />
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect, useRef } from "react";
import { Bell, Settings, Search, Menu } from "lucide-react";
import AddTaskButton from "./AddTaskButton";

function Header({
  onOpenModal,
  user,
  searchTerm,
  onSearchChange,
  onMenuClick,
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 z-40 flex justify-between items-center px-4 md:px-8 lg:px-10 h-16 bg-white border-b border-gray-200">
      {/* Mobile Hamburger */}
      <button
        onClick={onMenuClick}
        className="
          md:hidden
          mr-3
          p-2
          rounded-lg
          text-gray-700
          hover:bg-gray-100
          transition
        "
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Search */}
      <div className="flex items-center flex-1 max-w-md md:ml-2">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#f1f3ff] border-none rounded-full py-2 pl-10 pr-4 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 md:gap-3 lg:gap-4 ml-3 md:ml-4 lg:ml-6">
        <div className="hidden md:block">
          <AddTaskButton
            onClick={onOpenModal}
            className="px-3 py-2 lg:px-4 lg:py-2 text-xs lg:text-sm"
          />
        </div>

        <button className="hidden lg:flex text-gray-500 hover:bg-gray-100 p-2 rounded-full">
          <Bell size={20} />
        </button>

        <button className="hidden lg:flex text-gray-500 hover:bg-gray-100 p-2 rounded-full">
          <Settings size={20} />
        </button>

        <span className="hidden lg:block text-sm font-semibold text-gray-500">
          {user?.email?.split("@")[0]}
        </span>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu((prev) => !prev)}
            className="focus:outline-none"
          >
            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-8 h-8 rounded-full border border-gray-200 object-cover cursor-pointer"
            />
          </button>

          {/* Dropdown User Profile */}
          {showUserMenu && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-2 lg:hidden z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-500">Signed in as</p>
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user?.email?.split("@")[0]}
                </p>
              </div>

              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                <Bell size={18} />
                Notifications
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                <Settings size={18} />
                Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

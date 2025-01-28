// UserProfileDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaHeart, FaShoppingBag, FaQuestionCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { MdDashboard, MdBusinessCenter } from 'react-icons/md';

const UserProfileDropdown = ({ userImage, userName = "hader sh ali huzaifa" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { id: 1, label: 'View and edit your profile', icon: <FaUser />, divider: false },
    { id: 2, label: 'My Ads', icon: <MdDashboard />, divider: false },
    { id: 3, label: 'Favourites & Saved searches', icon: <FaHeart />, divider: false },
    { id: 4, label: 'Public Profile', icon: <FaUser />, divider: true },
    { id: 5, label: 'Buy Discounted Packages', icon: <MdBusinessCenter />, divider: false },
    { id: 6, label: 'Bought Packages & Billing', icon: <FaShoppingBag />, divider: true },
    { id: 7, label: 'Help', icon: <FaQuestionCircle />, divider: false },
    { id: 8, label: 'Settings', icon: <FaCog />, divider: true },
    { id: 9, label: 'Logout', icon: <FaSignOutAlt />, divider: false },
  ];

  return (
    <div className="relative font-roboto font-semibold" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
          {userImage ? (
            <img
              src={userImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-500" size={20} />
            </div>
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-gray-500 text-sm">Hello,</p>
            <p className="font-semibold text-gray-800">{userName}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <React.Fragment key={item.id}>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                  onClick={() => {
                    // Handle click actions here
                    if (item.label === 'Logout') {
                      // Handle logout
                      console.log('Logging out...');
                    }
                  }}
                >
                  <span className="text-gray-500">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
                {item.divider && <hr className="my-2 border-gray-200" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
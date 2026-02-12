import React, { useState } from 'react';
import { Search, Phone, Info, Settings, Bell, UserCircle, LogOut } from 'lucide-react';
import "./TopBar.css";

// 1. On définit le type des props attendues
interface TopBarProps {
  onLogout: () => void;
}

// 2. On applique l'interface au composant
const TopBar = ({ onLogout }: TopBarProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="topbar">
      <div className="logo-group">
        <div className="logo">
          ALTEA<span> - Flow</span>
        </div>
        <div className="slogan">Dirigez Librement.</div>
      </div>

      <div className="search-container">
        <input type="text" placeholder="Rechercher..." />
        <Search className="search-icon" size={18} />
      </div>
      
      <div className="topbar-actions">
        <div className="action-icons">
          <Phone size={18} />
          <Bell size={18} />
          <Settings size={18} />
          <Info size={18} />
        </div>

        <div className="user-profile-container">
          <div className="user-profile" onClick={() => setShowMenu(!showMenu)}>
            <UserCircle size={20} />
            <span>User</span>
          </div>

          {showMenu && (
            <div className="user-dropdown">
              <button onClick={onLogout} className="logout-btn">
                <LogOut size={14} />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
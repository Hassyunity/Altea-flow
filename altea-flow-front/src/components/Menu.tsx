import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Pour changer de page et savoir où on est
import "./Menu.css";
import { 
  Home, Mail, Ticket, List, User, Megaphone, 
  Database, BrainCircuit, Folder, Settings 
} from 'lucide-react';

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Détecte l'URL actuelle (ex: /mails)

  const menuItems = [
    { id: 'home', icon: Home, path: '/' },
    { id: 'mail', icon: Mail, path: '/mails' },
    { id: 'ticket', icon: Ticket, path: '/tickets' },
    { id: 'list', icon: List, path: '/tasks' },
    { id: 'user', icon: User, path: '/contacts' },
    { id: 'megaphone', icon: Megaphone, path: '/marketing' },
    { id: 'db', icon: Database, path: '/data' },
    { id: 'drive', icon: BrainCircuit, path: '/storage' },
    { id: 'folder', icon: Folder, path: '/files' },
  ];

  return (
    <aside className="side-menu">
      <div className="menu-icons">
        {menuItems.map((item) => (
          <React.Fragment key={item.id}>
            {item.id === 'ticket' && <div className="separator" />}
            
            <div 
              /* La classe 'active' dépend maintenant de l'URL actuelle */
              className={`menu-item-wrapper ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)} // Change l'URL au clic
            >
              <item.icon size={22} />
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="menu-bottom">
        <div className="separator" />
        <div 
          className={`menu-item-wrapper ${location.pathname === '/settings' ? 'active' : ''}`}
          onClick={() => navigate('/settings')}
        >
          <Settings size={22} />
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;
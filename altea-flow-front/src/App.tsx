import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mails from './pages/Mails';
import Ticket from './pages/Ticket';
import SideMenu from './components/Menu';
import TopBar from './components/TopBar';
import "./styles/pages.css";

// 1. On définit l'interface pour TypeScript pour accepter onLogout
interface AppProps {
  onLogout: () => void;
}

// 2. On passe onLogout dans les paramètres de la fonction
function App({ onLogout }: AppProps) {
  return (
    <Router>
      <div className="app-container">
        <SideMenu />
        <div className="main-wrapper">
          {/* 3. On transmet la fonction onLogout à la TopBar */}
          <TopBar onLogout={onLogout} />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mails" element={<Mails />} />
            <Route path="/tickets" element={<Ticket />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
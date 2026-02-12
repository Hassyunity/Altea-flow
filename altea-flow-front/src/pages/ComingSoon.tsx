import { Construction, Timer, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "../styles/pages.css";
import "./ComingSoon.css";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <main className="content-area coming-soon-flex">
          
          <div className="coming-soon-card">
            <div className="icon-pulse">
              <Construction size={60} />
            </div>
            
            <h1 className="coming-soon-title">Page en construction</h1>
            <p className="coming-soon-text">
              Nous travaillons dur pour vous offrir une expérience exceptionnelle. 
              Revenez très bientôt ! 🚀
            </p>

            <div className="progress-bar-container">
              <div className="progress-bar-fill"></div>
            </div>

            <button className="btn-back" onClick={() => navigate("/")}>
              <ArrowLeft size={18} /> Retourner au tableau de bord
            </button>
          </div>

          {/* Le bouton Chat FAB est déjà géré par ton pages.css */}
          <div className="chat-fab">
             <Timer size={24} />
          </div>

        </main>
      </div>
    </div>
  );
};

export default ComingSoon;
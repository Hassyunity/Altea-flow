import React from 'react';
import { AlertTriangle } from 'lucide-react';
import "./retard.css";

const RetardItem = ({ title, date }: { title: string; date: string }) => (
  <div className="retard-item-container">
    <div className="retard-card-row">
      {/* Section Gauche : Alerte et Date */}
      <div className="retard-info-left">
        <div className="retard-date-row">
           <AlertTriangle size={14} className="warning-icon" />
           <span className="retard-date-text">Échéance : {date}</span>
        </div>
        <div className="retard-main-row">
          <span className="retard-main-title">{title}</span>
        </div>
      </div>
      
      {/* Section Droite : Badge Urgent */}
      <div className="retard-priority-wrapper">
        <span className="badge-urgent">Urgent</span>
      </div>
    </div>
  </div>
);

const Retard = ({ style }: { style: React.CSSProperties }) => (
  <div className="retard-column-inner" style={style}>
    <RetardItem title="Finaliser les tests API" date="1 fév" />
    {/* Tu peux ajouter d'autres items ici */}
  </div>
);

export default Retard;
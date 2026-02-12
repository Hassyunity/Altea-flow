import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import "./retard.css";

// --- CONFIGURATION DYNAMIQUE DE L'API ---
const API_URL = import.meta.env.VITE_API_URL;

const RetardItem = ({ title, date }: { title: string; date: string }) => {
  // Formatage de la date si elle vient de la DB
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="retard-item-container">
      <div className="retard-card-row">
        <div className="retard-info-left">
          <div className="retard-date-row">
             <AlertTriangle size={14} className="warning-icon" />
             <span className="retard-date-text">Échéance : {formatDate(date)}</span>
          </div>
          <div className="retard-main-row">
            <span className="retard-main-title">{title}</span>
          </div>
        </div>
        
        <div className="retard-priority-wrapper">
          <span className="badge-urgent">Urgent</span>
        </div>
      </div>
    </div>
  );
};

const Retard = ({ style }: { style: React.CSSProperties }) => {
  const [lateTasks, setLateTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On suppose que tu créeras une route /tasks/overdue ou similaire sur ton Rails
    // Pour l'instant, on pointe vers /tasks ou on garde l'affichage si l'API n'est pas prête
    fetch(`${API_URL}/tasks`) 
      .then(res => res.json())
      .then(data => {
        // Optionnel : filtrer ici les tâches en retard si Rails ne le fait pas
        setLateTasks(Array.isArray(data) ? data.slice(0, 3) : []); // On en prend 3 pour l'exemple
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur chargement retards:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="retard-column-inner" style={style}>
      {loading ? (
        <p>Chargement...</p>
      ) : lateTasks.length > 0 ? (
        lateTasks.map((task) => (
          <RetardItem key={task.id} title={task.title} date={task.due_date} />
        ))
      ) : (
        /* Backup si l'API est vide pour le moment */
        <RetardItem title="Finaliser les tests API" date="1 fév" />
      )}
    </div>
  );
};

export default Retard;
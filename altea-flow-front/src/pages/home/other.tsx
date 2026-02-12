import React from 'react';
import { Check, X } from 'lucide-react';
import "./tache.css";

// Définition des types de statuts possibles
type TaskStatus = "todo" | "done" | "canceled";

interface TaskItemProps {
  title: string;
  date: string;
  status: TaskStatus; // Statut imposé par les données
  priority: "Faible" | "Moyen" | "Eleve";
}

const TaskItem = ({ title, date, status, priority }: TaskItemProps) => {
  return (
    <div className="task-item-container">
      {/* La classe dynamique change l'apparence de toute la carte */}
      <div className={`task-card-row status-${status}`}>
        
        <div className="task-info-left">
          <span className="task-date-text">{date}</span>
          
          <div className="task-title-group">
            {/* UN SEUL CERCLE : change selon le status */}
            <div className={`status-circle-single ${status}`}>
              {status === "done" && <Check size={12} strokeWidth={4} />}
              {status === "canceled" && <X size={12} strokeWidth={4} />}
              {/* Si "todo", le cercle reste vide */}
            </div>

            <span className="task-main-title">{title}</span>
          </div>
        </div>
        
        {/* Section Priorité : Affichage simple par tag */}
        <div className="priority-display">
          <div className={`priority-tag-static ${priority.toLowerCase()}`}>
            {priority}
          </div>
        </div>
      </div>
    </div>
  );
};

const Tache = ({ style }: { style?: React.CSSProperties }) => {
  // Exemple de données provenant d'une base de données ou d'un fichier de data
  const tachesData = [
    { title: "Ajout de design figma", date: "2 fév - 5 fév", status: "done" as const, priority: "Eleve" as const },
    { title: "Révision du code React", date: "6 fév", status: "todo" as const, priority: "Moyen" as const },
    { title: "Ancien test annulé", date: "1 fév", status: "canceled" as const, priority: "Faible" as const },
  ];

  return (
    <div className="tache-column-inner" style={style}>
      {tachesData.map((task, index) => (
        <TaskItem 
          key={index}
          title={task.title}
          date={task.date}
          status={task.status}
          priority={task.priority}
        />
      ))}
    </div>
  );
};

export default Tache;
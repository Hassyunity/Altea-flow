import React, { useState, useEffect } from 'react';
import { Check, X, Clock, PlusCircle, User } from 'lucide-react';
import "./tache.css";

type TaskStatus = "todo" | "done" | "canceled" | "create";

interface TaskItemProps {
  title: string;
  dueDate: string;
  createdAt: string;
  status: TaskStatus;
  priority: string;
  assignedTo: string;
}

const TaskItem = ({ title, dueDate, createdAt, status, priority, assignedTo }: TaskItemProps) => {
  // Formatage simple de la date pour l'affichage
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Pas d'échéance";
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="task-item-container">
      <div className={`task-card-row status-${status}`}>
        
        <div className="task-info-left">
          <div className="task-date-group">
             <span className="task-date-text">Échéance : {formatDate(dueDate)}</span>
          </div>
          
          <div className="task-title-group">
            <div className={`status-circle-single ${status}`}>
              {status === "done" && <Check size={12} strokeWidth={4} />}
              {status === "canceled" && <X size={12} strokeWidth={4} />}
              {status === "create" && <PlusCircle size={12} strokeWidth={2} />}
            </div>
            <span className="task-main-title">{title}</span>
          </div>
        </div>
        
        <div className="task-metadata-right">
          {/* Nom de la personne assignée */}
          <div className="assigned-info">
            <User size={14} className="icon-gray" />
            <span>{assignedTo || "Non assigné"}</span>
          </div>

          <div className={`priority-tag-static ${priority?.toLowerCase()}`}>
            {priority}
          </div>
        </div>
      </div>
    </div>
  );
};

const Tache = ({ style }: { style?: React.CSSProperties }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => console.error("Erreur chargement tasks:", err));
  }, []);

  if (loading) return <div className="loading-text">Chargement des tâches...</div>;

  return (
    <div className="tache-column-inner" style={style}>
      {tasks.length === 0 && <p>Aucune tâche pour le moment.</p>}
      {tasks.map((task) => (
        <TaskItem 
          key={task.id}
          title={task.title}
          dueDate={task.due_date}
          createdAt={task.created_at}
          status={task.status as TaskStatus}
          priority={task.priority}
          assignedTo={task.assigned_to}
        />
      ))}
    </div>
  );
};

export default Tache;
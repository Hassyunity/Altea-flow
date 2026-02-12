import React, { useState, useEffect } from 'react';
import { MapPinHouse, Video } from 'lucide-react';
import "./reunion.css";

interface Participant {
  name: string;
  email: string;
}

interface ReunionItemProps {
  startTime: string; // Vient de Rails (ISO string)
  endTime: string;   // Vient de Rails
  title: string;
  locationType: string;
  participants: Participant[];
  link?: string;
}

const ReunionItem = ({ startTime, endTime, title, locationType, participants, link }: ReunionItemProps) => {
  const [showParticipants, setShowParticipants] = useState(false);

  // Fonction pour formater l'heure proprement
  const formatTime = (dateStr: string) => {
    if (!dateStr) return "--:--";
    const date = new Date(dateStr);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="reunion-item-container">
      <div className="reunion-card-row">
        {/* Section GAUCHE : Lieu & Heure */}
        <div className="reunion-left">
          <div className="reunion-icon-box">
             {/* Icône dynamique selon le type de lieu */}
             {locationType === "Visio" ? 
                <Video size={18} strokeWidth={2.5} className="location-icon-trigger" /> : 
                <MapPinHouse size={18} strokeWidth={2.5} className="location-icon-trigger" />
             }
             
             <div className="location-tooltip">
                <p className="location-label">Lieu : <strong>{locationType}</strong></p>
                {locationType === "Visio" && link && (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="Visio-link">
                    Rejoindre la réunion
                  </a>
                )}
             </div>
          </div>
          <span className="reunion-time">
            {formatTime(startTime)} - {formatTime(endTime)}
          </span>
        </div>

        {/* Section CENTRE : Titre */}
        <div className="reunion-center">
          <span className="reunion-main-title">{title}</span>
        </div>
        
        {/* Section DROITE : Participants */}
        <div 
          className="reunion-participants-wrapper"
          onMouseEnter={() => setShowParticipants(true)}
          onMouseLeave={() => setShowParticipants(false)}
        >
          <span className="reunion-participants-text">
            {participants?.length || 0} Participants
          </span>
          
          {showParticipants && participants && participants.length > 0 && (
            <div className="participants-tooltip">
              <ul className="participants-list">
                {participants.map((p, i) => (
                  <li key={i} className="participant-item">
                    <strong>{p.name}</strong>
                    <span>{p.email}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Reunion = ({ style }: { style?: React.CSSProperties }) => {
  const [reunions, setReunions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // APPEL À L'API RAILS
  useEffect(() => {
    fetch("http://localhost:3000/meetings")
      .then(res => res.json())
      .then(data => {
        setReunions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur meetings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading-text">Chargement des réunions...</div>;

  return (
    <section className="reunion-column-inner" style={style}>
      {reunions.length === 0 && <p className="no-data">Aucune réunion prévue.</p>}
      {reunions.map((reunion) => (
        <ReunionItem 
          key={reunion.id}
          startTime={reunion.start_time}
          endTime={reunion.end_time}
          title={reunion.title}
          locationType={reunion.location_type}
          participants={reunion.participants}
          link={reunion.link}
        />
      ))}
    </section>
  );
};

export default Reunion;
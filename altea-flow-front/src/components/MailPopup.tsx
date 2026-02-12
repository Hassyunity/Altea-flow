import React from 'react';
import { X } from 'lucide-react';
import "../styles/MailPopup.css";

interface MailPopupProps {
  mail: any;
  onClose: () => void;
}

const MailPopup: React.FC<MailPopupProps> = ({ mail, onClose }) => {
  // Sécurité : si pas de mail, on ne rend rien
  if (!mail) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-info">
            <span className={`badge-cat ${mail.categorie?.toLowerCase()}`}>
              {mail.categorie}
            </span>
            <h3>{mail.nom}</h3>
            <p>
              {mail.adresse} • {mail.date_reception ? new Date(mail.date_reception).toLocaleDateString() : 'Date inconnue'}
            </p>
          </div>
          <button className="close-modal" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <div className="mail-full-content">
            {mail.contenu || "Aucun contenu pour ce message."}
          </div>
          {mail.liens && (
            <div className="mail-footer-link">
              <a href={mail.liens} target="_blank" rel="noreferrer" className="toolbar-btn">
                Ouvrir le document joint
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MailPopup;
import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import "./login.css";

// Vite chargera automatiquement la valeur depuis :
// - .env.development (quand tu es sur ton ordi)
// - .env.production ou les paramètres Netlify (quand tu es en ligne)
const API_URL = import.meta.env.VITE_API_URL;

interface LoginProps {
  onLogin: (userData: any) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // On utilise l'URL dynamique récupérée par Vite
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user);
      } else {
        alert(data.error || "Erreur lors de la connexion");
      }
    } catch (error) {
      alert("Impossible de contacter le serveur. Vérifiez qu'il est bien lancé.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- LOGIQUE CALENDRIER (Inchangée) ---
  const today = new Date();
  const currentDayNum = today.getDate();
  const currentYear = today.getFullYear();
  const currentMonth = today.toLocaleString('fr-FR', { month: 'long' });
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return {
      dayNum: d.getDate(),
      isToday: d.getDate() === currentDayNum && d.getMonth() === today.getMonth()
    };
  });

  return (
    <div className="altea-login-container">
      <div className="altea-main-card">
        <div className="altea-form-side">
          <div className="altea-form-inner">
            <div className="altea-brand-container">
                <div className="altea-brand-name">Altea</div>
                <div className="altea-brand-subtitle">- Flow</div>
            </div>
            <h1 className="altea-title">Bon retour</h1>
            <p className="altea-subtitle">Veuillez saisir vos identifiants.</p>

            <form className="altea-inputs-form" onSubmit={handleSubmit}>
              <div className="altea-field">
                <label>Email Professionnel</label>
                <input 
                  type="email" 
                  placeholder="admin@altea.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="altea-field">
                <label>Mot de passe</label>
                <div className="altea-password-box">
                  <input 
                    type="password" 
                    placeholder="••••••••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <Eye size={16} className="altea-eye" />
                </div>
              </div>

              <button type="submit" className="altea-submit-btn" disabled={isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <div className="altea-footer-row">
              <a href="#">Mot de passe oublié ?</a>
              <a href="#" className="altea-terms">Contacter le support</a>
            </div>
          </div>
        </div>

        <div className="altea-visual-side">
          <div className="altea-widget-meeting">
            <div className="meeting-header">
              <div className="meeting-info">
                <h3>Daily Meeting</h3>
                <p>12:00pm - 01:00pm</p>
              </div>
              <div className="meeting-dot"></div>
            </div>
            <div className="meeting-avatars">
              <img src="https://i.pravatar.cc/100?u=1" alt="avatar" />
              <img src="https://i.pravatar.cc/100?u=2" alt="avatar" />
              <img src="https://i.pravatar.cc/100?u=3" alt="avatar" />
              <img src="https://i.pravatar.cc/100?u=4" alt="avatar" />
            </div>
          </div>

          <div className="altea-widget-calendar">
            <div className="cal-date-header">
              {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)} {currentYear}
            </div>
            <div className="cal-head">
              {dayNames.map((name) => <span key={name}>{name}</span>)}
            </div>
            <div className="cal-days">
              {weekDays.map((day, index) => (
                <span key={index} className={day.isToday ? "cal-active" : ""}>{day.dayNum}</span>
              ))}
            </div>
          </div>
          <div className="altea-abstract-circle"></div>
          <div className="altea-abstract-pill"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
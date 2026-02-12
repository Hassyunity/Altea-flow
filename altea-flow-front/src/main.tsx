import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Login from './Login.tsx'
import './index.css'

const RootComponent = () => {
  // On initialise l'état avec la valeur stockée dans le navigateur
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("altea_auth") === "true";
  });

  const login = () => {
    localStorage.setItem("altea_auth", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("altea_auth");
    setIsAuthenticated(false);
  };

  return (
    <StrictMode>
      {isAuthenticated ? (
        /* Si connecté : on affiche l'App en lui passant la fonction de déconnexion */
        <App onLogout={logout} />
      ) : (
        /* Si non connecté : on affiche le Login avec la fonction de connexion */
        <Login onLogin={login} />
      )}
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<RootComponent />);
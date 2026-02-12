import React, { useState } from 'react';
import PersonalizeDrawer from "../components/PersonalizeDrawer";
import Reunion from "./home/Reunion";
import Tache from "./home/Tache";
import Retard from "./home/Retard";
import { BotMessageSquare, Settings2 } from 'lucide-react';
import "./Home.css";
import "../styles/pages.css";

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sections, setSections] = useState([
    { id: 'meetings', title: 'Réunions' },
    { id: 'tasks', title: 'Tâches' },
    { id: 'overdue', title: 'Tâches en retard' }
  ]);

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <main className="content-area">
          <div className="page-header">
            <span className="current-date">mardi 10 février 2026</span>
            <button className="btn-personalize" onClick={() => setIsDrawerOpen(true)}>
              <Settings2 size={16} /> Personnaliser
            </button>
          </div>

          {/* <div className="dashboard-grid">
            {sections.map((section, index) => {
              const style = { animationDelay: `${index * 0.15}s` };
              
              switch (section.id) {
                case 'meetings': return <Reunion key="meetings" style={style} />;
                case 'tasks':    return <Tache key="tasks" style={style} />;
                case 'overdue':  return <Retard key="overdue" style={style} />;
                default:         return null;
              }
            })}
          </div> */}

          <PersonalizeDrawer 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)} 
            sections={sections} 
            onReorder={setSections} 
          />

          <div className="chat-fab">
            <BotMessageSquare size={50} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
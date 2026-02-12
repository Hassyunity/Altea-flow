import { useState } from 'react'; 
import PersonalizeDrawer from "../components/PersonalizeDrawer";
import Reunion from "./home/Reunion";
import Tache from "./home/Tache";
import Retard from "./home/Retard";
import { BotMessageSquare, Settings2, ChevronLeft, ChevronRight, Headphones, ClipboardList, Clock } from 'lucide-react';
import "./Home.css";

// 1. Définition de l'interface pour harmoniser les types entre Home et le Drawer
interface SectionItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // 2. Initialisation de l'état avec le type SectionItem[]
  const [sections, setSections] = useState<SectionItem[]>([
    { id: 'meetings', title: 'Réunions', icon: <Headphones size={18} /> },
    { id: 'tasks', title: 'Tâches', icon: <ClipboardList size={18} /> },
    { id: 'overdue', title: 'Tâches en retard', icon: <Clock size={18} /> },
    { id: 'other', title: 'Autres', icon: <Settings2 size={18} /> },
    { id: 'stats', title: 'Statistiques', icon: <ClipboardList size={18} /> }
  ]);

  const totalPages = Math.ceil(sections.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSections = sections.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <main className="content-area">
          
          <div className="page-header">
            <div className="header-left">
              <span className="current-date">mardi 10 février 2026</span>
            </div>

            <div className="header-center">
              <button className="btn-personalize-minimal" onClick={() => setIsDrawerOpen(true)}>
                <Settings2 size={16} /> <span>Personnaliser</span>
              </button>
            </div>

            <div className="header-right pagination-top">
              <button 
                className={`pagi-btn-top ${currentPage === 1 ? 'disabled' : ''}`} 
                onClick={handlePrev}
              >
                <ChevronLeft size={16} /> Précédent
              </button>
              
              <div className="pagi-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`pagi-num ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>

              <button 
                className={`pagi-btn-top ${currentPage === totalPages ? 'disabled' : ''}`} 
                onClick={handleNext}
              >
                Suivant <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="dashboard-grid">
            {currentSections.map((section) => (
              <div key={section.id} className="column-wrapper">
                <div className="column-title-card">
                  {section.icon} <span>{section.title}</span>
                </div>

                <div className="column-content-box">
                  {(() => {
                    switch (section.id) {
                      case 'meetings': return <Reunion style={{}} />; // Ajout de style={{}} pour TS
                      case 'tasks':    return <Tache style={{}} />;   // Ajout de style={{}} pour TS
                      case 'overdue':  return <Retard style={{}} />;  // Correction erreur TS2741
                      default:         return <div className="empty-state">Contenu {section.title}</div>;
                    }
                  })()}
                </div>
              </div>
            ))}
          </div>

          <PersonalizeDrawer 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)} 
            sections={sections} 
            // On force le type pour la compatibilité
            onReorder={(newOrder) => setSections(newOrder as SectionItem[])} 
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
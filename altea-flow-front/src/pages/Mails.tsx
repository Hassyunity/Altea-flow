import React, { useState, useEffect } from 'react';
import "./Mails.css";
import MailPopup from '../components/MailPopup';
import { 
  Search, Filter, ArrowUpDown, ChevronLeft, 
  ChevronRight, MoreHorizontal, BotMessageSquare 
} from 'lucide-react';

const Mails = () => {
  const [activeTab, setActiveTab] = useState('tous');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [mails, setMails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMail, setSelectedMail] = useState<any>(null);

  const categoriesMap: any = {
    tous: ['Plateau', 'RH', 'Facture', 'Devis', 'Finances', 'Direction', 'Informations'],
    clients: ['Facture', 'Devis', 'Informations'],
    internes: ['RH', 'Finances', 'Plateau', 'Direction']
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedCategory(''); 
    setShowFilters(false);
  };

  useEffect(() => {
    setLoading(true);
    const typeParam = activeTab === 'clients' ? 'client' : activeTab === 'internes' ? 'interne' : 'tous';
    
    let url = `http://localhost:3000/mail_items?mail_type=${typeParam}`;
    if (selectedCategory) {
      url += `&categorie=${selectedCategory}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMails(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur API:", err);
        setLoading(false);
      });
  }, [activeTab, selectedCategory]);

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <main className="content-area">
          <div className="mails-header-container">
            {/* Recherche */}
            <div className="search-bar-wrapper">
              <Search size={18} className="search-icon-mail" />
              <input type="text" placeholder="Rechercher un message..." className="mail-search-input" />
            </div>

            {/* Onglets */}
            <div className="tabs-container">
              <button className={`tab-btn ${activeTab === 'tous' ? 'active' : ''}`} onClick={() => handleTabChange('tous')}>Tous les mails</button>
              <button className={`tab-btn ${activeTab === 'clients' ? 'active' : ''}`} onClick={() => handleTabChange('clients')}>Mail Clients</button>
              <button className={`tab-btn ${activeTab === 'internes' ? 'active' : ''}`} onClick={() => handleTabChange('internes')}>Mail internes</button>
            </div>

            {/* Toolbar */}
            <div className="table-toolbar">
              <div className="toolbar-left">
                <div className="filter-wrapper">
                  <button className="toolbar-btn" onClick={() => setShowFilters(!showFilters)}>
                    <Filter size={16} /> 
                    {selectedCategory ? `Filtre: ${selectedCategory}` : 'Catégories'} {showFilters ? '▲' : '▼'}
                  </button>
                  {showFilters && (
                    <div className="filter-dropdown-content">
                      <div className="filter-opt reset" onClick={() => setSelectedCategory('')}>Réinitialiser</div>
                      {categoriesMap[activeTab].map((cat: string) => (
                        <div 
                          key={cat} 
                          className={`filter-opt ${selectedCategory === cat ? 'active-opt' : ''}`} 
                          onClick={() => {setSelectedCategory(cat); setShowFilters(false);}}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="toolbar-btn"><ArrowUpDown size={16} /> Trier ▼</button>
              </div>

              <div className="toolbar-right pagination">
                <button className="pagi-btn"><ChevronLeft size={16} /></button>
                <span className="pagi-number active">1</span>
                <button className="pagi-btn"><ChevronRight size={16} /></button>
              </div>
            </div>

            {/* Tableau */}
            <div className="mail-table-container">
              <table className="mail-table">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Nom <ArrowUpDown size={12} /></th>
                    <th>Catégorie</th>
                    <th>Date</th>
                    <th>Adresse mail</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: '50px' }}>Chargement...</td></tr>
                  ) : (
                    mails.map((mail, idx) => (
                      <tr key={mail.id || idx} onClick={() => setSelectedMail(mail)} className="clickable-row">
                        <td><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
                        <td>
                          <div className="nom-container">
                            <span className="nom-text">{mail.nom}</span>
                            <span className="contenu-preview">{mail.contenu?.substring(0, 35)}...</span>
                          </div>
                        </td>
                        <td><span className={`badge-cat ${mail.categorie?.toLowerCase()}`}>{mail.categorie}</span></td>
                        <td>{mail.date_reception ? new Date(mail.date_reception).toLocaleDateString() : 'N/A'}</td>
                        <td className="email-cell">{mail.adresse}</td>
                        <td><MoreHorizontal size={18} className="action-dots" /></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Appel du Popup */}
          <MailPopup 
            mail={selectedMail} 
            onClose={() => setSelectedMail(null)} 
          />

          <div className="chat-fab">
            <BotMessageSquare size={50} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Mails;
import { X, GripVertical } from 'lucide-react';
import "../styles/SaveBtn.css";
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';

interface Section {
  id: string;
  title: string;
}

interface PersonalizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sections: Section[];
  onReorder: (newOrder: Section[]) => void;
}

const PersonalizeDrawer = ({ isOpen, onClose, sections, onReorder }: PersonalizeDrawerProps) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onReorder(items);
  };

  return (
    <>
      {/* Overlay : Grise le fond et ferme le menu au clic */}
      {isOpen && <div className="overlay" onClick={onClose} />}
      
      {/* Sidebar : Glisse depuis la droite */}
      <div className={`personalize-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Personnaliser la mise en page</h3>
          <X className="close-btn" onClick={onClose} size={24} />
        </div>

        <div className="sidebar-content">
          <p className="sidebar-description">
            Faites glisser les sections pour changer l'ordre d'affichage sur votre tableau de bord.
          </p>
          
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sections-list">
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef} 
                  className="drag-list"
                >
                  {sections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided, snapshot) => (
                        <div 
                          className={`drag-item ${snapshot.isDragging ? 'dragging' : ''}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <GripVertical size={18} className="grip-icon" />
                          <span>{section.title}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="sidebar-footer">
          <button className="btn-cancel" onClick={onClose}>Annuler</button>
          <button className="btn-save" onClick={onClose}>Enregistrer</button>
        </div>
      </div>
    </>
  );
};

export default PersonalizeDrawer;
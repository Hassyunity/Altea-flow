class MailItem < ApplicationRecord
  # On définit les listes autorisées
  CAT_CLIENT = ['Facture', 'Devis', 'Informations']
  CAT_INTERNE = ['RH', 'Finances', 'Plateau', 'Direction']

  validates :mail_type, inclusion: { in: ['client', 'interne'] }
  validates :categorie, presence: true
  
  # Validation pour bloquer les erreurs de saisie
  validate :categorie_coherente_avec_type

  private

  def categorie_coherente_avec_type
    if mail_type == 'client' && !CAT_CLIENT.include?(categorie)
      errors.add(:categorie, "n'est pas valide pour un client")
    elsif mail_type == 'interne' && !CAT_INTERNE.include?(categorie)
      errors.add(:categorie, "n'est pas valide pour l'interne")
    end
  end
end
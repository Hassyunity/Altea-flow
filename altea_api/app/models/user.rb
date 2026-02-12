class User < ApplicationRecord
  has_secure_password

  # Validations
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :nom, :prenom, presence: true
  
  # Méthode utilitaire pour le nom complet
  def full_name
    "#{prenom} #{nom}"
  end
end
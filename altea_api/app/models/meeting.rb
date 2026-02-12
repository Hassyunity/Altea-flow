class Meeting < ApplicationRecord
  # Validations de base
  validates :title, :start_time, :end_time, :location_type, presence: true

  # Logique personnalisée : Le lien est obligatoire SI c'est une Visio
  validates :link, presence: true, if: :visio?

  def visio?
    location_type == "Visio"
  end
end
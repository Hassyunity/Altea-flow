class CreateMailItems < ActiveRecord::Migration[8.0]
  def change
    create_table :mail_items do |t|
      t.string :nom
      t.string :adresse
      t.string :telephone
      t.string :liens
      t.string :mail_type
      t.string :categorie
      t.date :date_reception
      t.string :objet

      t.timestamps
    end
  end
end

class AddContenuToMailItems < ActiveRecord::Migration[8.0]
  def change
    add_column :mail_items, :contenu, :text
  end
end

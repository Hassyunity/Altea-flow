class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :nom
      t.string :prenom
      t.string :email
      t.string :password_digest
      t.string :telephone
      t.string :role
      t.string :avatar_url
      t.datetime :last_login

      t.timestamps
    end
  end
end

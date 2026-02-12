class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.string :status
      t.string :priority
      t.string :assigned_to
      t.datetime :due_date

      t.timestamps
    end
  end
end

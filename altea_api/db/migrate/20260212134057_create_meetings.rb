class CreateMeetings < ActiveRecord::Migration[8.0]
  def change
    create_table :meetings do |t|
      t.string :title
      t.string :location_type
      t.datetime :start_time
      t.datetime :end_time
      t.string :link
      t.text :description
      t.json :participants

      t.timestamps
    end
  end
end

class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.integer :score
      t.string :name
      t.string :color
      t.timestamps
    end
  end
end

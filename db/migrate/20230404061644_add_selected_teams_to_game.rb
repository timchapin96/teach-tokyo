class AddSelectedTeamsToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :selectedTeams, :string, array: true, default: []
  end
end

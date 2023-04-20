class AddTeamScoreToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :teamScores, :json, default: {}
  end
end

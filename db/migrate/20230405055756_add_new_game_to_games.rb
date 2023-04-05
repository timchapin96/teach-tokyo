class AddNewGameToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :newGame, :boolean, default: true
  end
end

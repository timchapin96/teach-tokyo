class AddTurnOrderToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :turn_order, :string, array: true, default: []
  end
end

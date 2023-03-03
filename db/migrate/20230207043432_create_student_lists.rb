class CreateStudentLists < ActiveRecord::Migration[7.0]
  def change
    create_table :student_lists do |t|
      t.string :list_name
      t.string :banner
      t.string :description
      t.integer :user_id
      t.integer :student_count
      t.timestamps
    end
  end
end

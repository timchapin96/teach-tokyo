class AddUserIdToStudentLists < ActiveRecord::Migration[7.0]
  def change
    add_column :student_lists, :user_id, :integer
  end
end

class AddDescriptionAndStudentCountToStudentLists < ActiveRecord::Migration[7.0]
  def change
    add_column :student_lists, :description, :string
    add_column :student_lists, :student_count, :integer
  end
end

class AddNameToStudentList < ActiveRecord::Migration[7.0]
  def change
    add_column :student_lists, :list_name, :string
  end
end

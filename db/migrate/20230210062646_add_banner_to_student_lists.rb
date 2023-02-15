class AddBannerToStudentLists < ActiveRecord::Migration[7.0]
  def change
    add_column :student_lists, :banner, :string
  end
end

class CreateStudentLists < ActiveRecord::Migration[7.0]
  def change
    create_table :student_lists do |t|

      t.timestamps
    end
  end
end

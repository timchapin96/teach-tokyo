class StudentsController < ApplicationController
  def new
    @student = Student.new
    @student_list = StudentList.find(params[:student_list_id])
  end

  def create
    @student = Student.new(student_params)
    @student_list = StudentList.find(params[:student_list_id])
    @student.student_list = @student_list
    @student.save
    if @student.save
      redirect_to student_list_path(@student.student_list)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def student_params
    params.require(:student).permit(:name)
  end
end

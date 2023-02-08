class StudentListsController < ApplicationController
  def new
    @student_list = StudentList.new
  end

  def create
    @student_list = StudentList.new(student_list_params)
    @student_list.user = current_user
    @student_list.save
    if @student_list.save
      redirect_to student_lists_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def index
    @student_lists = StudentList.where(:user => current_user)
  end

  def show
    @student_list = StudentList.find(params[:id])
  end

  def student_list_params
    params.require(:student_list).permit(:list_name)
  end
end

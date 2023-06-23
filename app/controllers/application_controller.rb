class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  skip_before_action :authenticate_user!, only: :home
  def current_controller?(names)
    names.include?(current_controller)
  end
end

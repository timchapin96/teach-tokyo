class CustomSessionsController < ApplicationController
  skip_before_action :authenticate_user!
  def create
    demo_user = User.find_by(email: "chapin.timothy@yahoo.com")
    if demo_user
      demo_user.skip_confirmation!
      sign_in(demo_user)
      redirect_to root_path, notice: "Demo mode engaged! Any saved games will be automatically deleted in 10 days."
    else
      redirect_to root_path, alert: "Demo currently unavailable"
    end
  end
end

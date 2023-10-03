class CustomSessionsController < ApplicationController
  skip_before_action :authenticate_user!
  def create
    demo_user = User.find_by(email: "chapin.timothy@yahoo.com")
    if demo_user
      demo_user.skip_confirmation!
      sign_in(demo_user)
      redirect_to root_path, notice: t('demo_message.success')
    else
      redirect_to root_path, alert: t('demo_message.fail')
    end
  end
end

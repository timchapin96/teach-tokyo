class PagesController < ApplicationController
  def home
    @games = Game.where(user_id: current_user)
    @game = Game.new
    @demo_user = User.find_by(email: "chapin.timothy@yahoo.com")
  end
end

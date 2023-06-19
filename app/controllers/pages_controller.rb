class PagesController < ApplicationController
  def home
    @games = Game.where(user_id: current_user)
    @game = Game.new
  end
end

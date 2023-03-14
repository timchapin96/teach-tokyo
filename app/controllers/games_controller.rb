require "json"
class GamesController < ApplicationController
  def index
    @games = Game.all
  end
  def new
    @game = Game.new
  end

  def create
    @game = Game.new(game_params)
    @game.user_id = current_user.id
    if @game.save
      redirect_to games_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @game = Game.find(params[:id])

  end

  def edit
  end

  def update
    @game = Game.find(params[:id])
    prefecture_data = params["_json"]
    prefecture_data.each do |pref|
      prefecture = pref["prefecture"]
      color = pref["style"]
      @game.boardState[prefecture] = color
    end
    if @game.save
      p "Game Saved!"
    else
      p "Game not Saved :("
    end
    @game.boardState

    # Do something with pref_data he
    # parsed_data = JSON.parse(pref_data)
    # parsed_data.each do |pref|
    #   p pref
    # end
    # @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:title, :user_id, :boardState)
  end
  def game_params_save
    params.permit(:title, :user_id, :boardState)
  end

end

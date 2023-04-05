require "json"
class GamesController < ApplicationController
  def index
    @games = Game.where(user_id: current_user)
    @game = Game.new
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.new(game_params)
    @game.user_id = current_user.id
    if @game.save
      redirect_to game_path(@game)
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
    @game = Game.find(params["id"])
    if params["_json"]
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
    else
      @team_select = params[:teamSelect]
      @game.selectedTeams = @team_select
      @game.newGame = false
      if @game.save
        p "Teams Selected"
      else
        p "Error! :("
      end
    end
  end

  def game_params
    params.require(:game).permit(:title, :user_id, :boardState, :teamSelect, :newGame)
  end

  def game_params_save
    params.permit(:title, :user_id, :boardState)
  end
end

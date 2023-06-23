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
      render plain: @game.errors.full_messages.join(", "), status: :unprocessable_entity
    end
  end

  def show
    @games = Game.where(user_id: current_user)
    @game = Game.find(params[:id])
    @game_teams = @game.selectedTeams
    @team_score = @game.teamScores
  end

  def edit
  end

  def update
    @game = Game.find(params["id"])
    # Update game on save button click
    if params["_json"]
      prefecture_data = params["_json"]
      prefecture_data.each do |pref|
        team = pref["color"]
        prefecture = pref["prefecture"]
        color = pref["style"]
        @game.boardState[prefecture] = [color, team]
      end
      @game.save
    # Update team select on instance of new game
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

  def destroy
    if @game.destroy[params[:games_id]]
      redirect_to games_path, notice: "Game Deleted"
    end
  end

  def game_params
    params.require(:game).permit(:title, :user_id, :boardState, :teamSelect, :newGame, :teamScores)
  end

  def game_params_save
    params.permit(:title, :user_id, :boardState)
  end
end

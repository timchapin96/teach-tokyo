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
    @game_teams = Team.where(game_id: @game.id)
    @game_round = @game.round
    # @game_teams = Team.where(game_id: @game.id)
  end

  def edit
  end

  def update
    @game = Game.find(params["id"])
    @team_select = params[:teamSelect]
    # Update game on save button click
    if params["_json"]
      pp "WE ARE IN THE WRONG SPOT"
      prefecture_data = params["_json"]
      prefecture_data.each do |pref|
        team = pref["color"]
        prefecture = pref["prefecture"]
        color = pref["style"]
        @game.boardState[prefecture] = [color, team]
      end
      @game.save
      # Create teams for new game
    end
    if @team_select.present?
      pp @team_select
      @team_select.each do |team|
        new_team = Team.new(color: team, game_id: @game.id)
        if new_team.save
          pp "Team saved"
        else
          pp "Error saving team: #{new_team.errors.full_messages}"
        end
      end
      @game.round = 1
    end

    @game.newGame = false
    if @game.save
      p "Teams Selected"
    else
      p "Error! :("
    end
  end

  def destroy
    redirect_to games_path, notice: "Game Deleted" if @game.destroy[params[:games_id]]
  end

  def destroy_multiple
    if params[:game_ids]
      Game.destroy(params[:game_ids])
      redirect_to games_path, notice: t('delete_message.success')
    else
      p "Delete fail"
      redirect_to games_path, notice: t('delete_message.no_select')
    end
  end

  def game_params
    params.require(:game).permit(:title, :user_id, :boardState, :teamSelect, :newGame, :teamScores)
  end

  def game_params_save
    params.permit(:title, :user_id, :boardState)
  end
end

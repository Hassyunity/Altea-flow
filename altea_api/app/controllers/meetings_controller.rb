class MeetingsController < ApplicationController
  def index
    # On récupère toutes les réunions triées par heure de début
    @meetings = Meeting.all.order(start_time: :asc)
    
    # On renvoie le tout en JSON pour React
    render json: @meetings
  end

  def show
    @meeting = Meeting.find(params[:id])
    render json: @meeting
  end

  # Plus tard, tu pourras ajouter 'create' pour ajouter des réunions depuis l'interface
end
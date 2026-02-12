class MailItemsController < ApplicationController
  def index
    @mails = MailItem.all

    # Filtre par type (client, interne ou tous)
    if params[:mail_type].present? && params[:mail_type] != 'tous'
      @mails = @mails.where(mail_type: params[:mail_type])
    end

    # NOUVEAU : Filtre par catégorie
    if params[:categorie].present?
      @mails = @mails.where(categorie: params[:categorie])
    end

    render json: @mails.select(:id, :nom, :adresse, :telephone, :liens, :mail_type, :categorie, :date_reception, :contenu).order(date_reception: :desc)
  end
end
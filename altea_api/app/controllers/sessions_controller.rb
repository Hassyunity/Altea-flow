class SessionsController < ApplicationController
  # La méthode 'create' gère la tentative de connexion
  def create
    # 1. On cherche l'utilisateur par son email
    user = User.find_by(email: params[:email])

    # 2. On vérifie si l'utilisateur existe ET si le mot de passe est correct
    if user&.authenticate(params[:password])
      # Si c'est bon, on renvoie ses infos pour que React puisse les afficher
      render json: {
        authenticated: true,
        user: {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          role: user.role
        }
      }, status: :ok
    else
      # Si c'est faux, on renvoie une erreur 401
      render json: { 
        authenticated: false, 
        error: "Email ou mot de passe incorrect" 
      }, status: :unauthorized
    end
  end

  # Optionnel : une méthode pour "vérifier" la session au rafraîchissement
  def destroy
    render json: { message: "Déconnexion réussie" }, status: :ok
  end
end
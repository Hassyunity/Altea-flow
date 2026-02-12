Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # On ajoute l'URL de Netlify à la liste des origines autorisées
    origins "http://localhost:5173", "https://altea-flow.netlify.app"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true # Optionnel : utile si tu gères des sessions/cookies plus tard
  end
end
Rails.application.routes.draw do
  
  resources :user_maps
  resources :maps
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  # signup
  post "/signup", to: "users#create"
  # auto log in
  get "/me", to: "users#show"
  # login
  post "/login", to: "session#create"
  # logout
  delete "/logout", to: "session#destroy"
end
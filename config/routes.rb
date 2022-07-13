Rails.application.routes.draw do
  
  resources :reviews
  resources :users
  resources :user_tutors
  resources :tutors
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
  # custom route to destroy user_tutor using tutor.id params
  delete '/removeusertutor/:id', to: "user_tutor#destroy"
end

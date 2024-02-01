namespace :api do
  namespace :v1 do
    resources :groceries, only: :index
    post "/sessions", to: "sessions#create"
    delete "/sessions", to: "sessions#destroy"
  end
end

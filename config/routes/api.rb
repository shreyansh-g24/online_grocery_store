namespace :api do
  namespace :v1 do
    resources :groceries, only: :index
    post "/sessions", to: "sessions#create"
    delete "/sessions", to: "sessions#destroy"

    namespace :admin do
      resources :sessions, only: :create
      delete "/sessions", to: "sessions#destroy"
      resources :orders, only: :index
    end
  end
end

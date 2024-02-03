namespace :api do
  namespace :v1 do
    resources :groceries, only: :index

    namespace :customers do
      post "/sessions", to: "sessions#create"
      delete "/sessions", to: "sessions#destroy"
      resources :addresses, only: :index
    end

    namespace :admin do
      resources :sessions, only: :create
      delete "/sessions", to: "sessions#destroy"
      resources :orders, only: :index
    end
  end
end

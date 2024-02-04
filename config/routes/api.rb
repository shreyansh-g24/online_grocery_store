namespace :api do
  namespace :v1 do
    resources :groceries, only: :index

    namespace :customers do
      post "/sessions", to: "sessions#create"
      delete "/sessions", to: "sessions#destroy"
      resources :addresses, only: [:index, :create, :update]
      resources :orders, only: [:index, :create, :show, :update]
      resources :groceries_orders, only: [:create, :update, :destroy]
    end

    namespace :admin do
      resources :sessions, only: :create
      delete "/sessions", to: "sessions#destroy"
      resources :groceries, only: [:create, :update]
      resources :orders, only: [:index, :show, :update]
    end
  end
end

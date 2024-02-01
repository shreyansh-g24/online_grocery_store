namespace :api do
  namespace :v1 do
    resources :groceries, only: :index
  end
end

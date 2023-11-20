Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  post 'api/test', to: 'application#test'
  
  delete '/api/cart_items/delete-multiple', to: 'api/cart_items#delete_multiple'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    resources :items, only: [:show, :index]
    resources :cart_items, only: [:create, :show, :index, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
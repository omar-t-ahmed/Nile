Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  post 'api/test', to: 'application#test'
  
  delete '/api/cart_items/delete-multiple', to: 'api/cart_items#delete_multiple'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:show, :create, :destroy]
    resources :items, only: [:show, :index] do
      collection do
        get 'search'
        get 'category'
      end
    end
    
    resources :reviews, only: [:create, :show, :update,  :index, :destroy]
    resources :cart_items, only: [:create, :show, :update, :index, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
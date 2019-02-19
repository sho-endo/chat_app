Rails.application.routes.draw do
  root 'messages#index'
  get  '/users/serch', to: 'users#serch'
  devise_for :users
  resources :users, only: [:show]
  namespace :api, { format: 'json' } do
    resources :messages, only: [:index, :create]
    get '/users/serch', to: 'users#serch'
    get '/users/friends', to: 'users#friends'
    get '/users/return_current_user', to: 'users#return_current_user'
    resources :friendships, only: [:create, :destroy]
    patch '/friendships/update_last_access', to: 'friendships#update_last_access'
  end
end

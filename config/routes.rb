Rails.application.routes.draw do
  root 'messages#index'
  get  '/users/serch', to: 'users#serch'
  devise_for :users
  resources :users, only: [:show]
  namespace :api, { format: 'json' } do
    resources :messages, only: [:index, :create]
    get '/users/serch', to: 'users#serch'
    get '/users/friends', to: 'users#friends'
    get '/users/current', to: 'users#current'
    resources :friendships, only: [:create, :destroy]
  end
end

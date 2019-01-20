Rails.application.routes.draw do
  root 'messages#index'
  get  '/users/serch', to: 'users#serch'
  devise_for :users
  resources :users, only: [:show]
  namespace :api, { format: 'json' } do
    resources :messages, only: [:index, :create]
  end
end

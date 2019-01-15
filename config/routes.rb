Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  namespace :api, { format: 'json' } do
    resources :messages, only: [:index, :create]
  end
end

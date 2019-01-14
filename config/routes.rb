Rails.application.routes.draw do
  root 'messages#index'
  namespace :api, { format: 'json' } do
    resources :messages, only: [:index, :create]
  end
end

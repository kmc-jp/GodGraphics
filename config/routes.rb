# coding: utf-8
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'application#index'

  namespace :api do
    get '/upload/slack_channels', to: 'upload#slack_channels'
    get '/users/me', to: 'users#me'
    post '/users/:id/update' , to: 'users#update'
    post '/upload', to:'upload#post' 
    post '/folders/:id/update', to: 'folders#update'
    delete '/folders/:id', to: 'folders#destroy'
    get '/folders/:id/tags', to: 'tags#index'
    resources :folders , only: [:index,:show,:edit,:destroy]
    resources :images , only: [:index,:show]
    resources :users, only: [:index,:show,:edit]
    resources :tags, only: [:index,:show]
  end
  
  # それ以外はすべて
  get '*path', to: 'application#index'
end

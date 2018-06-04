# coding: utf-8
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'application#index'

    get '/slack_channels', to: 'application#slack_channels'
    get '/*path/users/me', to: 'users#me'
    post '/upload', to:'upload#post' 
    post '/folders/:id/update', to: 'folders#update'
    get '/users/:id' , to: 'users#detail'
    delete '/folders/:id', to: 'folders#destroy'
    get '/tags/:id', to: 'tags#show'
    get '/folders/:id/tags', to: 'tags#index'
    resources :folders , only: [:index,:show,:edit,:destroy]
    resources :images , only: [:index,:show]
    resources :users, only: [:index,:show,:edit]
    resources :tags, only: [:index]
  
  # それ以外はすべて
  #get '*path', to: 'application#index'
end

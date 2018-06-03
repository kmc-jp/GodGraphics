Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'application#index'
  
  get '/slack_channels', to: 'application#slack_channels'
  
  get '/upload', to: 'upload#index'
  post '/upload', to:'upload#post' 

  get '/folders', to: 'folders#summary'
  get '/folders/:id/detail', to: 'folders#detail'
  post '/folders/:id/update', to: 'folders#update'
 
  get '/mypage', to: 'users#me'
  get '/users/:id/detail' , to: 'users#detail'
  delete '/users/folders/:id', to: 'folders#destroy'
  
  get '/tags/all', to: 'tags#all'
  get '/folders/:id/tags/all' , to: "tags#all"
  get '/tags/:name', to: 'tags#show'
  get '/tags/:id/folders', to: 'tags#folders'

  resources :folders , only: [:index,:show,:edit,:destroy]
  resources :images , only: [:index,:show]
  resources :users, only: [:index,:show]
  resources :tags, only: [:index]
end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'application#index'
  get '/upload', to: 'upload#index'
  post '/upload', to:'upload#post' 
  get '/folders', to: 'folders#summary'
  get '/folders/:id/detail', to: 'folders#detail'
  get '/users/:id/detail' , to: 'users#detail'
  get '/mypage', to: 'users#me'
  post '/folders/:id/update', to: 'folders#update'
  delete '/users/folders/:id', to: 'folders#destroy'
  resources :folders , only: [:index,:show,:edit,:destroy]
  resources :images , only: [:index,:show]
  resources :users, only: [:index,:show]
end

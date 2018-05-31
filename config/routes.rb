Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'application#index'
  get '/upload', to: 'upload#index'
  post '/upload', to:'upload#post' 

  resources :folders , only: [:index,:show,:edit]do
    resources :graphics , only: [:index,:show]
  end
end

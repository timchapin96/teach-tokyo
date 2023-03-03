Rails.application.routes.draw do
  require "sidekiq/web"
  devise_for :users
  root to: "pages#home"
  resources :student_lists do
    resources :students, only: %I[new create edit]
  end

  authenticate :user, ->(user) { user.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  resources :chatrooms, only: :show
  resources :games, only: %I[index show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

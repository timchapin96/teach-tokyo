Rails.application.routes.draw do
  require "sidekiq/web"
  # Ask about the below line and white (:) is different to :/
  get '(:locale)' => 'pages#home'
  get '(:locale)' => 'apllication#change_locale'
  root to: "pages#home"
  scope "(:locale)", locale: /en|ja/ do
    devise_for :users

    resources :student_lists do
      resources :students, only: %I[new create edit]
    end

    authenticate :user, ->(user) { user.admin? } do
      mount Sidekiq::Web => '/sidekiq'
    end

    resources :chatrooms, only: :show
    resources :games do
      collection do
        delete 'destroy_multiple'
      end
    end
    patch '/change_locale/:locale', to: 'application#change_locale', as: 'change_locale'
    # patch '/change_locale/:locale', to: 'application#change_locale', as: 'change_locale'
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    # Defines the root path route ("/")
    # root "articles#index"
  end
end

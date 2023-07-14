class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  skip_before_action :authenticate_user!, only: %i[home change_locale]
  around_action :switch_locale

  # Method to redirect back to with new url
  # This was really annoying
  def redirect_to_back(options = {})
    uri = request.referer
    locale = params[:locale]
    uri = uri.split('/')
    uri[3] = locale
    uri = uri.join('/')
    redirect_to(uri, options)
  end

  def current_controller?(names)
    names.include?(current_controller)
  end

  def default_url_options
    { locale: I18n.locale }
  end

  def switch_locale(&)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &)
  end

  def change_locale
    redirect_to_back
  end
end

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  skip_before_action :authenticate_user!, only: :home
  around_action :switch_locale

  def current_controller?(names)
    names.include?(current_controller)
  end

  def parse_yaml(file)
    YAML.load(File.open(file))
  end

  def default_url_options
    { locale: I18n.locale }
  end

  def switch_locale(&)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &)
  end
end

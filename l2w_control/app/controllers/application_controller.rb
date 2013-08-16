class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def load_enabled_languages
    YAML.load(File.read(ENABLED_LANGUAGES_FILEPATH))
  end
end

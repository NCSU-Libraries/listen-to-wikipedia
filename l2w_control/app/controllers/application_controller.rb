class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def load_enabled_languages
    YAML.load(File.read(ENABLED_LANGUAGES_FILEPATH))
  end

  def current_tokens
    YAML.load(File.read(SIMPLE_TOKEN_FILEPATH))
  end

  def valid_token?
    current_tokens.include?(session[:token])
  end
  helper_method :valid_token?

  def check_cookies
    if !valid_token?
      flash[:notice] = 'You must enter the 3 character code on the wall to submit.'
      redirect_to pages_index_path
    end
  end

end

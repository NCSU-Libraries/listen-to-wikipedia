class ApiController < ApplicationController

  before_filter :check_cookies, only: [:submit]

  def catchall
    path = params[:path].dup
    if path.match %r{/qr}
      path = path.slice(0,3)
      UrlSourceLogger.info 'QR'
    else
      UrlSourceLogger.info 'URL'
    end
    if current_tokens.include?(path)
      session[:token] = path
    end
    redirect_to root_path
  end

  def submit
    if params['language']
      previous_enabled_languages = load_enabled_languages
      enabled_languages = params['language'].keys
      current_enabled_languages = {}

      previous_enabled_languages.each do |key, value|
        if enabled_languages.include?(key.to_s)
          current_enabled_languages[key] = true
        else
          current_enabled_languages[key] = false
        end
      end

      File.open(ENABLED_LANGUAGES_FILEPATH, 'w') do |fh|
        fh.puts YAML.dump(current_enabled_languages)
      end

      Pusher['listen_to_wikipedia'].trigger('update', {
        message: current_enabled_languages
      })
    else
      flash[:notice] = 'You have to select at least one Wikipedia language or data source.'
    end

    redirect_to :back if !request.xhr?
  end

  def submit_token
    if current_tokens.include?(params[:token])
      session[:token] = params[:token]
    else
      flash[:notice] = "You submitted an invalid token. Tokens only last for N minutes."
    end
    redirect_to root_path
  end

  def current_token
    render json: {token: current_tokens.last}
  end

  def push_update
    Pusher['listen_to_wikipedia'].trigger('update', {
      message: load_enabled_languages
    })
    head 200
  end

  def current_langs
    render json: load_enabled_languages
  end

  private



end

class ApiController < ApplicationController
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

      # TODO: Send a push message
      Pusher['listen_to_wikipedia'].trigger('update', {
        message: current_enabled_languages
      })
    else
      flash[:notice] = 'You have to select at least one Wikipedia language or data source.'
    end

    redirect_to :back if !request.xhr?
  end

  def push_update
    Pusher['listen_to_wikipedia'].trigger('update', {
      message: load_enabled_languages
    })
    head 200
  end

end

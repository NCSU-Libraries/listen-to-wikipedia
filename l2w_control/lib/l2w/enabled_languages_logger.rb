EnabledLanguagesLogger = ActiveSupport::Logger.new(Rails.root.join('log/enabled_languages.log'))
EnabledLanguagesLogger.formatter = Logger::Formatter.new
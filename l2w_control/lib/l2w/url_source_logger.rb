UrlSourceLogger = ActiveSupport::Logger.new(Rails.root.join('log/url_source.log'))
UrlSourceLogger.formatter = Logger::Formatter.new
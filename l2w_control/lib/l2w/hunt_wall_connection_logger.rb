HuntWallConnectionLogger = ActiveSupport::Logger.new(Rails.root.join('log/hunt_wall_connection.log'))
HuntWallConnectionLogger.formatter = Logger::Formatter.new
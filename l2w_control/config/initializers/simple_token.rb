SIMPLE_TOKEN_FILEPATH = File.join(Rails.root, 'tmp', 'tokens.yml')

if !File.exist? SIMPLE_TOKEN_FILEPATH
  File.open(SIMPLE_TOKEN_FILEPATH, 'w') do |fh|
    fh.puts YAML.dump([L2w.create_token])
  end
end

HUNT_WALL_IP = case Rails.env
when 'development'
  '127.0.0.1'
else
  '152.14.136.251'
end
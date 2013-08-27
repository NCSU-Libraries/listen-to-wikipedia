SIMPLE_TOKEN_FILEPATH = File.join(Rails.root, 'tmp', 'tokens.yml')

if !File.exist? SIMPLE_TOKEN_FILEPATH
  File.open(SIMPLE_TOKEN_FILEPATH, 'w') do |fh|
    fh.puts YAML.dump([L2w.create_token])
  end
end
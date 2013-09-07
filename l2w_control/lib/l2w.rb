require 'l2w/loggers'

module L2w

  def self.create_token
    (0..2).map{ ('a'..'z').to_a[SecureRandom.random_number(26)] }.join
  end

  def self.append_token
    tokens = YAML.load(File.read(SIMPLE_TOKEN_FILEPATH))
    new_token = self.create_token
    tokens << new_token
    if tokens.length > 3
      number_to_drop = tokens.length - 3
      tokens = tokens.drop(number_to_drop)
    end
    File.open(SIMPLE_TOKEN_FILEPATH, 'w') do |fh|
      fh.puts YAML.dump(tokens)
    end
    new_token
  end

end
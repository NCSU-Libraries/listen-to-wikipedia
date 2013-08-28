WIKIPEDIA_LANGUAGES = {
  wikidata:'Wikidata',
  en:'English',
  de:'German',
  ru:'Russian',
  ja:'Japanese',
  es:'Spanish',
  fr:'French',
  nl:'Dutch',
  it:'Italian',
  sv:'Swedish',
  ar:'Arabic',
  fa:'Farsi',
  he:'Hebrew' ,
  id:'Indonesian',
  as:'Assamese',
  hi:'Hindi',
  bn:'Bengali',
  pa:'Punjabi',
  te:'Telugu',
  ta:'Tamil',
  mr:'Western Mari',
  kn:'Kannada',
  or:'Oriya',
  sa:'Sanskrit',
  gu:'Gujarati'
}

# Don't want to set up a database for this so we'll just use a YAML file to save state
ENABLED_LANGUAGES_FILEPATH = File.join(Rails.root, 'tmp', 'enabled_languages.yml')

if !File.exist? ENABLED_LANGUAGES_FILEPATH
  yaml_to_write = {}
  WIKIPEDIA_LANGUAGES.keys.each do |key|
    yaml_to_write[key] = false
    yaml_to_write[key] = true if [:wikidata, :en].include?(key)
  end


  File.open(ENABLED_LANGUAGES_FILEPATH, 'w') do |fh|
    fh.puts YAML.dump(yaml_to_write)
  end
end
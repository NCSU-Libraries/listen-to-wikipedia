class PagesController < ApplicationController
  def index
    @enabled_languages = load_enabled_languages
  end

  def about
  end
end

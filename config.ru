require File.dirname(__FILE__) + '/vendor/gems/environment'
require 'start.rb'

Bundler.require_env
run Sinatra::Application

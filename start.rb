require 'sinatra'
require 'open-uri'
require 'haml'
require 'nokogiri'

before do
  content_type 'text/html', :charset => 'utf-8'
end

get '/rss' do
  content_type 'application/rss+xml'
  open(params[:url])
end

get '/fetch' do
  body = Nokogiri::HTML.parse(open(params[:url]).read)
  url = body.search('//link[@type=\'application/rss+xml\' or @type=\'application/atom+xml\']').first.get_attribute('href')
  redirect "/rss?url=#{url}"
end

get '/:username' do
  haml :index
end

get '/' do
  redirect "/#{params[:username]}" if params[:username]
  haml :index
end

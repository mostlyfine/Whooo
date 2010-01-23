require 'sinatra'
require 'open-uri'
require 'haml'
# require 'nokogiri'

before do
  content_type 'text/html', :charset => 'utf-8'
end

get '/' do
  haml :index
end

get '/rss' do
  content_type 'application/rss+xml'
  open(params[:url]) if params[:url]
end

get '/fetch' do
  body = Nokogiri::HTML.parse(open(params[:url]).read)
  content_type 'application/rss+xml'
  open(body.search('//link[@type=\'application/rss+xml\' or @type=\'application/atom+xml\']').first.get_attribute('href'))
end

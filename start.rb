require 'sinatra'
require 'open-uri'
require 'nokogiri'

sites = {
  'flickr' => 'http://www.flickr.com/photos/',
  'twitter' => 'http://twitter.com/'
}

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

get '/:site/:id' do
  url = sites[params[:site]] + params[:id]
  body = Nokogiri::HTML.parse(open(url).read)
  content_type 'application/rss+xml'
  open(body.search('//link[@type=\'application/rss+xml\']').first.get_attribute('href'))
end

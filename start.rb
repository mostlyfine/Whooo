require 'sinatra'
require 'open-uri'
require 'haml'
require 'nokogiri'

before do
  content_type 'text/html', :charset => 'utf-8'
end

get '/rss' do
  begin
    content_type 'application/rss+xml'
    open(params[:url])
  rescue
  end
end

get '/fetch' do
  begin
    body = Nokogiri::HTML.parse(open(params[:url]).read)
    url = body.search('//link[@type=\'application/rss+xml\' or @type=\'application/atom+xml\']').first.get_attribute('href')
    redirect "/rss?url=#{url}"
  rescue
  end
end

get '/:username' do
  begin
    content = Nokogiri::XML.parse(open("http://www.twitter.com/users/show.xml?screen_name=#{params[:username]}"))
    @name = content.xpath("//user/name").text
    @icon_url = content.xpath("//user/profile_image_url").text
  rescue
  end

  haml :index
end

get '/twitter/:username.rss' do
  begin
    content = Nokogiri::XML.parse(open("http://twitter.com/users/show/#{params[:username]}.xml"))
    id = content.xpath("//user/id").text
    url = "http://twitter.com/statuses/user_timeline/#{id}.rss"
    content_type 'application/rss+xml'
    open url
  rescue
  end
end

get '/' do
  redirect "/#{params[:username]}" if params[:username]
  haml :index
end

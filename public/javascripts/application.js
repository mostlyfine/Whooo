var sites = [
"/rss?url=http://friendfeed.com/__ID__?format=atom",
"/rss?url=http://__ID__.tumblr.com/rss",
"/rss?url=http://feeds.delicious.com/v2/rss/__ID__?count=15",
"/rss?url=http://github.com/__ID__.atom",
"/rss?url=http://b.hatena.ne.jp/__ID__/rss",
"/rss?url=http://clip.livedoor.com/rss/clips/__ID__",
"/rss?url=http://picasaweb.google.com/data/feed/base/user/__ID__?alt=rss&kind=album&hl=ja&access=public",
"/rss?url=http://gdata.youtube.com/feeds/base/users/__ID__/uploads?alt=rss&v=2&orderby=published&client=ytapi-youtube-profile",
"/rss?url=http://ws.audioscrobbler.com/1.0/user/__ID__/recenttracks.rss",
"/rss?url=http://www.slideshare.net/rss/user/__ID__",
"/rss?url=http://kskl.jp/users/__ID__.rss",
"/rss?url=http://www.rememberthemilk.com/atom/__ID__",
"/rss?url=http://brightkite.com/people/__ID__/objects.rss",
"/rss?url=http://api.wassr.jp/user_timeline.rss?id=__ID__",
"/rss?url=http://mediamarker.net/u/__ID__/rss",
"/rss?url=http://d.hatena.ne.jp/__ID__/rss",
"/rss?url=http://rssblog.ameba.jp/__ID__/rss20.xml",
"/rss?url=http://__ID__.blogspot.com/feeds/posts/default?alt=rss",
"/rss?url=http://blog.livedoor.jp/__ID__/index.rdf",
"/rss?url=http://__ID__.cocolog-nifty.com/blog/atom.xml",
"/rss?url=http://u.tabelog.com/rss2/rst_rvwr_rvwlst?msu=__ID__",
"/rss?url=http://booklog.jp/users/__ID__/feed",
"/rss?url=http://feeds.pandora.com/feeds/people/__ID__/stations.xml",
"/fetch?url=http://www.flickr.com/photos/__ID__",
"/twitter/__ID__.rss"
];

$(function() {
  $.easy.navigation();
  $.easy.tooltip();
  $.easy.popup();
  $.easy.external();
  $.easy.rotate();
  $.easy.forms();
  $.easy.showhide();
  $.easy.jump();
  if($("#username").val()) { rssLoad(); }
})

function rssLoad() {
  $.each(sites, function() {
    var rss_url = this.replace("__ID__", $("#username").val());
    $.getFeed({url: rss_url, success: showArticle});
  });
}

function showArticle(feed) {
  if(feed.items.length == 0) { return; }
  $("#shortcut").append("<li><a class='jump' href='#" + feed.title + "'>" + feed.title + "</a></li>");
  var buf = "<h1 id='" + feed.title + "'>" + feed.title + "</h1><ul>";
  buf += "<p><a href='" + feed.link + "'>" + feed.link + "</a></p>";
  $.each(feed.items, function() {
    buf += "<li class='list'>";
    buf += "<div class='title'>" + this.title + "</div>";
    buf += "<div class='link'>";
    buf += "<a href='" + this.link + "'>" + this.link + "</a>";
    buf += "</div>";
  buf += "<div class='desctiption'>" + this.description + "</div>";
    buf += "</li>";
  });
  buf += "</ul>";
  buf += "<p><a href='#top'>▲top</a></p><hr/>";
  $("#article").append(buf);
}

var sites = [
"/rss?url=http://friendfeed.com/_ID_?format=atom",
"/rss?url=http://_ID_.tumblr.com/rss",
"/rss?url=http://feeds.delicious.com/v2/rss/_ID_?count=15",
"/rss?url=http://b.hatena.ne.jp/_ID_/rss",
"/rss?url=http://picasaweb.google.com/data/feed/base/user/_ID_?alt=rss&kind=album&hl=ja&access=public",
"/rss?url=http://gdata.youtube.com/feeds/base/users/_ID_/uploads?alt=rss&v=2&orderby=published&client=ytapi-youtube-profile",
"/rss?url=http://ws.audioscrobbler.com/1.0/user/_ID_/recenttracks.rss",
"/rss?url=http://www.slideshare.net/rss/user/_ID_",
"/rss?url=http://brightkite.com/people/_ID_/objects.rss",
"/rss?url=http://d.hatena.ne.jp/_ID_/rss",
"/rss?url=http://rssblog.ameba.jp/_ID_/rss20.xml",
"/rss?url=http://api.wassr.jp/user_timeline.rss?id=_ID_",
"/rss?url=http://_ID_.blogspot.com/feeds/posts/default?alt=rss",
"/rss?url=http://mediamarker.net/u/_ID_/rss",
"/rss?url=http://blog.livedoor.jp/_ID_/index.rdf",
"/fetch?url=http://www.flickr.com/photos/_ID_",
"/fetch?url=http://twitter.com/_ID_"
];

$(function() {
  $("#load").click(function(e) {
    $.each(sites, function() {
      var rss_url = this.replace("_ID_", $("#url").val());
      $.getFeed({url: rss_url, success: showArticle});
    });
  });
})

function showArticle(feed) {
  var buf = "";
  $.each(feed.items, function() {
    buf += "<tr><td><a href='" + feed.link + "'>" + feed.title + "</a></td><td><a href='" + this.link + "'>" + this.title + "</a></td><td>" + this.updated + "</td></tr>";
    buf += "<tr><td colspan='3'>" + this.description + "</td></tr>";
  });
  $("#article").append(buf);
}

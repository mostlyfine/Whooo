var sites = [
"http://friendfeed.com/_ID_?format=atom",
"http://_ID_.tumblr.com/rss",
"http://feeds.delicious.com/v2/rss/_ID_?count=15",
"http://b.hatena.ne.jp/_ID_/rss",
"http://picasaweb.google.com/data/feed/base/user/_ID_?alt=rss&kind=album&hl=ja&access=public",
"http://gdata.youtube.com/feeds/base/users/_ID_/uploads?alt=rss&v=2&orderby=published&client=ytapi-youtube-profile",
"http://ws.audioscrobbler.com/1.0/user/_ID_/recenttracks.rss",
"http://www.slideshare.net/rss/user/_ID_",
"http://brightkite.com/people/_ID_/objects.rss",
"http://d.hatena.ne.jp/_ID_/rss",
"http://rssblog.ameba.jp/_ID_/rss20.xml",
"http://api.wassr.jp/user_timeline.rss?id=_ID_",
"http://_ID_.blogspot.com/feeds/posts/default?alt=rss",
"http://mediamarker.net/u/_ID_/rss",
"http://blog.livedoor.jp/_ID_/index.rdf"
];

$(function() {
  $("#load").click(function(e) {
    $.each(sites, function() {
      var rss_url = "/rss?url=" + this.replace("_ID_", $("#url").val());
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

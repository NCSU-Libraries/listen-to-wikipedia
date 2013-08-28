var pusher = new Pusher('bef9976092c8ba1e7452');
var channel = pusher.subscribe('listen_to_wikipedia');
var SOCKETS = {};

function show_wikimon_changes(data){
  for (var key in data) {
      if (data[key] == true){
        if (!SOCKETS[key]) {
          SOCKETS[key] = new wikipediaSocket.init(wikimon_langs[key][1], key);
          SOCKETS[key].connect();
        }
      } else {
        if (SOCKETS[key] && SOCKETS[key].connection) {
          SOCKETS[key].close();
        }
      }
    }
}


channel.bind('update', function(data) {
  if ($('#wikimon_changes').length > 0) {
    show_wikimon_changes(data.message);
  } else {
    location.reload();
  }
});
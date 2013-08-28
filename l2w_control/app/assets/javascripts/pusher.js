var pusher = new Pusher('bef9976092c8ba1e7452');
var channel = pusher.subscribe('listen_to_wikipedia');
var SOCKETS = {};
channel.bind('update', function(data) {
  if ($('#wikimon_changes').length > 0) {
    for (var key in data.message) {
      if (data.message[key] == true){
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
  } else {
    location.reload();
  }
});
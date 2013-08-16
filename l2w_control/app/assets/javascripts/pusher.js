var pusher = new Pusher('bef9976092c8ba1e7452');
var channel = pusher.subscribe('listen_to_wikipedia');
channel.bind('update', function(data) {
  location.reload();
});
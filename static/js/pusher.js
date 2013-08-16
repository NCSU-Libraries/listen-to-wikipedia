// Pusher.log = function(message) {
//   if (window.console && window.console.log) {
//     window.console.log(message);
//   }
// };

var pusher = new Pusher('bef9976092c8ba1e7452');
var channel = pusher.subscribe('listen_to_wikipedia');
channel.bind('update', function(data) {
  for (var key in data.message) {
    $('#active_languages .' + key).remove();
    if (data.message[key] == true){
      enable(key)
      $('#active_languages ul').append('<li class="' + key + '">'+ langs[key][0] + '</li>')
    } else {
      disable(key);
    }
  }
});

channel.bind('pusher:subscription_succeeded', function() {
  setTimeout(function(){
     $.ajax({
      url: "http://d.lib.ncsu.edu/l2w/api/push_update"
    });
  },2000);
});




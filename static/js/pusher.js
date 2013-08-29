// Pusher.log = function(message) {
//   if (window.console && window.console.log) {
//     window.console.log(message);
//   }
// };

var pusher = new Pusher('bef9976092c8ba1e7452', {authEndpoint: 'http://d.lib.ncsu.edu/l2w/api/wall_authenticate'});
var channel = pusher.subscribe('presence-listen_to_wikipedia');
channel.bind('update', function(data) {
  for (var key in data.message) {
    $('#active_languages .' + key).remove();
    if (data.message[key] == true){
      enable(key);
      $('#active_languages ul').append('<li class="' + key + '">'+ langs[key][0] + '</li>');
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


function get_current_token(){
  $.ajax({
    url: "http://d.lib.ncsu.edu/l2w/api/current_token"
  }).done(function(data){
    $('.token').html(data.token);
    $('#qrcode').html('');
    $('#qrcode').qrcode({width: 200,height: 200,text: "http://d.lib.ncsu.edu/l2w/" + data.token + "/qr"});
    set_timeout_get_current_token();
  });
}


$(function () {
  get_current_token();
});

function set_timeout_get_current_token(){
  setTimeout(function(){
    get_current_token();
  },60000);
}


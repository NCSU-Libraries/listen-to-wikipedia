// Pusher.log = function(message) {
//   if (window.console && window.console.log) {
//     window.console.log(message);
//   }
// };

var checkbox_update_alert_message = function(message, alert_type){
    var notice = '<div class="checkbox_change_alert '+ alert_type +'">' + message + '</div>';
    $('body').append(notice);
    $('.checkbox_change_alert').fadeOut(2000, function() { $(this).remove(); });
  }

var pusher = new Pusher('bef9976092c8ba1e7452', {authEndpoint: 'http://d.lib.ncsu.edu/l2w/api/wall_authenticate'});
// var pusher = new Pusher('bef9976092c8ba1e7452', {authEndpoint: 'http://localhost:3000/api/wall_authenticate'});

var channel = pusher.subscribe('presence-listen_to_wikipedia');
channel.bind('update', function(data) {
  for (var key in data.message) {
    if (data.message[key] == true){
      enable(key);
      if ($('#active_languages .' + key).length == 0) {
        checkbox_update_alert_message(langs[key][0] + " added.", 'added');

        $('#active_languages ul').append('<li class="' + key + '">'+ langs[key][0] + '</li>');
      }
    } else {
      disable(key);
      if ($('#active_languages .' + key).length > 0) {
        checkbox_update_alert_message(langs[key][0] + " removed.", 'removed')
        $('#active_languages .' + key).remove();
      }
    }
  }
});

channel.bind('pusher:subscription_succeeded', function() {
  setTimeout(function(){
    $.ajax({
      url: "http://d.lib.ncsu.edu/l2w/api/push_update"
      // url: "http://localhost:3000/api/push_update"
    });
  },2000);
});

// channel.bind('pusher:member_removed', function(member){
//   checkbox_update_alert_message('Remote control user removed.', 'removed');
// });

channel.bind('pusher:member_added', function(member){
  var channel_members_count = channel.members.count - 1;
  checkbox_update_alert_message('Remote control users: ' + channel_members_count, 'added');
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


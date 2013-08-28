    var wikimon_langs = {
        'en': ['English', 'ws://wikimon.hatnote.com:9000'],
        'de': ['German', 'ws://wikimon.hatnote.com:9010'],
        'ru': ['Russian', 'ws://wikimon.hatnote.com:9020'],
        'ja': ['Japanese', 'ws://wikimon.hatnote.com:9030'],
        'es': ['Spanish', 'ws://wikimon.hatnote.com:9040'],
        'fr': ['French', 'ws://wikimon.hatnote.com:9050'],
        'nl': ['Dutch', 'ws://wikimon.hatnote.com:9060'],
        'it': ['Italian', 'ws://wikimon.hatnote.com:9070'],
        'sv': ['Swedish', 'ws://wikimon.hatnote.com:9080'],
        'ar': ['Arabic', 'ws://wikimon.hatnote.com:9090'],
        'fa': ['Farsi', 'ws://wikimon.hatnote.com:9210'],
        'he': ['Hebrew' , 'ws://wikimon.hatnote.com:9230'],
        'id': ['Indonesian', 'ws://wikimon.hatnote.com:9100'],
        'as': ['Assamese', 'ws://wikimon.hatnote.com:9150'],
        'hi': ['Hindi', 'ws://wikimon.hatnote.com:9140'],
        'bn': ['Bengali', 'ws://wikimon.hatnote.com:9160'],
        'pa': ['Punjabi', 'ws://wikimon.hatnote.com:9120'],
        'te': ['Telugu', 'ws://wikimon.hatnote.com:9160'],
        'ta': ['Tamil', 'ws://wikimon.hatnote.com:9110'],
        'mr': ['Western Mari', 'ws://wikimon.hatnote.com:9130'],
        'kn': ['Kannada', 'ws://wikimon.hatnote.com:9170'],
        'or': ['Oriya', 'ws://wikimon.hatnote.com:9180'],
        'sa': ['Sanskrit', 'ws://wikimon.hatnote.com:9190'],
        'gu': ['Gujarati' , 'ws://wikimon.hatnote.com:9200'],
        'wikidata': ['Wikidata' , 'ws://wikimon.hatnote.com:9220']
    }

    var log_rc = function(rc_str, limit) {
    $('#rc-log').prepend('<li>' + rc_str + '</li>');
    if (limit) {
        if ($('#rc-log li').length > limit) {
            $('#rc-log li').slice(limit, limit + 1).remove();
        }
    }
};

function wikipediaSocket() {}
var wikimon_changes_play = true;

wikipediaSocket.init = function(ws_url, lid) {
    this.connect = function() {

        var loading = true;
        // Terminate previous connection, if any
        if (this.connection)
          this.connection.close();

        if ('WebSocket' in window) {
            var connection = new ReconnectingWebSocket(ws_url);
            this.connection = connection;

            // connection.onopen = function() {
            //     // console.log('Connection open to ' + lid);
            //     $('#' + lid + '-status').html('(connected)');
            // };

            // connection.onclose = function() {
            //     // console.log('Connection closed to ' + lid);
            //     $('#' + lid + '-status').html('(closed)');
            // };

            // connection.onerror = function(error) {
            //     $('#' + lid + '-status').html('Error');
            //     // console.log('Connection Error to ' + lid + ': ' + error);
            // };

            connection.onmessage = function(resp) {
                var data = JSON.parse(resp.data);

                if (data.ns == 'Main' && wikimon_changes_play) {
                    if (!isNaN(data.change_size)) {
                        if (data.summary &&
                            (data.summary.toLowerCase().indexOf('revert') > -1 ||
                            data.summary.toLowerCase().indexOf('undo') > -1 ||
                            data.summary.toLowerCase().indexOf('undid') > -1)) {
                            data.revert = true;
                        } else {
                            data.revert = false;
                        }
                        var rc_str = ''
                        // link to article

                        var data_url = data.url.replace(/&oldid=\d{1,100}/, '');
                        data_url = data_url.replace('?diff=', '?oldid=');

                        rc_str += ' <a href="' + data_url + '" target="_blank">' + data.page_title ;

                        //rc_str += '<a href="http://' + lid + '.wikipedia.org/wiki/User:' + data.user + '" target="_blank">' + data.user + '</a>';

                        rc_str += ' <span class="lang">(' + wikimon_langs[lid][0] + ')</span>';

                        // if (data.change_size < 0) {
                        //     if (data.change_size == -1) {
                        //         rc_str += ' removed ' + Math.abs(data.change_size) + ' byte';
                        //     } else {
                        //         rc_str += ' removed ' + Math.abs(data.change_size) + ' bytes';
                        //     }
                        // } else if (data.change_size === 0) {
                        //     rc_str += ' edited';
                        // } else {
                        //     if (data.change_size == 1) {
                        //         rc_str += ' added ' + Math.abs(data.change_size) + ' byte';
                        //     } else {
                        //         rc_str += ' added ' + Math.abs(data.change_size) + ' bytes';
                        //     }
                        // }


                        // if (data.is_anon) {
                        //     rc_str += ' <span class="log-anon">(unregistered user)</span>';
                        // }
                        // if (data.is_bot) {
                        //     rc_str += ' <span class="log-bot">(bot)</span>';
                        // }
                        // if (data.revert) {
                        //     rc_str += ' <span class="log-undo">(undo)</span>';
                        // }


                        // change the active languages to bold for a moment
                        // $('#active_languages ul li.' + lid).css('font-weight', 'bold');
                        // setTimeout(function(){
                        //     $('#active_languages ul li.' + lid).css('font-weight', 'normal');
                        // },300);
                        //

                        rc_str += '</a> ';

                        log_rc(rc_str, 20);


                    } else {
                        console.log('ValueError:' + change_size + 'is not a number');
                    }
                }
            };
        }
    };
    this.close = function() {
        if (this.connection) {
            this.connection.close();
        }
    };
};

wikipediaSocket.close = function() {
    if (this.connection) {
        this.connection.close();
    }
};


$(function () {
  $('#changes_play').hide();
  $('#changes_pause').on('click', function(){
    wikimon_changes_play = false;
    $('#changes_pause').hide();
    $('#changes_play').show();
  });
  $('#changes_play').on('click', function(){
    wikimon_changes_play = true;
    $('#changes_play').hide();
    $('#changes_pause').show();
  });


  if ($('#wikimon_changes').length > 0) {
    $.ajax({
      url: 'http://d.lib.ncsu.edu/l2w/api/current_langs'
    }).done(function(data){
      show_wikimon_changes(data);
    });
  }
});

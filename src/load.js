/** 
 *  LoadJS - A tiny javascript loader
 *  Description : LoadJS is a lightweight javascript module loader.
 *  Ver         : 1.0 (Beta)
 *  Auther      : Wave Studios
 *  License     : MIT
**/
var script_list = loadModules;

var ajaxrtn = false;
var script_index;
var script_innr_indx;
var urls;


function getSrc(inurl, task, cdnstatus) {
    if (task === 'cdn') {                                                  /****Task 1 [Parse array, Decide CDN Check or Fallback]***/
        //alert('cdn '+inurl+' came');
        var scripts_li = inurl;
        var i = window.script_index;
        if (Array.isArray(scripts_li) === true) {                               //If given is array of url(s) for all scripts
            var scripts_li = inurl;
            var i = window.script_index;
            window.urls = scripts_li[i];                                     
            //Parse to single script url(s)
            if (Array.isArray(window.urls) === true) {                          //If the single script url(s) is having cdn with local fallback
                window.script_innr_indx = 0;
                var url = window.urls[window.script_innr_indx];
                checkCdn(url);
            } else {
                if (window.script_index < window.script_list.length) {
                    Windowload(window.urls, false);
                    window.script_index++;
                    getSrc(window.script_list, 'cdn');
                }
            }
        } else {                                                                //If given is array of window.urls only for single script
            if (window.script_index < window.script_list.length) {
                Windowload(scripts_li[i], false);
            }
        }
    }

    if (task === 'cdnstatus') {                                            /****Task 2 [Check CDN Status]***/
        if (cdnstatus === 200) {
            Windowload(inurl, true);
            window.script_index++;
            getSrc(window.script_list, 'cdn');
            window.script_innr_indx = 0;
            //alert('status ' + inurl + ' came');
        } else {
            if (window.script_innr_indx < window.urls.length - 1) {
                window.script_innr_indx++;
                checkCdn(window.urls[window.script_innr_indx]);
            } else if (window.script_innr_indx === window.urls.length - 1) {
                Windowload(window.urls[window.script_innr_indx], false);
                window.script_index++;
                getSrc(window.script_list, 'cdn');
                window.script_innr_indx = 0;
            }
        }
    }
}


function checkCdn(url) {                                                 /****Ajax call***/

    if(url.match(/^https:/)){
        url = url.replace(url.match(/^https:/),'http:')
    }else if(url.match(/^\/\//)){   
        url = 'http:' + url;
    }

    var request;
    if (window.XMLHttpRequest){
        request = new XMLHttpRequest();
    } else {
        request=new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.onreadystatechange=function() {
        if (request.readyState==4){
            getSrc(url, 'cdnstatus', request.status);
        }
    }
    request.open("GET",url,true);
    request.send();
}
;


function Windowload(appendurl, cdnchk) {                                   /****Create new script element***/

    var embedcode = document.createElement('script');
    embedcode.type = 'text/javascript';

    if (cdnchk === true) {
        if (Array.isArray(appendurl) === true) {
            window.script_index = 0;
            getSrc(appendurl, 'cdn');
            //alert('cdn sent for checking'+appendurl);
        }
        else {
            embedcode.src = appendurl;
            //alert('cdn appended'+appendurl);

            document.body.appendChild(embedcode);
        }
    }
    else if (cdnchk === false || cdnchk === '') {
        embedcode.src = base_dir + '/' + appendurl;
        document.body.appendChild(embedcode);
    }
}


window.onload = function(event) {
    event.stopPropagation(true);
    Windowload(window.script_list, true);
};
const http = require('http');
var fetch = require('node-fetch');
const exec = require('child_process').exec;

let ipOrigin = '83.153.49.164';
let ipVpn = '';

let loop = function () {

    setInterval(function () {

        if (ipVpn == '') {
            http.get('http://checkip.amazonaws.com', function (res) {
                res.on('data', function (chunk) {
                    ipVpn += chunk;
                });
                res.on('end', function () {
                    // all data has been downloaded
                    ipVpn = ipVpn.trim(ipVpn.substr(ipVpn.length - 1));
                    console.log('ipVpn=', ipVpn);
                    if (ipVpn == ipOrigin) {
                        vpnOK = false;
                        console.log('kill utorrent');
                        exec('taskkill /f /IM utorrent.exe /T', (e, stdout, stderr)=> {
                            console.log('unable to kill utorrent');
                        });
                    } else {
                        vpnOK = true;
                    }
                    fetch(`http://nice-informatique-service.fr/geoip_service/geoip_service.php?ip=${ipVpn}&data=json`)
                        .then(res => res.json())
                        .then(function (json) {
                            console.log(json);
                        }).catch(function (err) {
                        console.log('geoloc error:', err);
                    });
                    ipVpn = ''
                });
            }).on('error', function (e) {
                console.log("Get ip error: " + e.message);
                exec('taskkill /f /IM utorrent.exe /T', (e, stdout, stderr)=> {
                    console.log('unable to kill utorrent');
                });
            });
        }
    }, 5000);
}

module.exports = loop;

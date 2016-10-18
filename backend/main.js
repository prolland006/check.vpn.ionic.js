const http = require('http');
var fetch = require('node-fetch');
const exec = require('child_process').exec;
const requestListener = require('./request-listener');

let ipOrigin = '83.153.49.164';
let ipVpn = '';

setInterval(function () {

    if (ipVpn == '') {
        http.get('http://checkip.amazonaws.com', function (res) {
            res.on('data', function (chunk) {
                ipVpn += chunk;
            });
            res.on('end', function () {
                // all data has been downloaded
                ipVpn=ipVpn.trim(ipVpn.substr(ipVpn.length-1));
                console.log('ipVpn=', ipVpn);
                if (ipVpn == ipOrigin) {
                    console.log('kill utorrent');
                    exec('taskkill /f /IM utorrent.exe /T', (e, stdout, stderr)=> {
                        console.log('unable to kill utorrent');
                    });
                }
                fetch(`http://nice-informatique-service.fr/geoip_service/geoip_service.php?ip=${ipVpn}&data=json`)
                    .then(res => res.json())
                    .then(function (json) {
                        console.log(json);
                    }).catch(function (err) {
                        console.log('geoloc error:',err);
                    });
                ipVpn = ''
            });
        }).on('error', function(e) {
            console.log("Get ip error: " + e.message);
            exec('taskkill /f /IM utorrent.exe /T', (e, stdout, stderr)=> {
                console.log('unable to kill utorrent');
            });
        });
    }
}, 5000);


const server = http.createServer(requestListener);
server.listen(3000, () => {
    console.log('server listening on port 3000');
});
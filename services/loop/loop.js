"use strict";
const http = require('http');
const fetch = require('node-fetch');
const exec = require('child_process').exec;

let ipOrigin = '83.153.49.164';
let ipVpn = '';

class loop {

    constructor(vpnOK = false, geolocData = null) {
        this.vpnOK = vpnOK;
        this.geolocData = geolocData;
        setInterval(() => {

            if (ipVpn == '') {
                http.get('http://checkip.amazonaws.com', (res) => {
                    res.on('data', (chunk) => {
                        ipVpn += chunk;
                    });
                    res.on('end', () => {
                        // all data has been downloaded
                        ipVpn = ipVpn.trim(ipVpn.substr(ipVpn.length - 1));
                        console.log('ipVpn=', ipVpn);
                        if (ipVpn == ipOrigin) {
                            this.vpnOK = false;
                            console.log('kill utorrent');
                            exec('taskkill /f /IM utorrent.exe /T', (error, stdout, stderr)=> {
                                if (error) {
                                    console.log('unable to kill utorrent');
                                    console.error(`exec error: ${error}`);
                                    return;
                                }
                                console.log(`stdout: ${stdout}`);
                                console.log(`stderr: ${stderr}`);
                            });
                        } else {
                            this.vpnOK = true;
                        }
                        fetch(`http://nice-informatique-service.fr/geoip_service/geoip_service.php?ip=${ipVpn}&data=json`)
                            .then(res => res.json())
                            .then((json) => {
                                console.log('json=',json);
                                this.geolocData = json;

                            }).catch(function (err) {
                            console.log('geoloc error:', err);
                        });
                        ipVpn = ''
                    });
                }).on('error', (e) => {
                    console.log("Get ip error: " + e.message);
                    exec('taskkill /f /IM utorrent.exe /T', (e, stdout, stderr)=> {
                        console.log('unable to kill utorrent');
                    });
                });
            }
        }, 5000);
    }

    get _vpnOK() {
        return this.vpnOK;
    }

    get _geolocData() {
        return this.geolocData;
    }

}
module.exports = loop;
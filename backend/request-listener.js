var http = require('http');

module.exports = (request, response)=>{
    //console.log(request);
    console.log('fetch');

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end("salut");
};


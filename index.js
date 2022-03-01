const http = require('http');
http.createServer((req,res)=>{
    console.log('Request for ' + req.url + ' by method ' + req.method);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end("Server Started");
}).listen(8080,"localhost",function(){
    console.log('Server running at http://localhost:8080');
});

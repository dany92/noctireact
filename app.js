import Express from 'express';
import { createServer } from 'http';
import path from 'path';
import bodyParser from 'body-parser';

import Business from './seed/business-seed'

let app = Express();
let server = createServer();
let PORT = 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// let npmPath = path.join(__dirname, '../node_modules');
// let publicPath = path.join(__dirname, '../public');

// app.use(Express.static(npmPath));
// app.use(Express.static(publicPath));

app.use('/api/business', (req,res,next) => res.send(Business));

app.use('/', function(req,res,next){
	res.sendFile(path.join(__dirname + '/index.html'))
});

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(500).send(err);
});

server.on('request', app);
server.listen(PORT, function(){
	console.log(`server listening on port: ${PORT}`);
})
'use strict';

const Hapi = require('hapi');
const Chatter = require('./chatter');
// Create a server with a host and port
const server = new Hapi.Server({ debug: { request: ['error'] } });
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Add the route
server.route({
    method: 'GET',
    path:'/help', 
    handler: function (request, reply) {
        const text = request.query.text;
        Chatter(text,(response)=>{
            reply(JSON.stringify(response));
        },(error)=>{
            reply(JSON.stringify(error));
        })
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
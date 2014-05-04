var request = require('request');

var endpoints = {
    droplets: 'droplets'
};

function DigitalOcean (clientId, apiKey) {
    this.baseUrl = 'https://api.digitalocean.com/';
    this.clientId = clientId;
    this.apiKey = apiKey;
}

DigitalOcean.prototype.listDroplets = function(cb) {
    this.send(endpoints.droplets, cb);
}

DigitalOcean.prototype.send = function(path, data, options, cb) {
    if (typeof data === 'function') {
        cb = data;
        data = {};
    } else if (typeof options === 'function') {
        cb = options;
        options = {};
    }

    path = this.baseUrl + path;
    data.api_key = this.apiKey;
    data.client_id = this.clientId;

    request.get({url: path, qs: data}, cb);
}

module.exports = DigitalOcean;
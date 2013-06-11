# Buses

A location-aware, responsive, blazing-fast London bus arrival website.

## About

Buses consumes Transport For London's bus arrival API, and uses HTML5
geolocation to show the user all bus stops within 300 meters.

It uses Flask, a bunch of JavaScript libraries, and nginx.

## Setup

1. `vagrant up`

Then check out http://127.0.0.1:8080/ in your browser.

## Under the hood

### HTTP lifecycle

1. [nginx] serves static content—including [HTML].
2. [The JavaScript] gets your location, and then sends a request to
[the bus times web service].
3. The bus times web service sends a request to TFL's API, parses the response,
and returns JSON—we can't really cache this as it has to be realtime.
4. The JavaScript uses Handlebars and a few other helper libraries (namely
Underscore.js and Moment.js) to show the response as HTML.

All static content is cached and gzipped, as well as [app cached]—so your next
pageload'll be blazing fast.

### Development environment

1. [Vagrant] sets up a virtual machine, and uses [the provisioning script] to
install all dependencies.
2. [Grunt tasks] install [front-end dependencies] using Bower, and concats and
minifies them for production.

Piece of cake.

[Grunt tasks]: Gruntfile.js
[HTML]: www/html/index.html
[The JavaScript]: www/static/js/main.js
[Vagrant]: Vagrantfile
[app cached]: www/static/production-manifest.appcache
[front-end dependencies]: bower.json
[nginx]: etc/nginx-production.conf
[the bus times web service]: buses/app.py
[the provisioning script]: etc/provision.sh

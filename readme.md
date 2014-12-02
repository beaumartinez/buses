# Buses

A location-aware, mobile, blazing-fast London bus arrivals website.

## About

Buses consumes Transport For London's bus arrival API, and uses HTML5
geolocation to show the user all bus stops within 300 meters.

It uses Flask, AngularJS, and nginx.

## Setup

ProTip™ make sure you've got Vagrant installed (it's awesome).

1. `vagrant up`

Then check out http://127.0.0.1:8080/ in your browser.

## Under the hood

### How shit works

1. Your browser requests the page.
2. [nginx] serves static content—including [HTML].
3. The page's [JavaScript] gets your location, and then sends a request to the
[bus arrivals web service].
4. The bus arrivals service sends a request to TFL's API, parses the response,
and returns JSON—this is the bottleneck; we can't cache this since it has to be
realtime.
5. We then use AngularJS magic to display the data on the page nicely.

All static content is cached and gzipped—so your next pageload will be blazing
fast.

### Development environment

1. [Vagrant] sets up a virtual machine, and uses the [provisioning script] to
install all dependencies (this took a lot of time and effort to get right, but
it was worth it).
2. [Grunt] installs [front-end dependencies] using Bower, and concats and
minifies them for production.

Piece of cake.

[Grunt]: Gruntfile.js
[HTML]: www/html/index.html
[JavaScript]: www/js/main-controller.js
[Vagrant]: Vagrantfile
[bus arrivals web service]: buses/app.py
[front-end dependencies]: bower.json
[nginx]: etc/nginx.conf
[provisioning script]: etc/provision.sh

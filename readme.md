# Buses

A location-aware, responsive, blazing-fast London bus arrival website.

## About

Buses consumes Transport For London's bus arrival API, and uses HTML5
geolocation to show the user all bus stops within 300 meters.

It uses Flask, a bunch of JavaScript libraries, and nginx.

## Setup

1. `vagrant up`
2. `vagrant ssh`

To run it:

1. `cd /vagrant`
2. `./development.sh &`

Then check out http://127.0.0.1:8080/ in your browser.

import flask

import __init__ as buses


app = flask.Flask(__name__)


@app.route('/<latitude>/<longitude>/')
def get_arrival_times(latitude, longitude):
    arrival_times = buses.get_arrival_times(latitude, longitude)

    return flask.Response(arrival_times, mimetype='application/json')

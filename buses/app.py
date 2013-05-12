import flask

import api


app = flask.Flask(__name__)


@app.route('/<latitude>/<longitude>/')
def get_arrival_times(latitude, longitude):
    status, arrival_times = api.get_arrival_times(latitude, longitude)

    return flask.Response(arrival_times, mimetype='application/json', status=status)

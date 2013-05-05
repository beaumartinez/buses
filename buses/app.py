import flask

import __init__ as buses


app = flask.Flask(__name__)


@app.route('/')
def home():
    return flask.render_template('home.html')


@app.route('/arrival-times/')
@app.route('/arrival-times/<latitude>/<longitude>/')
@app.route('/arrival-times/<latitude>/<longitude>/<radius>/')
def get_arrival_times(latitude=None, longitude=None, radius=buses.DEFAULT_RADIUS):
    arrival_times = buses.get_arrival_times(latitude, longitude, radius)

    return flask.Response(arrival_times, mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

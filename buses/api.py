import itertools
import json
import logging
import re

from furl import furl
from haversine import haversine
import requests


DEFAULT_RADIUS = 300


def _create_url(latitude, longitude, radius):
    latitude, longitude, radius = itertools.imap(str, (latitude, longitude, radius))

    url = furl('http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1')

    url.args['ReturnList'] = ','.join((
        'DestinationText',
        'EstimatedTime',
        'Latitude',
        'LineName',
        'Longitude',
        'StopID',
        'StopPointIndicator',
        'StopPointName',
        'Towards',
    ))
    url.args['Circle'] = ','.join((latitude, longitude, radius))

    url = str(url)

    return url


def get_arrival_times(latitude, longitude, radius=DEFAULT_RADIUS):
    latitude = float(latitude)
    longitude = float(longitude)

    url = _create_url(latitude, longitude, radius)

    try:
        response = requests.get(url)
    except requests.exceptions.ConnectionError:
        logging.warning('Couldn\'t connect to TFL\'s services')

        status = 500
        parsed_response = {
            'internal_error': 'Couldn\'t connect to TFL\'s services',
        }

        parsed_response = json.dumps(parsed_response)
    else:
        if response.status_code == 200:
            status = 200
            parsed_response = _parse_response(response.text, latitude, longitude)
        else:
            logging.warning('TFL error {} {}'.format(response.status_code, response.text))

            status = 502
            parsed_response = {
                'upstream_error': {
                    'status': response.status_code,
                    'content': response.text,
                },
            }

            parsed_response = json.dumps(parsed_response)

    return status, parsed_response


def _parse_response(response, latitude, longitude):
    lines = re.split('\n+', response)

    # First line is a version string
    stops = lines[1:]

    def _list_to_dict(stop):
        parsed_stop = {
            'stopName': stop[1],
            'stopId': stop[2],
            'towards': stop[3],
            'stopCode': stop[4],
            'latitude': stop[5],
            'longitude': stop[6],
            'route': stop[7],
            'destination': stop[8],
            'eta': stop[9],
        }

        parsed_stop['latitude'] = float(parsed_stop['latitude'])
        parsed_stop['longitude'] = float(parsed_stop['longitude'])

        return parsed_stop

    def _distance(stop):
        stop['distance'] = haversine((latitude, longitude), (stop['latitude'], stop['longitude']))

        return stop

    parsed_stops = itertools.imap(json.loads, stops)
    parsed_stops = itertools.imap(_list_to_dict, parsed_stops)
    parsed_stops = map(_distance, parsed_stops)

    json_stops = json.dumps(parsed_stops)

    return json_stops


if __name__ == '__main__':
    print get_arrival_times(latitude=51.5292769, longitude=-0.1825763)

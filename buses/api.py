import json
import logging
import re

import requests


DEFAULT_RADIUS = 300


def get_arrival_times(latitude, longitude, radius=DEFAULT_RADIUS):
    url = 'http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1?ReturnList=StopPointName,StopID,StopPointIndicator,DestinationText,LineName,EstimatedTime,Towards&Circle={},{},{}'.format(latitude, longitude, radius)
            
    response = requests.get(url)

    if response.status_code == 200:
        status = 200
        parsed_response = _parse_response(response.text)
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


def _parse_response(response):
    lines = re.split('\n+', response)

    # First line is a version string
    stops = lines[1:]

    parsed_stops = map(json.loads, stops)
    parsed_stops = map(lambda x: {
        'stopName': x[1], 
        'stopId': x[2], 
        'towards': x[3],
        'stopCode': x[4], 
        'route': x[5], 
        'destination': x[6], 
        'eta': x[7],
    }, parsed_stops)
        
    json_stops = json.dumps(parsed_stops)

    return json_stops

    
if __name__ == '__main__':
    print get_arrival_times(latitude=51.5292769, longitude=-0.1825763)

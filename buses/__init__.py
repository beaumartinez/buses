import json
import re

import requests


DEFAULT_RADIUS = 300


def get_arrival_times(latitude, longitude, radius=DEFAULT_RADIUS):
    url = 'http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1?ReturnList=StopPointName,StopID,StopPointIndicator,DestinationText,LineName,EstimatedTime&Circle={},{},{}'.format(latitude, longitude, radius)
            
    response = requests.get(url)
    parsed_response = _parse_response(response.text)

    return parsed_response


def _parse_response(response):
    lines = re.split('\n+', response)

    # First line is a version string
    stops = lines[1:]

    parsed_stops = map(json.loads, stops)
    parsed_stops = map(lambda x: {'stopName': x[1], 'stopId': x[2], 'stopCode': x[3], 'route': x[4], 'destination': x[5], 'eta': x[6]}, parsed_stops)
        
    json_stops = json.dumps(parsed_stops)

    return json_stops

    
if __name__ == '__main__':
    print get_arrival_times(latitude=51.5292769, longitude=-0.1825763)

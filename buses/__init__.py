import json
import re

import requests


def get_arrival_times(latitude=None, longitude=None, radius=100):
    url = 'http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1?ReturnList=StopPointName,StopPointIndicator,DestinationText,LineName,EstimatedTime'

    if not None in (latitude, longitude):
        url = url + '&Circle={},{},{}'.format(latitude, longitude, 100)
            
    response = requests.get(url)
    parsed_response = _parse_response(response.text)

    return parsed_response


def _parse_response(response):
    lines = re.split('\n+', response)

    # First line is a version string
    stops = lines[1:]

    parsed_stops = map(json.loads, stops)
    parsed_stops = map(lambda x: {'stopName': x[1], 'stopCode': x[2], 'route': x[3], 'destination': x[4], 'eta': x[5]}, parsed_stops)
        
    json_stops = json.dumps(parsed_stops)

    return json_stops

    
if __name__ == '__main__':
    print get_arrival_times(latitude=51.5292769, longitude=-0.1825763)

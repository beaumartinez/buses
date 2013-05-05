import json
import re

import requests


def get_arrival_times(location=None):
    url = 'http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1?ReturnList=StopPointName,StopPointIndicator,DestinationText,LineName,EstimatedTime'

    if location is not None:
        latitude, longitude = location

        url = url + '&Circle={},{},{}'.format(latitude, longitude, 100)
            
    response = requests.get(url)
    parsed_response = _parse_response(response.text)

    return parsed_response


def _parse_response(response):
    lines = re.split('\n+', response)

    # First line is a version string
    stops = lines[1:]

    parsed_stops = map(json.loads, stops)
    json_stops = json.dumps(parsed_stops)

    return json_stops

    
if __name__ == '__main__':
    print get_arrival_times((51.5292769, -0.1825763))

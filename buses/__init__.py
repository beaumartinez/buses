import requests
import json


def get_arrival_times(location=None):
    url = 'http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1'

    if location is not None:
        latitude, longitude = location

        url = 'http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1?Circle={},{},{}'.format(latitude, longitude, 100)
            
    response = requests.get(url)

    return response.text


if __name__ == '__main__':
    print get_arrival_times((51.5292769, -0.1825763))

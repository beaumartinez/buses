from collections import OrderedDict
from sys import argv

from app import app


if __name__ == '__main__':
    argv = OrderedDict(enumerate(argv))

    host = argv.pop(1, '0.0.0.0')
    port = argv.pop(2, '8000')

    port = int(port)

    app.run(debug=True, host=host, port=port)

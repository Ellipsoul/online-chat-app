import time
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

print("Backend is now running")

# {"time": 1581527730.5866282}

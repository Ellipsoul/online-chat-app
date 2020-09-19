import time
from flask import Flask, render_template

# Initialise app
app = Flask(__name__)
print("Backend is now running")

# Root directory
@app.route('/')
def index():
    return render_template('index.html')

# Testing by defining current time and accessing in the front end
@app.route('/time')
def get_current_time():
    return {'time': time.time()}

# Is this necessary for backend?
if __name__ == "__main__":
    app.run(debug=True)

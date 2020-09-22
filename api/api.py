import time
from flask import Flask, render_template, request, jsonify

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

@app.route('/api', methods=['GET', 'POST'])
def get_api():
    info = request.json
    print(info)
    return info

# Is this necessary for backend?
if __name__ == "__main__":
    app.run(debug=True)

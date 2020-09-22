import time
from flask import Flask, render_template, request, jsonify
from flask_restful import Api, Resource

# Initialise app
app = Flask(__name__)
api = Api(app)
print("Backend is now running")

messages = []

# Root directory
@app.route('/')
def index():
    return render_template('index.html')

class getTime(Resource):
    def get(self):
        return {'time':time.time()}
api.add_resource(getTime, "/time")

class send_message(Resource):
    def post(self):
        print('Reached post')
        message_data = request.json
        messages.append(message_data)
        print(f"Last message sent: {message_data}")
        print(f"All messages so far are {messages}")
        return
api.add_resource(send_message, "/send_message")

class get_messages(Resource):
    def get(self):
        return {"messages": messages}
api.add_resource(get_messages, "/get_messages")

@app.route('/api', methods=['GET', 'POST'])
def get_api():
    info = request.json
    print(info)
    return info

# Is this necessary for backend?
if __name__ == "__main__":
    app.run(debug=True)

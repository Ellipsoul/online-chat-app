import json
import time

from flask import Flask, jsonify, render_template, request
from flask_restful import Api, Resource

# Initialise app
app = Flask(__name__)
api = Api(app)
print("Backend is now running")

# TODO: Will need to be converted into a databse later
messages = []

# Root directory (likely not needed)
@app.route('/')
def index():
    return render_template('index.html')

# POST method to accept HTTP POST request from client, sending a message
class send_message(Resource):
    def post(self):
        message_data = request.json     # Retrieve message JSON data from client
        messages.append(message_data)   # Append message to all messages

        message_formatted = json.dumps(message_data, indent=2)
        messages_formatted = json.dumps(messages, indent=2)
        print(f"\nLast message sent:\n {message_formatted} \n")
        print(f"All messages so far:\n {messages_formatted}")

        return
api.add_resource(send_message, "/send_message")


class get_messages(Resource):
    def get(self):
        return {"messages": messages}
api.add_resource(get_messages, "/get_messages")

class clear_messages(Resource):
	def delete(self):
		global messages
		messages = []
		print("Messages cleared!")
		return
api.add_resource(clear_messages, "/clear_messages")

# Is this necessary for backend?
if __name__ == "__main__":
    app.run(debug=True)

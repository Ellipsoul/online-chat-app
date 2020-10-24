import json
import time
import os

from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
import sqlite3

# Initialise app
app = Flask(__name__)
api = Api(app)
CORS(app)

# Sqlite Connection and database creation
conn = sqlite3.connect('messages.db')
c = conn.cursor()
c.execute("""CREATE TABLE IF NOT EXISTS messages (
            name text,
            date text,
            message text,
            date_unix text
            )""")
conn.commit()
conn.close()
print("Backend is now running")

# Root directory (likely not needed)
@app.route('/api/')
def index():
    return app.send_static_file('index.html')

parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('date')
parser.add_argument('message')
parser.add_argument('date_unix')

# POST method to accept HTTP POST request from client, sending a message
class send_message(Resource):
    def post(self):
        args = parser.parse_args()
        print(args)
        print(request)
        print(request.json)
        # message_data = request.json     # Retrieve message JSON data from client

        conn = sqlite3.connect('messages.db')
        c = conn.cursor()
        # Set up message insertion and execute
        sqlite_insert = """ INSERT INTO messages 
                        (name, date, message, date_unix)
                        VALUES (?, ?, ?, ?); """
        # data_tuple = (message_data['name'], message_data['date'], message_data['message'], message_data['date_unix'])
        data_tuple = (args['name'], args['date'], args['message'], args['date_unix'])
        c.execute(sqlite_insert, data_tuple)
        conn.commit()
        conn.close()
        return
api.add_resource(send_message, "/api/send_message")


# GET method to retrieve all messages from the database
class get_all_messages(Resource):
    def get(self):
        conn = sqlite3.connect('messages.db')
        c = conn.cursor()
        c.execute("SELECT * FROM messages")
        all_messages = c.fetchall()
        conn.commit()
        conn.close()
        print("All messages sent to client:")
        print(all_messages)
        return {"all_messages": all_messages}
api.add_resource(get_all_messages, "/api/get_all_messages")


# GET method with query to retrieve all new messages not yet received by the user
class get_new_messages(Resource):
    def get(self):
        time = request.args.get('time')
        conn = sqlite3.connect('messages.db')
        c = conn.cursor()
        # Filter by unix time of latest message user has received
        c.execute(f"SELECT * FROM messages WHERE date_unix > {time}")
        new_messages = c.fetchall()
        conn.commit()
        conn.close()
        print("New messages sent to client:")
        print(new_messages)
        return {"new_messages": new_messages}
api.add_resource(get_new_messages, "/api/get_new_messages")


# DELETE method to clear all messages (DEV only)
class clear_messages(Resource):
    def delete(self):
        conn = sqlite3.connect('messages.db')
        c = conn.cursor()
        c.execute("""DELETE FROM messages""")
        conn.commit()
        conn.close()
        print("All messages cleared!")
        return
api.add_resource(clear_messages, "/api/clear_messages")


# DELETE method to clear messages more than one week old (DEV only)
class clear_old_messages(Resource):
    def delete(self):
        time = request.args.get('time')
        time_last_week = str(int(time) - 604800000)  # Deleting all messages more than one week old
        conn = sqlite3.connect('messages.db')
        c = conn.cursor()
        c.execute(f"DELETE FROM messages where date_unix < {time_last_week}")
        conn.commit()
        conn.close()
        print("Old messages cleared!")
        return
api.add_resource(clear_old_messages, "/api/clear_old_messages")

# Not necessary for backend
# if __name__ == "__main__":
#     app.run(debug=True)

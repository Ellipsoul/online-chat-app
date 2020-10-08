import json
import time

from flask import Flask, jsonify, render_template, request
from flask_restful import Api, Resource
import sqlite3

# Initialise app
app = Flask(__name__)
api = Api(app)
# Sqlite Connection and database creation
conn = sqlite3.connect('messages.db')
c = conn.cursor()
c.execute("""CREATE TABLE IF NOT EXISTS messages (
            name text,
            date text,
            message text
            )""")
# c.execute("""DELETE FROM messages""")
conn.commit()
conn.close()
print("Backend is now running")

# Root directory (likely not needed)
@app.route('/')
def index():
    return render_template('index.html')


# POST method to accept HTTP POST request from client, sending a message
class send_message(Resource):
    def post(self):
        message_data = request.json     # Retrieve message JSON data from client

        conn = sqlite3.connect('messages.db')
        c = conn.cursor()
        # Set up message insertion and execute
        sqlite_insert = """ INSERT INTO messages 
                        (name, date, message)
                        VALUES (?, ?, ?); """
        data_tuple = (message_data['name'], message_data['date'], message_data['message'])
        c.execute(sqlite_insert, data_tuple)
        conn.commit()
        conn.close()

        return
api.add_resource(send_message, "/send_message")


class get_all_messages(Resource):
    def get(self):
        conn = sqlite3.connect('messages.db')
        c = conn.cursor()
        c.execute("SELECT * FROM messages")
        all_messages = c.fetchall()
        conn.commit()
        conn.close()
        return {"messages": all_messages}
api.add_resource(get_all_messages, "/get_all_messages")


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

import sqlite3
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/persons', methods=['GET'])
def persons():
    if request.method == 'GET':
        con = get_db_connection()
        results = con.execute('SELECT * FROM person').fetchall()
        all_persons = [{k: item[k] for k in item.keys()} for item in results]
        return all_persons

@app.route('/ticket', methods=['POST'])
def ticket():
    if request.method == 'POST':
        con = get_db_connection()
        created_by = request.form['created_by']
        reason = request.form['reason']
        result = con.execute("INSERT INTO ticket (createdBy, reason) VALUES ({}, {})".format(created_by, reason))
        con.commit()
        return "done"

@app.route('/tickets', methods=['GET'])
def tickets():
    if request.method == 'GET':
        con = get_db_connection()
        results = con.execute('SELECT * from ticket').fetchall()
        all_tickets = [{k: item[k] for k in item.keys()} for item in results]
        return all_tickets 

app.run(host='localhost', port=8000, debug=True)


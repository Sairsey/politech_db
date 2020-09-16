import os
from flask import Flask, render_template, request
import sqlite3
from dbtools import DB
import json

app = Flask(__name__)

@app.route('/db_tools/<command>', methods=['post'])
def db_tools(command):
  if (command == "show_all_projects"):
    base = DB()
    msg = base.request("SELECT * from Projects")
    del base     
    return json.dumps(msg), 200
  return "Unknown command", 404


@app.route('/', methods=['post', 'get'])
def index_page():
  msg = ''
  if request.method == 'POST':
    query = request.form.get('query')
    print("going to run", query)
    base = DB()
    msg = base.request(query)
    msg = "\n".join([str(i) for i in msg])
    del base
  return render_template("index.html", message = msg)

@app.route('/index', methods=['post', 'get'])
def index2_page():
  msg = ''
  if request.method == 'POST':
    query = request.form.get('query')
    print("going to run", query)
    base = DB()
    msg = base.request(query)
    msg = "\n".join([str(i) for i in msg])
    del base
  return render_template("index.html", message = msg)


@app.route('/<page>')
def any_page(page):
  return render_template(page + ".html")

if __name__ == "__main__":
  if not os.path.isfile("database.db"):
    base = DB()
    base.init()
    del base
  app.debug = True 
  app.run()

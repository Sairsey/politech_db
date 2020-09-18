import os
from flask import Flask, render_template, request
from dbtools import DB
import json

app = Flask(__name__)

show_commands = dict()
show_commands["show_all_projects"] = "SELECT * from Projects"
show_commands["show_all_workers"] = "SELECT * from Workers"

add_commands = dict()
add_commands["add_project"] = "INSERT INTO Projects(Name, Time_start) VALUES ('%s', '%s')"
add_commands["add_worker"] = "INSERT INTO Workers(Name, Surname, Email, Pos, Is_fired) VALUES ('%s', '%s', '%s', '%s', 0)"

@app.route('/db_tools/<command>', methods=['post'])
def db_tools(command):
  if (command in show_commands):
    base = DB()
    msg = base.request(show_commands[command])
    del base
    return json.dumps(msg), 200
  command = command.split("&&&")
  if (command[0] in add_commands):
    base = DB()
    params = tuple(command[1].split("|"))
    msg = base.request(add_commands[command[0]], params)
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

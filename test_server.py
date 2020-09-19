import os
from flask import Flask, render_template, request
from dbtools import DB
import json

app = Flask(__name__)

show_commands = dict()
show_commands["show_active_projects"] = "SELECT * from Projects WHERE ifnull(Time_end, '') = ''"
show_commands["show_all_projects"] = "SELECT * from Projects"
show_commands["show_active_workers"] = "SELECT * from Workers WHERE Is_Fired = 0"
show_commands["show_all_workers"] = "SELECT * from Workers"
show_commands["show_active_bugs"] = "SELECT * from Bugs WHERE ifnull(Time_Fixed, '') = ''"
show_commands["show_all_bugs"] = "SELECT * from Bugs"
show_commands["show_min_staff"] = "SELECT ID_worker, Name, Surname from Workers"
show_commands["show_min_projects"] = "SELECT ID_proj, Name from Projects"

add_commands = dict()
add_commands["add_project"] = "INSERT INTO Projects(Name, Time_start) VALUES ('%s', '%s')"
add_commands["add_worker"] = "INSERT INTO Workers(Name, Surname, Email, Pos, Is_fired) VALUES ('%s', '%s', '%s', '%s', 0)"
add_commands["add_link"] = "INSERT INTO ProjectWorkerLinks(ID_proj, ID_worker, Is_active) VALUES (%s, %s, 1)"

count_commands = dict()
count_commands["count_worker_projects"] = "SELECT COUNT(*) FROM ProjectWorkerLinks WHERE ID_worker == '%s' AND Is_active = 1"
count_commands["count_worker_current_project"] = "SELECT COUNT(*) FROM ProjectWorkerLinks WHERE ID_worker == '%s' AND Is_active = 1 AND ID_proj == '%s'"

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
  if (command[0] in count_commands):
    base = DB()
    params = tuple(command[1].split("|"))
    msg = base.request(count_commands[command[0]], params)
    del base
    return json.dumps(msg), 200
  if (command[0] == "profile_data"):
    base = DB()
    params = tuple(command[1].split("|"))
    msg = None
    if (params[1] == "project"):
      msg = dict()
      msg['main'] = base.request("SELECT * from Projects WHERE ID_proj = '%s'" % (params[0]))
      tmp_links = base.request("SELECT * from ProjectWorkerLinks WHERE ID_proj = '%s'" % (params[0]))
      msg['childs'] = list()
      msg['active'] = list()
      for i in tmp_links:
        q = base.request("SELECT Name, Surname, Is_Fired, ID_worker from Workers WHERE ID_worker = '%s'" % (i[1]))
        msg['childs'].append(q)
        msg['active'].append(i[2])
    elif (params[1] == "staff"):
      msg = dict()
      msg['main'] = base.request("SELECT * from Workers WHERE ID_worker = '%s'" % (params[0]))
      tmp_links = base.request("SELECT * from ProjectWorkerLinks WHERE ID_worker = '%s'" % (params[0]))
      msg['childs'] = list()
      msg['active'] = list()
      for i in tmp_links:
        msg['childs'].append(base.request("SELECT Name, Time_start, ID_proj from Projects WHERE ID_proj = '%s'" % (i[0])))
        msg['active'].append(i[2])
    elif (params[1] == "bug"):
      pass
      #msg = dict()
      #msg['main'] = base.request("SELECT * from Bugs WHERE ID_bug = '%s'" % (params[0]))
      #msg['childs'] = list()
      #msg['childs'].append(base.request("SELECT * from Projects WHERE ID_proj = '%s'" % (msg['main'][1])))
      #msg['childs'].append(base.request("SELECT Name, Surname, Is_Fired from Workers WHERE ID_worker = '%s'" % (msg['main'][4])))
      #msg['childs'].append(base.request("SELECT Name, Surname, Is_Fired from Workers WHERE ID_worker = '%s'" % (msg['main'][5])))
      #msg['childs'].append(base.request("SELECT Name, Surname, Is_Fired from Workers WHERE ID_worker = '%s'" % (msg['main'][6])))
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

@app.route('/profile', methods=['GET', 'POST'])
def profile_page():
  id = request.args.get('id')
  type = request.args.get('type')
  return render_template("profile.html", id = id, type = type)

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

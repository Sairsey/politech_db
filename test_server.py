import os
from flask import Flask, render_template, request
from dbtools import DB
from mail import Mailer
import json

app = Flask(__name__)

action_commands = dict()
show_commands = dict()
add_commands = dict()
count_commands = dict()

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
  if (command[0] in action_commands):
    base = DB()
    params = tuple(command[1].split("|"))
    msg = base.action_request(action_commands[command[0]], params)
    del base
    return json.dumps(msg), 200
  if (command[0] == "send_email"):
    Mail_serv = Mailer("shullers.bot@ya.ru", "shullers")
    params = tuple(command[1].split("|"))
    email = params[1]
    msg = "Hello dear " + params[0] + "!\n"
    msg += "We are sorry to inform you, that you made/fixed after deadline " + params[2] + " bugs in month, and now you are fired!\n"
    msg += "Thank you for your hard work!"
    Mail_serv.send_email(email, msg)
    return "", 200
  if (command[0] == "show_victums"):
    base = DB()
    params = tuple(command[1].split("|"))
    msg = []
    # developers
    all_devs = base.request("SELECT ID_worker, Name || ' ' || Surname, Email FROM Workers WHERE Pos='Developer' AND Is_fired=0")
    all_testers = base.request("SELECT ID_worker, Name || ' ' || Surname, Email FROM Workers WHERE Pos='Tester' AND Is_fired=0")
    for i in all_devs:
      bugs_happend = base.request("SELECT COUNT(*) FROM Bugs WHERE ID_fault=" + str(i[0]) + " GROUP BY strftime('%m-%Y', Time_found)")
      for j in bugs_happend:
        if int(j[0]) >= int(params[0]):
          q = list(i)
          q.append(j[0])
          msg.append(q)
          break
    for i in all_testers:
      bugs_happend = base.request("SELECT COUNT(*) FROM Bugs WHERE ID_fixer=" + str(i[0]) +
                                  " AND ifnull(Time_fixed, date('now')) > Time_deadline GROUP BY strftime('%m-%Y', Time_found)")
      for j in bugs_happend:
        if int(j[0]) >= int(params[1]):
          q = list(i)
          q.append(j[0])
          msg.append(q)
          break
    del base
    return json.dumps(msg), 200
  if (command[0] == "profile_data"):
    base = DB()
    params = tuple(command[1].split("|"))
    msg = None
    if (params[1] == "project"):
      msg = dict()
      msg['main'] = base.request("SELECT * from Projects WHERE ID_proj = '%s'" % (params[0]))
      msg['childs'] = base.request("SELECT Name, Surname, Is_Fired, ID_worker from Workers WHERE ID_worker IN (SELECT ID_worker from ProjectWorkerLinks WHERE ID_proj = '%s')" % (params[0]))
      msg['active'] = base.request("SELECT Is_active from ProjectWorkerLinks WHERE ID_proj = %s" % (params[0]))
    elif (params[1] == "staff"):
      msg = dict()
      msg['main'] = base.request("SELECT * from Workers WHERE ID_worker = '%s'" % (params[0]))
      msg['childs'] = base.request("SELECT Name, Time_start, ID_proj from Projects WHERE ID_proj IN (SELECT ID_proj from ProjectWorkerLinks WHERE ID_worker = '%s') ORDER BY Time_start" % (params[0]))
      msg['active'] = base.request("SELECT pwl.Is_active from ProjectWorkerLinks pwl INNER JOIN Projects p ON pwl.ID_proj=p.ID_proj WHERE ID_worker = %s ORDER BY p.Time_start" % (params[0]))
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
  with open("commands.json") as f:
      data = json.load(f)
      show_commands = data["show_commands"]
      action_commands = data["action_commands"]
      add_commands = data["add_commands"]
      count_commands = data["count_commands"]
  app.debug = True 
  app.run()

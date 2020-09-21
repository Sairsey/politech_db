import sqlite3

class DB:
  def __init__(self):
    self.conn = sqlite3.connect('database.db')
    self.c = self.conn.cursor()
    return

  def action_request(self, request, params = []):
    if (params == []):
      self.c.execute(request)
    else:
      #print(request, params)
      self.c.executescript(request % params)
    self.conn.commit()
    return self.c.fetchall()

  def request(self, request, params = []):
    if (params == []):
      self.c.execute(request)
    else:
      print(request, params)
      self.c.execute(request % params)
    self.conn.commit()
    return self.c.fetchall()
  
  def init(self, file = "base_struct.sql"):
    qry = open(file).read()
    self.c.executescript(qry)
    self.conn.commit()
    return

  def __del__(self): 
    self.c.close()
    self.conn.close()    
    return
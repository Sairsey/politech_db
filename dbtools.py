import sqlite3

class DB:
  def __init__(self):
    print("DB inited")
    self.conn = sqlite3.connect('database.db')
    self.c = self.conn.cursor()
    return
  
  def request(self, request):
    self.c.execute(request)
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
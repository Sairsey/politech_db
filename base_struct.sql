CREATE TABLE Projects (
    ID_proj INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Time_start TEXT,
    Time_end TEXT  
);

CREATE TABLE Workers (
    ID_dev INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Surname TEXT,
    Email TEXT,
    Pos TEXT,
    Is_fired INTEGER
);

CREATE TABLE ProjectWorkerLinks (
    ID_worker INTEGER PRIMARY KEY,
    ID_dev INTEGER,
    Is_active INTEGER
);

CREATE TABLE Bugs (
    ID_bug INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_proj INTEGER, 
    Name TEXT,
    Category TEXT,
    ID_fault INTEGER,
    ID_finder INTEGER,
    ID_fixer INTEGER,
    Time_found TEXT,
    Time_deadline TEXT,    
    Time_fixed TEXT
);

INSERT INTO Projects(Name, Time_start) VALUES ("Test_Project1", datetime("now"));
INSERT INTO Projects(Name, Time_start, Time_end) VALUES ("Test_Project2", date('now','start of month', '-1 day'), datetime("now"));

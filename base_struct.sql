CREATE TABLE Projects (
    ID_proj INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Time_start TEXT,
    Time_end TEXT,    
    Is_closed INTEGER
);

CREATE TABLE Developers (
    ID_dev INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Surname TEXT
);

CREATE TABLE Testers (
    ID_test INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Surname TEXT
);

CREATE TABLE ProjectDeveloperLinks (
    ID_proj INTEGER PRIMARY KEY,
    ID_dev INTEGER,
    Is_active INTEGER
);

CREATE TABLE ProjectTesterLinks (
    ID_proj INTEGER PRIMARY KEY,
    ID_test INTEGER,
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
    Is_closed INTEGER
);

INSERT INTO Projects(Name, Time_start, Is_closed) VALUES ("Test_Project", datetime("now"), 0);
INSERT INTO Projects(Name, Time_start, Time_end, Is_closed) VALUES ("Test_Project", date('now','start of month', '-1 day'), datetime("now"), 1);
CREATE TABLE Projects (
    ID_proj INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Time_start TEXT,
    Time_end TEXT  
);

CREATE TABLE Workers (
    ID_worker INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Surname TEXT,
    Email TEXT,
    Pos TEXT,
    Is_fired INTEGER
);

CREATE TABLE ProjectWorkerLinks (
    ID_proj INTEGER,
    ID_worker INTEGER,
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

INSERT INTO Projects(Name, Time_start) VALUES ("Test_Project1", date("now"));
INSERT INTO Projects(Name, Time_start, Time_end) VALUES ("Test_Project2", date('now','start of month', '-1 day'), date("now"));
INSERT INTO Workers(Name, Surname, Email, Pos, Is_fired) VALUES ('Alexander', 'Sachuk', 'sachuk.as@edu.spbstu.ru', 'Developer', 0);
INSERT INTO ProjectWorkerLinks(ID_proj, ID_worker, Is_active) VALUES (1, 1, 1);


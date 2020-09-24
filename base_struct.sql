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

INSERT INTO Projects(Name, Time_start) VALUES ("Databases", date("now",'start of month', '-1 day'));
INSERT INTO Projects(Name, Time_start, Time_end) VALUES ("VectorChat", date('now','start of month', '-1 day'), date("now"));
INSERT INTO Workers(Name, Surname, Email, Pos, Is_fired) VALUES ('Alexander', 'Sachuk', 'sachuk.as@edu.spbstu.ru', 'Developer', 0);
INSERT INTO Workers(Name, Surname, Email, Pos, Is_fired) VALUES ('Vladimir', 'Parusov', 'parusov.va@edu.spbstu.ru', 'Tester', 0);
INSERT INTO ProjectWorkerLinks(ID_proj, ID_worker, Is_active) VALUES (1, 1, 1);
INSERT INTO ProjectWorkerLinks(ID_proj, ID_worker, Is_active) VALUES (1, 2, 1);
INSERT INTO ProjectWorkerLinks(ID_proj, ID_worker, Is_active) VALUES (2, 1, 0);
INSERT INTO ProjectWorkerLinks(ID_proj, ID_worker, Is_active) VALUES (2, 2, 0);
INSERT INTO Bugs(ID_proj, Name, Category, ID_fault, ID_finder, ID_fixer, Time_found, Time_deadline) VALUES (1, 'Long lines', 'codestyle', 1, 2, 2, date('now', "-2 day"), date('now', '-1 day'));
INSERT INTO Bugs(ID_proj, Name, Category, ID_fault, ID_finder, ID_fixer, Time_found, Time_deadline) VALUES (1, 'Long lines', 'codestyle', 1, 2, 2, date('now','start of month', '-1 day', 'start of month'), date('now','start of month', '-1 day'));
INSERT INTO Bugs(ID_proj, Name, Category, ID_fault, ID_finder, ID_fixer, Time_found, Time_deadline, Time_fixed) VALUES (2, 'Long lines', 'codestyle', 1, 2, 2, date('now', "-2 day"), date('now', '-1 day'),  date('now', '-1 day'));


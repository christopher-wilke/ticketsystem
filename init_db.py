import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO person (username, role_description) VALUES (?, ?)",
            ('christopher', '1')
            )

cur.execute("INSERT INTO person (username, role_description) VALUES (?, ?)",
            ('janina', '1')
            )

cur.execute("INSERT INTO person (username, role_description) VALUES (?, ?)",
            ('andrea', '2')
            )

cur.execute("INSERT INTO ticket (reason, createdBy) VALUES (?, ?)",
            ('Webserver started nicht', 1)
            )

connection.commit()
connection.close()

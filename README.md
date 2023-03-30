# postgres-express
## basic sql command
- =====users means table name=====
- select (columnName) from users
- select * from users ORDER BY title ASC
- select * from users where id=1
- insert into users(title, id, pro, des) values('title', 'id', 'pro', 'de') returning id
- update users set title='title', des='des' where id=1 returning *
- delete from users where id=1
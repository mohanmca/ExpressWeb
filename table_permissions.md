mysqld --initialize-insecure --console
mysqld --defaults-file=C:\my.ini --initialize --console


CREATE USER 'euler'@'localhost' IDENTIFIED BY 'euler';
GRANT ALL PRIVILEGES ON * . * TO 'euler'@'localhost';
FLUSH PRIVILEGES;
GRANT type_of_permission ON database_name.table_name TO ‘username’@'localhost’;
REVOKE type_of_permission ON database_name.table_name FROM ‘username’@‘localhost’;
SHOW GRANTS username;

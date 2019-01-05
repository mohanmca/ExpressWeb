# Convert JSON to CSV
```bash
    cat books.json | jq -r "(map(keys) | add | unique) as $cols | map(. as $row | $cols | map($row[.])) as $rows | $cols, $rows[] | @csv"
```
# SQL to create tables
```bash
create table books(
    "id"  int NOT NULL AUTO_INCREMENT,
    "author" varchar(255),
    "country" varchar(255),
    "imageLink" varchar(255),
    "language" varchar(255),
    "link" varchar(255),
    "pages" varchar(255),
    "title" varchar(255),
    "year" varchar(255)    
    );
insert into books(id, title, author) values(1, 'War and Peace', 'Leo Tolstoy'); 
insert into books(id, title, author) values(2, 'Thirukural', 'Thiruvalluvar'); ```
```
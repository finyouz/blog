# DML数据操作语言
用来对数据库表中的数据进行增删改
## DML数据表插入数据
- 数据表中指定属性插入数据
```sql
insert into tableName ('id','name') values(1,"finyou")
```
- 数据表中属性插入数据
```sql
insert into tableName values(1,"finyou")
```
## DML数据表修改数据
>基本语法
```sql
update tableName set 字段1=值1,字段2=值2 where id = 1
```
*当没选择指定的条件，表中的字段都会发生改变*
## DML数据表删除数据
>删除指定属性数据
```sql
delete from tableName where 字段1=值1
```
>删除表中的全部数据
```sql
delete from tableName
```

# DDL 数据定义语言
用来定义数据库对象（数据库，表，字段）
## DDL-数据库操作
### 查询
> 查询所有数据库
```sql
show databases;
```
>查询当前数据库
```sql
select database();
```
### 创建
> 创建数据库
```sql
create database [if not exists] 数据库名 [default charset 字符集] [collate 排序规则];
```
### 删除
> 删除数据库
```sql
drop database [if exists] 数据库名;
```
### 使用
>选中数据库
```sql
use 数据库名;
```
### 查询
> 查询当前数据库所有表
```sql
show tables;
```
>查询表结构
```sql
desc 表名
```
> 查询表的建表语句
```sql
show create table 表名;
```
## DDL-数据表操作
> 创建
```sql
create table 表名（
    字段名 数据类型
）
```
> 修改
- 添加字段
```sql
alter table 表名 add 字段名 数据类型;
```
- 修改数据类型
```sql
alter table 表名 modify 字段名 新数据类型;
```
- 修改字段名和字段类型
```sql
alter table 表名 change 旧字段名 新字段名 数据类型;
```
- 删除字段
```sql
alter table 表名 drop 字段名;
```
- 修改表名
```sql
alter table 表名 rename to 新表名;
```
> 删除
- 删除表
```sql
drop table [if exists] 表名;
```
- 删除指定表，并重新创建该表
```sql
truncate table 表名;
```
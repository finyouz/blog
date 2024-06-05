# DDL 数据定义语言
用来定义数据库对象（数据库，表，字段）
## DDL-数据库操作
### 查询
> 查询所有数据库
```bash
show databases;
```
>查询当前数据库
```bash
select database();
```
### 创建
> 创建数据库
```bash
create database [if not exists] 数据库名 [default charset 字符集] [collate 排序规则];
```
### 删除
> 删除数据库
```bash
drop database [if exists] 数据库名;
```
### 使用
>选中数据库
```bash
use 数据库名;
```
### 查询
> 查询当前数据库所有表
```bash
show tables;
```
>查询表结构
```bash
desc 表名
```
> 查询表的建表语句
```bash
show create table 表名;
```
## DDL-数据表操作
> 创建
```bash
create table 表名（
    字段名 数据类型
）
```
> 修改
- 添加字段
```bash
alter table 表名 add 字段名 数据类型;
```
- 修改数据类型
```bash
alter table 表名 modify 字段名 新数据类型;
```
- 修改字段名和字段类型
```bash
alter table 表名 change 旧字段名 新字段名 数据类型;
```
- 删除字段
```bash
alter table 表名 drop 字段名;
```
- 修改表名
```bash
alter table 表名 rename to 新表名;
```
> 删除
- 删除表
```bash
drop table [if exists] 表名;
```
- 删除指定表，并重新创建该表
```bash
truncate table 表名;
```
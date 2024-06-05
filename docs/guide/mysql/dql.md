# DQL 数据查询语言
用来查询数据库中表的记录
>基本语法
```sql
select 
        字段类表
from
        表名列表
where
        条件列表
group by
        分组字段列表
Having 
        分组后条件列表
order by
        排序字段列表
limit 
        分页参数
```
## 基本查询
> 查询多个字段
```sql
select 字段1,字段2 from tableName
```
> 查询所有字段
```sql
select * from tableName
```
>字段别名
```sql
-- as可以省略
select name as username from tableName
```
>去除重复记录
```sql
select distinct 字段列表 from tableName
```
## 条件查询
1.语法
```sql
select 字段列表 from tableName where 条件列表
```
2.条件
|比较运算符| 功能 |
|----------|--------|
|>|大于|
|>=||
|<||
|<=||
|=||
|<>或!=|不等于|
|between...and ...|在这个范围内，包含最大值和最小值|
|in(...)|多选一|
|like 占位符|模糊匹配（_单个字符,%任意字符）|
|is null||
|and 或者&&||
|or或 \|\| ||
|not或 ! |非,不是|

## 聚合函数

1.介绍

将对一列数据作为一个整体，进行纵向计算

2.常见的聚合函数
|函数|功能|
|---------|-------|
|count|统计数量|
|max|最大值|
|min|最小值|
|avg|平均值|
|sum|求和|

```sql
-- 求tableName数量
select count(*) from tableName
```
## 分组查询
1.语法
```sql
select * from tableName [where 条件] group by 分组字段名 [having 分组后过滤条件]
```
2.where和having的区别
- 执行时机不对
>where是分组前，having是分组后
- 判断条件不同
>where 不能对聚合函数判断，having可以
## 排序查询
1.语法
```sql
select * from tableName order by 字段1 排序方式,字段2 排序方式
```
2.排序方式
- asc 升序 （默认值）
- desc 降序 
- 当多个字段排序时，当第一个字段相同时，才会根据第二个字段排序

## 分页查询
1.语法
```sql
select * from tableName limit 起始索引，查询记录数
```
2.注意
- 起始索引从0开始，起始索引=（查询页码-1）* 每页显示记录数
- 分页查询是数据的方言，各数据各不相同
- 如果查询的是第一页，其实索引可以省略
## 执行顺序
```sql
from
    表名列表
where
    条件列表
group by
    分组字段
having
    分组后的条件列表
select
    字段列表
order by
    排序字段列表
limit
    分页参数
```


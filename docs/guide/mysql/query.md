# 多表查询

## 多表关系

项目开发中，在进行数据库表结构设计时，会根据业务需求 及业务模块之间的关系，分许并设计表结构，由于业务之间相互关联，所以各个表结构之间也存在着各种联系，基本分为三种：

- 一对一
- 一对多
- 多对多

### 一对多

- 案例：部门与员工的关系
- 关系：一个部门对应多个员工，一个员工对应一个部门
- 实现：在多的一方建立外键，指向一的一方主键

### 多对多

- 案例:学生与课程的关系
- 关系：一个学生可以选修多门课程，一门课程也可以包含多个学生
- 实现：建立第三张中间表，中间表至少包含俩个外键，分别关联俩方主键

### 一对一

- 案例：用户与用户详情的关系
- 关系：对用于单表的拆分，将基础字段放在一张表中，其他字段放在另一个表中
- 实现：在任意一方添加外键，关联另一方的主键，并且设置外键unique(唯一)

## 多表查询

### 笛卡尔积

- 概述：指从多张表中查询数据
- 笛卡尔积：俩个集合中中所有组合情况

```sql
select * from emp ,dept
```

- 消除笛卡尔积

```sql
select * from emp,dept where emp.id = dept.deptId 
```

### 多表查询分类

- 连接查询
    - 内连接：相当查询A、B交集部分数据
    - 外连接：
        - 左外连接：查询左边所有数据，以及俩张表交际部分数据
        - 查询右边所有数据，以及俩张表交际部分数据
    - 自连接：当前表与自身的连接查询，自连接必须使用表别名
- 子查询

#### 内连接

- 隐式内连接

```sql
select 字段列表 from 表1，表2 where 条件
```

- 显示内连接

```sql
select 字段列表 from 表1 [inner] join 表2 on 连接条件· 
```

#### 外连接

- 左外

```sql
select 字段列表 from 表1 left [outer] join 表2 on 条件
```

- 右外

```sql
select 字段列表 from 表1 right [outer] join 表2 on 条件
```

#### 自连接

```sql
select 字段列表 from 表A 别名a join  表A 别名b 条件
```

#### 联合查询 union,union all

对于union查询，就是把多次查询的结构合并起来,形成一个新的查询结果集

```sql
select 字段列表 from 表A ...
union [all]
select 字段列表 from 表B ...
```

注意

- all直接合并 不添加all合并在去重
- 联合查询必须保持多张表的列数一致，并且字段类型也需要一致

#### 子查询

概念sql语句中嵌套select语句,称为嵌套查询，又称为子查询

```sql
select * from 表名 where column1 = (select column1 from 表明)
```

子查询外部语句可以是 insert / update / delete / select的任何一个

子查询分类：

1.标量子查询（子查询结果为单个）

```sql
select * from emp where deptId = (select id from dept where name = '销售部')
```

2.列子查询（子查询结果为一列）

常用操作符

|操作符 |描述|
|-------|-----|
|in|在指定集合范围之内，多选一|
|not in |不在指定范围之内|
|any|子查询返回列表中，有任意一个满足即可|
|some|与any等同，使用some的地方都可以使用any|
|all|子查询返回列表的所有值都必须满足|

```sql
select * from emp where deptId in (select id from dept where name= '销售部' or name='研发部')
```

3.行子查询（子查询结果为一行）
常见的操作符：= 、<> 、in 、not in

```sql
select * from emp where (salary,managerId) = (select salary,managerId from  dept name='张无忌')
```

4.表子查询（子查询结果为多行多列）
常用操作符：in

```sql
select * from emp where (job,salary) in (select job, salary from dept where name='finyou' or name = '小胖')
```

将查询的结果当成临时表

```sql
select * from (select *from emp where entrydate > '2006-01-01') e left join dept d on e.deptId = c.id
```

查询位置:

where之后

from 之后

select 之后

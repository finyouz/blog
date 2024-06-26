# 事务

事务是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即要么同时成功，要么同时失败

> 默认mysql的事务时自动提交，也就是说，当执行一条DML语句，mysql会立即隐式提交事务

## 事务操作

- 查看/设置事务提交方式

```sql
SELECT @@autocommit

set @@autocommit = 0  #1是自动提交  0手动提交
```

- 开始事务

```sql
START TRANSACTION 或 begin
```

- 提交事务

```sql
commit
```

- 回滚事务

```sql
ROLLBACK
```

## 事务四大特性(ACID)

- 原子性(Atomicity):事务是不可分割的最小操作单元，要么全部成功，要么全部失败。
- 一致性(Consistency)：事务完成时，必须使所有的数据都保持一致状态
- 隔离性(Isolation)：数据库系统提供隔离机制，保证事务在不受外部并发操作影响的独立环境下运行
- 持久性(Durability)：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的

## 并发事务问题

|问题|描述|
|-----|-----|
|脏读|一个事务读到另一个事务还没提交的数据|
|不可重复读|一个事务先后读取同一条记录，但俩西读取的数据不同|
|幻读|一个事务按照条件查询数据时，没有对应的数据行，但是插入数据时，又发现这行数据已经存在，好像出现"幻影"|

## 事务隔离级别

|隔离级别|脏读|不可重复读|幻读|
|-------|-------|---------|-------|
|Read uncommitted|-|-|-|
|Read commited||-|-|
|Pepeatable Read(默认)|||-|
|Serializable||||

- 从上到下 隔离级别越来越高，性能从越来越低

```sql
-- 查看事务隔离级别
SELECT @@TRANSACTION_ISOLATION

--设置事务隔离级别
set [session|global] transaction isolation level
[Read uncommitted|Read committed|Pepeatable Read|Serializable]
```

# 约束

1.概念：约束是作用表中字段上的规则，用于限制存储在表中的数据。
2.目的：保证数据库中数据的正确、有效和完整性。
3.分类：
|约束|描述|关键字|
|-----------|--------|--------|
|非空约束|限制字段数据不能为空|not null|
|唯一约束|保证该字段的所有数据都是唯一、不重复|unique|
|主键约束|主键是一行数据的唯一标识，要求非空且唯一|primary key|
|默认约束|未指定数据，采用默认|default|
|检查约束|保证字段值满足某一个条件|check|
|外键约束|用来让俩张表的数据之间建立连接，保证数据的一致性和完整性|foreign key|
|自增|新记录插入表中时生成一个唯一的数字| AUTO_INCREMENT|
|属性注释||comment|

## 约束演示

```sql
CREATE table demo(
`id` int PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
`name` VARCHAR(10) UNIQUE NOT NULL COMMENT '名字',
`age` int CHECK(age>0 && age<=100),
staus CHAR(1) DEFAULT '1'
)

```

## 外键约束

用来让俩张表的数据之间建立连接，保证数据的一致性和完整性

### 添加外键

1.建表之前

```sql
create table tableName(
    .....
    [CONSTRAINT] [外键名称]  FOREIGN KEY (外键字段名) REFERENCES 主表 (主表列名)
)

```

2.建表之后

```sql
ALTER TABLE tableName add CONSTRAINT 外键名 FOREIGN KEY (外键字段名) REFERENCES 主表 (主表列名)
```

### 删除外键

```sql
alter table 表名 drop FOREIGN KEY 外键名称
```

### 删除/更新行为

|行为|说明|
|------|------|
|NO ACTION|当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新|
|RESTRICT|当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新|
|CASCADE|当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有 则也删除/更新外键在子表的记录|
|SET NULL|在父表中删除对应记录时，首先检查该记录是否有对应外键，如果有你则设置子表中该外键值为null (外键应该允许取空)|
|SET DEFAULT|父表有变更时，子表将外键列设置成一个默认的值（Innodb）不支持|

```sql
ALTER TABLE tableName add CONSTRAINT 外键名 FOREIGN KEY (外键字段名) REFERENCES 主表 (主表列名) on update cascade on delete cascade

```
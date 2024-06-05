# DCL 数据控制语言
用来创建数据库用户，控制数据库访问权限
## 管理用户
1.查询用户
```sql
use mysql
select * from user
```
2.创建用户
```sql
create user '用户名'@'主机名' identified by '密码'
```
3.修改用户密码
```sql
alter user '用户名'@'主机名' identified with mysql_native_password by '新密码'
```
4.删除用户
```sql
drop user '用户名'@'主机名'
```
## 权限控制
1.常用权限
|  权限|  说明 | 
|------------|---------|
|ALL|所有权限|
|select|查询|
|insert|插入|
|update||
|alter||
|drop||
|create||
2.权限控制
- 查询
```sql
show grants for '用户名'@'主机名'
```
- 授予
```sql
grant 权限列表 on 数据库名.表名 to '用户名'@'主机名'
```
- 撤销权限
```sql
revoke 权限列表 on 数据库.表名 from '用户名'@'主机名'
```
3.注意
- 多个权限之间使用逗号隔开
- 授权时，数据库名和表名可以使用*进行通配，代表所有

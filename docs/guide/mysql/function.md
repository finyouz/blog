# 函数

函数是指一段可以直接被另一个程序调用的程序或代码

## 字符串函数

MySQL常见内置函数
|函数|功能|
|-----------|-----------------|
|concat(s1,s2,s3)|字符串拼接|
|Lower||
|upper||
|lpad(str,len,padstr)|左填充|
|rpad||
|trim||
|substring(str,start,len)||

## 数值函数

常见内置函数
|函数|功能|
|-----------|-----------------|
|ceil(x)|向上取整|
|floor(x)|向下取整|
|mod(x,y)|x/y的模|
|rand()|0-1的随机数|
|round(x,y)|四舍五入,保留y位小数，y未填，默认不保留|

## 日期函数

常见内置函数
|函数|功能|
|-----------|-----------------|
|CURDATE|返回当前的日期|
|CURTIME|返回当前的时间|
|NOW|返回当前日期和时间|
|year(date)|指定date的年份|
|month(date)|指定date的月份|
|day(date)|指定日期|
|date_add(date,interval sum time)|给指定时间添加时间|
|dateDiff(date2,date2)|俩个指定日期的相差天数|

## 流程函数

流程函数可以在SQL语句中条件筛选，从而提高语句的效率
常见内置函数
|函数|功能|
|-----------|-----------------|
|if(value,t,f)||
|ifnull(value1,value2)||
|case when [val1] then [res1]..else[defaulr] end||
|case [expr] when [val1] then [res1]..else[defaulr] end|如果expr等于val1，返回res1,...否则返回默认|
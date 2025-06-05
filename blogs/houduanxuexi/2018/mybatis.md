---
title: MyBatis学习总结
date: 2025/3/28
tags:
 - 框架
categories:
 - 后端学习
---

MyBatis 是一款**半自动化的 ORM（对象关系映射）框架**，由 Apache 开源（原名 iBatis）。它的核心作用是**将 SQL 语句与Java代码解耦**，允许开发者通过 XML 或注解方式编写 SQL，同时将查询结果映射为 Java 对象。

**核心特点**
- **灵活性**：不强制封装 SQL，开发者可自由编写复杂 SQL（如多表关联、存储过程）。
- **轻量级**：无需完整的框架依赖，仅通过配置文件或注解即可快速集成。
- **性能优化**：支持 SQL 缓存、延迟加载、动态 SQL 等性能优化机制。

**`#{}`和`${}`的区别**

**`${}`是在`Properties`文件中使用的变量占位符**，在 MyBatis 执行 SQL 语句之前，会将`${}`中的内容直接替换成对应的值，属于原样替换。无论`${}`内的内容是什么，都会被原封不动地拼接到 SQL 语句中。
比如根据参数按任意字段排序的需求：
   ```SQL
      select * from users order by ${orderCols}
   ```
`orderCols`参数可以传入`name`、`name desc`、`name`,`sex asc`等不同的值，实现灵活的排序效果。

**`#{}`是SQL参数占位符**。MyBatis会将SQL语句中的`#{}`替换为?，在执行SQL语句时，通过`PreparedStatement`的参数设置方法，按照顺序为?占位符设置具体的参数值。这种方式能够有效避免 SQL 注入问题，因为参数值是通过预编译的方式设置的，而不是直接拼接在 SQL 语句中。
比如`ps.setInt(0, parameterValue)`，`#{item.name}`的取值方式为使用反射从参数对象中获取`item`对象的`name`属性值，相当于`param.getItem().getName()`。


**xml 映射文件中，除了常见的`select`、`insert`、`update`、`delete`标签之外，还有哪些标签？**



参考文章：

https://javaguide.cn/system-design/framework/mybatis/mybatis-interview.html

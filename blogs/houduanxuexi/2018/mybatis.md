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

### `#{}`和`${}`的区别

**`${}`是在`Properties`文件中使用的变量占位符**，在 MyBatis 执行 SQL 语句之前，会将`${}`中的内容直接替换成对应的值，属于原样替换。无论`${}`内的内容是什么，都会被原封不动地拼接到 SQL 语句中。
比如根据参数按任意字段排序的需求：
   ```SQL
      select * from users order by ${orderCols}
   ```
`orderCols`参数可以传入`name`、`name desc`、`name`,`sex asc`等不同的值，实现灵活的排序效果。

**`#{}`是SQL参数占位符**。MyBatis会将SQL语句中的`#{}`替换为?，在执行SQL语句时，通过`PreparedStatement`的参数设置方法，按照顺序为?占位符设置具体的参数值。这种方式能够有效避免 SQL 注入问题，因为参数值是通过预编译的方式设置的，而不是直接拼接在 SQL 语句中。
比如`ps.setInt(0, parameterValue)`，`#{item.name}`的取值方式为使用反射从参数对象中获取`item`对象的`name`属性值，相当于`param.getItem().getName()`。


### xml 映射文件中，除了常见的`select`、`insert`、`update`、`delete`标签之外，还有哪些标签？

**动态SQL标签**：`<where>`,`if`,`foreach`,`set`,`choose`,`when`,`otherwise`,`trim`.

**结果映射标签**: `resultMap`,`constructor`.

**SQL片段与引用标签**：`sql`,`include`.

**其他标签**：`bind`,`selectKey`(为不支持自增的主键生成策略标签)等。

### Dao接口的工作原理是什么，Dao接口里的方法，参数不同时，方法能重载吗？

Dao接口就是Mapper接口，接口的全限名，就是映射文件的`namespace`的值。接口的方法名就是映射文件中`MappedStatement`的id值，接口的参数就是传递给sql的参数。

Dao接口的工作原理是JDK动态代理，MyBatis运行时会使用JDK动态代理为Dao接口生成`poxy`对象，代理对象`poxy`会拦截接口方法，转而执行`MappedStatement`所代表的sql，将sql执行结果返回。

Dao接口可以有多个重载方法，但是多个接口对应的映射必须只有一个。Dao接口里的方法可以重载，但是MyBatis的xml里面的ID必须唯一。

Dao方法可以重载，必须满足：

- 仅有一个无参方法和一个有参方法
- 多个有参方法时，参数数量必须一致。且使用相同的`@param`，或者使用`@param1`这种。

### MyBatis如何进行分页，分页插件的原理

- MyBatis通过RowBounds对象进行分页，它是针对ResultSet结果集执行的内存分页，而非物理分页。
- 在sql内直接书写带有物理分页的参数来实现物理分页功能
- 使用分页插件进行物理分页。分页插件的实现原理是使用MyBatis提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的sql，然后重写sql，根据dialect方言，添加对应的物理分页语句和物理分页参数。

### 简述 MyBatis 的插件运行原理，以及如何编写一个插件

MyBatis仅可以编写针对`ParameterHandler`、`ResultSetHandler`、`StatementHandler`、`Executor`这四种接口的插件，
MyBatis使用JDK的动态代理，为需要拦截的接口生成代理对象以及实现接口方法的拦截功能，每当执行这4种接口对象的方法时，就会进入拦截方法，具体就是`InvocationHandler`的`invoke()`方法，当然，只需要拦截那些指定的方法。

实现MyBatis的`Interceptor`接口并复写`intercept()`方法，然后在给插件编写注解，指定要拦截哪一个接口的哪些方法即可


参考文章：

https://javaguide.cn/system-design/framework/mybatis/mybatis-interview.html

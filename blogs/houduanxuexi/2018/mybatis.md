---
title: MyBatis学习总结
date: 2025/3/28
tags:
 - 框架
categories:
 - 后端学习
---

MyBatis 是一款**半自动化的 ORM（对象关系映射）框架**，由 Apache 开源（原名 iBatis）。它的核心作用是**将 SQL 语句与Java代码解耦**，允许开发者通过 XML 或注解方式编写 SQL，同时将查询结果映射为 Java 对象。
基于JDBC进行封装，是 Java 官方提供的数据库访问标准 API，直接与数据库交互。开发人员需手动编写 SQL 语句、创建连接、处理结果集等，代码繁琐（如`Statement`、`ResultSet`操作）。
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

### MyBatis动态sql是做什么的

MyBatis的动态sql可以让我们在xml映射文件内，以标签的形式编写动态sql，完成逻辑判断和动态拼接sql的功能。其执行原理通过使用OGNL从sql参数对象中计算表达式的值，根据表达式的值动态拼接sql，以此来完成动态sql的功能。

### MyBatis如何将sql执行结果封装为目标对象并返回？有那些映射方式

第一种使用`resultMap`标签，逐一定义列与对象属性名之间的映射关系。第二种使用sql列的别名功能，将列的别名书写为对象属性名。

有了列名和对象属性名的映射关系后，MyBatis通过反射创建对象，同时使用反射给对象的属性逐一赋值并返回。

### MyBatis 能执行一对一、一对多的关联查询吗？都有哪些实现方式，以及它们之间的区别

MyBatis 不仅可以执行一对一、一对多的关联查询，还可以执行多对一，多对多的关联查询，多对一查询，其实就是一对一查询，只需要把`selectOne()`修改为`selectList()`即可；多对多查询，其实就是一对多查询，只需要把`selectOne()`修改为`selectList()`即可。

关联对象查询有两种方式

- 单独发送一个sql去查询关联对象，赋给主对象，返回主对象。
- 使用嵌套查询，即使用join查询，一部分列是对象A的属性值，另一部分列是关联对象B的属性值。

主对象和关联对象的去重通过`<resultMap>`标签内的`<id>`子标签，指定了唯一确定一条记录的id列，MyBatis根据`<id>`列值来完成 100 条记录的去重复功能，`<id>`可以有多个，代表了联合主键的语意。

### MyBatis是否支持延迟加载？如果支持，它的实现原理是什么？

MyBatis仅支持association关联对象和collection关联集合对象的延迟加载，association指的就是一对一，collection指的就是一对多查询，在MyBatis配置文件中，可以配置是否启用延迟加载`lazyLoadingEnabled=true|false`..

实现原理:使用`CGLIB`创建目标对象的代理对象，当调用目标方法时，进入拦截器方法，比如调用`a.getB().getName()`，拦截器`invoke()`方法发现`a.getB()`是null值，那么就会单独发送事先保存好的查询关联B对象的sql，把`B`查询上来，然后调用`a.setB(b)`，于是a的对象b属性就有值了，接着完成`a.getB().getName()`方法的调用。

### MyBatis的xml映射文件中，不同的xml映射文件，id是否可以重复？

不同的xml映射文件，如果配置了namespace，那么id是可以重复的；如果没有配置namespace，那么id不能重复；
因为namespace+id是作为`Map<String,MappedStatement>`的key使用的，如果没有namespace，就剩下id，重复的id就会导致数据被覆盖。有了namespace，id自然可以重复，因为namespace不同，那么key也不同。

### MyBatis 都有哪些`Executor`执行器？它们之间的区别是什么？如何指定使用哪一种Executor执行器？

`Executor`执行器是核心组件之一，负责执行 SQL 语句、管理缓存、处理事务等操作。它是 MyBatis 与 JDBC 交互的桥梁，直接控制 SQL 执行的全过程。

MyBatis有三种基本的`Executor`组件，
- `SimpleExecutor`：每执行一次update或select，就开启一个Statement对象，用完立刻关闭Statement对象。
- `ReuseExecutor`：重复使用Statement对象。执行完update或者select后，以sql作为key去查找Statement对象，存在就使用，不存在就创建，用完后，不关闭Statement对象，而是放置在`Map<String,Statement>`内，供下一次使用
- `BatchExecutor`： 执行update（没有select，JDBC批处理不支持select），将所有sql都添加到批处理中（`addBatch()`），等待统一执行（`executeBatch()`），它缓存了多个Statement对象，每个Statement对象都是`addBatch()`完毕后，等待逐一执行`executeBatch()`批处理。与 JDBC 批处理相同。

作用范围：`Executor`的这些特点，都严格限制在SqlSession生命周期范围内。

在MyBatis配置文件中，可以指定默认的`ExecutorType`执行器类型，也可以手动给`DefaultSqlSessionFactory`的创建SqlSession的方法传递`ExecutorType`类型参数。

### MyBatis是否可以映射Enum枚举类

MyBatis可以映射枚举类，不单可以映射枚举类，MyBatis可以映射任何对象到表的一列上。映射方式为自定义一个`TypeHandler`，实现`TypeHandler`的`SetParameter()`（完成从javaType至jdbcType的转换，设置sql问号占位符参数）和`getResult()`（完成从jdbcType至javaType的转换，获取列查询结果）接口方法。

### MyBatis映射文件中，如果A标签通过include引用了B标签的内容，请问，B标签能否定义在A标签的后面，还是说必须定义在A标签的前面？

虽然MyBatis解析xml映射文件是按照顺序解析的，但是，被引用的B标签依然可以定义在任何地方，MyBatis都可以正确识别。因为MyBatis解析A标签，发现A标签引用了B标签，但是B标签尚未解析到，尚不存在，此时，MyBatis会将A标签标记为未解析状态，然后继续解析余下的标签，包含B标签，待所有标签解析完毕，MyBatis会重新解析那些被标记为未解析的标签，此时再解析A标签时，B标签已经存在，A 标签也就可以正常解析完成了。

### 简述MyBatis的xml映射文件和MyBatis内部数据结构之间的映射关系？

MyBatis将所有xml配置信息都封装到All-In-One重量级对象Configuration内部。在xml映射文件中，`<parameterMap>`标签会被解析为`ParameterMap`对象，其每个子元素会被解析为ParameterMapping对象。`<resultMap>`标签会被解析为`ResultMap`对象，其每个子元素会被解析为`ResultMapping`对象。每一个`<select>、<insert>、<update>、<delete>`标签均会被解析为`MappedStatement`对象，标签内的sql会被解析为BoundSql对象。

### 为什么说MyBatis是半自动ORM映射工具？它与全自动的区别在哪里？

Hibernate属于全自动ORM映射工具，使用Hibernate查询关联对象或者关联集合对象时，可以根据对象关系模型直接获取，所以它是全自动的。而MyBatis在查询关联对象或关联集合对象时，需要手动编写sql来完成，所以，称之为半自动ORM映射工具。




参考文章：
https://javaguide.cn/system-design/framework/mybatis/mybatis-interview.html

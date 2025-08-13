---
title: Spring Dependency Injection - 依赖注入使用技巧
date: 2025/08/13
tags:
- DI
- Spring
categories:
- 后端开发
---

**实例化注解**
- @Component：组件注解
- @Service：服务注解
- @Repository：仓储注解，提供对持久化类数据的操作的服务。
- @Controller/@RestController()：对外提供服务的注解。

### 构造注入&List、Map
```
private final List<IAwardService> awardServices;
private final Map<String, IAwardService> awardServiceMap;

public AwardController(List<IAwardService> awardServices, Map<String, IAwardService> awardServiceMap) {
    this.awardServices = awardServices;
    this.awardServiceMap = awardServiceMap;
}

public Response<String> distributeAward(@RequestParam String userId, @RequestParam String awardKey) {
    try {
        log.info("发放奖品服务 userId:{} awardKey:{}", userId, awardKey);
        awardServiceMap.get(awardKey);
        return Response.<String>builder()
                .code("0000")
                .info("调用成功")
                .data("发奖完成")
                .build();
    } catch (Exception e) {
        return Response.<String>builder()
                .code("0001")
                .info("调用失败")
                .build();
    }
}
```
IAwardService 接口有多个实现类，可以通过 @Resource、@Autowired 注解注入，也可以通过构造函数注入。

Map 注入是一个非常好的注入手段，在抽奖项目实现奖品发奖时，
我们可以把每个 IAwardService 实现类设定好 Bean 的名称为数据库中的奖品 awardKey。在发奖的时候，可以直接根据 awardKey 从 Map 中获取到对应的 Bean 对象，这样也就省去了 if···else 大量的判断操作。

### 空注入判断
```
public class NullAwardService implements IAwardService {

    @Override
    public void doDistributeAward(String userId) {

    }

}

@Autowired(required = false)
private NullAwardService nullAwardService;
```
NullAwardService 没有配置 @Service 注册，或者在程序中手动实例化的这个 Bean 对象，根据不同诉求，在没有创建的时候。可以使用 @Autowired(required = false) 进行注入。这样就不会报错 nullAwardService 空指针异常。

当我们在使用支付、openai外部接口对接测试阶段，可能有些时候是需要关闭服务的，也就是不实例化对象。那么这个时候就配置 @Autowired(required = false) 避免注入空指针。

### 优先实例化
```
@Slf4j
@Service("openai_model")
// Primary 首选 Bean 对象标记
@Primary
@Order(1)
public class OpenAIModelAwardService implements IAwardService {

    @Override
    public void doDistributeAward(String userId) {
        log.info("发奖服务，OpenAI 模型奖励 {}", userId);
    }

}

@Resource
private IAwardService awardService;

@Test
public void test_awardService_primary() {
    log.info("测试结果 {}", awardService.getClass());
}

// 测试结果 class cn.bugstack.xfg.dev.tech.domain.impl.OpenAIModelAwardService
```
一个 IAwardService 有多个实现类的时候，如果还想用 @Resource 注入 awardService 的时候是会报错,显示 NoUniqueBeanDefinitionException 异常了。
这个时候使用 @Primary 就会标记为首选对象，注入的时候会注入这个对象。另外这里的 @Order(1) 是对象的加载顺序。

当我们为一组接口提供实现类，并需要提供默认的注入的时候，就可以使用 @Primary 注解来限定首选注入项。

### 检测创建，避免重复
```
@Bean("redisson01")
// 当 Spring 应用上下文中不存在某个特定类型的 Bean 时，才会创建和配置标注了 @ConditionalOnMissingBean 的 Bean 对象
@ConditionalOnMissingBean
public String redisson01() {
return "模拟的 Redis 客户端 01";
}
@Bean("redisson02")
// 当 Spring 应用上下文中不存在某个特定类型的 Bean 时，才会创建和配置标注了 @ConditionalOnMissingBean 的 Bean 对象
@ConditionalOnMissingBean
public String redisson02() {
return "模拟的 Redis 客户端 02";
}
```
@Bean 可以用于在方法，创建出对象。这有点类似于使用 Spring 的 FactoryBean 接口创建对象一样，这里可以直接使用方法创建。
之后 @ConditionalOnMissingBean 注解的目的是为了避免重复创建，判断应用上下文中存在这个对象，则不会重复创建。

通常我们在做一些组件的时候，会加入这样一个注解，避免在业务工程中引入同类的组件的时候，会导致创建出相同对象而报错。

### 配置是否创建对象
```
@Data
@ConfigurationProperties(prefix = "sdk.config", ignoreInvalidFields = true)
public class AutoConfigProperties {

    /** 状态：open = 开启、close 关闭 */
    private boolean enable;
    /** 转发地址 */
    private String apiHost;
    /** 可以申请 sk-*** */
    private String apiSecretKey;

}

@Bean
@ConditionalOnProperty(value = "sdk.config.enabled", havingValue = "true", matchIfMissing = false)
public String createTopic(@Qualifier("redisson01") String redisson, AutoConfigProperties properties) {
    log.info("redisson {} {} {}", redisson, properties.getApiHost(), properties.getApiSecretKey());
    return redisson;
}

sdk:
  config:
    enabled: false
    apiHost: https://open.bigmodel.cn/
    apiSecretKey: d570f7c5d289cdac2abdfdc562e39f3f.trqz1dH8ZK6ED7Pg
```
模拟创建 createTopic，入参的对象为注入的操作，@Qualifier 注解可以指定要注入哪个名字的对象。
之后 @ConditionalOnProperty 注解可以通过配置的 enabled 值，来确定是否实例化对象。

比如你做了一个组件，或者业务中要增加一些配置。启动或关闭某些服务，就可以使用了。而不需要把 pom 中引入的组件注释掉。

### 自定义Condition，判断是否实例化对象
```
public class BeanCreateCondition implements Condition {

    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        String active = System.getProperty("isOpenWhitelistedUsers");
        return null != active && active.equals("true");
    }

}

@Bean
@Conditional(BeanCreateCondition.class)
public List<String> whitelistedUsers() {
    return new ArrayList<String>() {{
        add("user001");
        add("user002");
        add("user003");
    }};
}

static {
    // BeanCreateCondition 会检测这个值，确定是否创建对象
    System.setProperty("isOpenWhitelistedUsers", "false");
}

@Autowired(required = false)
@Qualifier("whitelistedUsers")
private List<String> whitelistedUsers;
```
我们可以自定义一个 Conditional 的实现类，之后把这个实现类配置到需要实例化的对象上面，通过 matches 匹配条件方法的实现，决定是否实例化。

用途和 @ConditionalOnProperty 是一样的，只不过我们可以更好的自定义控制。

### 根据环境配置实例化对象
```
@Slf4j
@Service
// 用于根据配置环境实例化 Bean 对象
@Profile({"prod", "test"})
@Lazy
public class AliPayAwardService implements IAwardService {

    public AliPayAwardService() {
        log.info("如一些支付场景，必须指定上线后才能实例化");
    }

    @Override
    public void doDistributeAward(String userId) {
        log.info("红包奖励 {}", userId);
    }

}

spring:
  config:
    name: xfg-dev-tech-spring-dependency-injection
  profiles:
    active: dev
```
@Profile({"prod", "test"}) 注解可以配置你是在什么时候实例化这个对象，我们可以指定 application.yml 中配置的 active: dev/prod/test 来确定是在开发、测试还是上线才实例化这个对象。

一些只有到线上才能实例化对象的时候，就可以配置 @Profile({"prod", "test"}) 注解，注意这个需要配合 @Autowired(required = false) 进行注入，否则会出现注入为空指针的异常。

### 引入 Spring 配置
```
@Slf4j
@SpringBootApplication
@Configurable
@PropertySource("classpath:properties/application.properties")
@ImportResource("classpath:spring/spring.xml")
@EnableScheduling
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

}

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="exampleBean" class="cn.bugstack.xfg.dev.tech.domain.SpringBeanTest"/>

</beans>

@Slf4j
public class SpringBeanTest {

    public SpringBeanTest() {
        log.info("我是通过 Spring 配置文件实例化的 Bean 对象");
    }

}
```
在 SpringBoot 工程中，可以通过 @ImportResource、@PropertySource 引入对应的配置文件，完成对象的初始化。

在实际的开发中，虽然使用 SpringBoot 工程，但为了兼容一些老的项目或者一些还没有升级到 SpringBoot Starter 的组件，则需要单独引入 Spring 配置文件来创建对象。

### 原型对象
```
@Component
@Scope("prototype")
public class LogicChain {
}

@Resource
private ApplicationContext applicationContext;

@Test
public void test_prototype() {
    log.info("测试结果: {}", applicationContext.getBean(LogicChain.class).hashCode());
    log.info("测试结果: {}", applicationContext.getBean(LogicChain.class).hashCode());
}
```
@Scope("prototype") 可以设定对象类型为原型对象，每次获得的对象都是一个新的实例化对象。

对于动态，不同责任链创建，可以使用这个配置，确保每个对象都是自己的。

### 其他注解
- @EnableScheduling：允许启动任务的注解，放到 Application 上，确保任务启动执行。
- @DependsOn({"openai_model", "openai_use_count", "user_credit_random"}) Bean 对象实例化中，依赖于哪些对象。
- @Autowired private Environment env; 环境配置注入，可以获取到 application.yml 中的配置数据 env.getProperty("app.name"), env.getProperty("app.version")
- @Async 异步方法注解，可以用于调用某个方法后，让下面的具体逻辑方法为异步执行，主方法直接返回结果。可以用于一些申请导出数据到文件的场景

### 构造函数注入的流程
1. 解析 BeanDefinition： Spring 解析配置文件或注解，生成 AwardController 的 BeanDefinition 对象。
2. 选择构造函数： AutowiredAnnotationBeanPostProcessor 会扫描 AwardController 的构造函数，发现它有一个 Map<String, IAwardService> 类型的参数。
3. 查找依赖： ConstructorResolver 会根据构造函数参数的类型，查找 Spring 容器中所有 IAwardService 类型的 Bean，并将它们放入一个 Map 中。这个 Map 的键是 Bean 的名称，值是对应的 IAwardService 实例。
4. 实例化 Bean： ConstructorResolver 使用找到的依赖，调用 AwardController 的构造函数，创建 AwardController 实例。
5. 注入依赖： DefaultListableBeanFactory 将创建好的 Map<String, IAwardService> 注入到 AwardController 的构造函数中。


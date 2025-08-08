---
title: 怎么实现一个Spring Boot Starter

date: 2025/8/01
tags:
 - Spring Boot Starter
 - 组件开发
categories:
 - 后端开发
---
## 实现一个最小的Spring Boot Starter
### SpringBoot是怎么实现的自动装配?
在程序的入口类上有@SpringBootApplication，默认情况下Spring Boot会扫描这个注解所在目录和所有子目录。
扫描的内容就是@Component注解, 所有被扫描到的都会被注册成一个singleton(单例)

**@Confuguration**
```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Configuration {
    @AliasFor(
        annotation = Component.class
    )
    String value() default "";

    boolean proxyBeanMethods() default true;
}
```
根据源码不难发现实际上这个注解就是Component注解的别名

### 最简单的Starter
现在我们就已经能实现一个最简单的starter了
```java
@Configuration
public class RestTemplateConfig {
    @Bean
    public RestTemplate restTemplate(){
        return  new RestTemplate();
    }
}
```
通过这个starter自动装配了restTemplate对象

## Spring Factories
上面的Starter有一个和我们日常使用中的Spring Boot提供的Starter最大的区别: 我们的Starter配置类必须在@SpringBootApplication所在目录或者子目录中。
明显不符合我们日常通过maven导入jar包使用其他的starter提供的bean对象的实际场景

### SPI机制
SPI : Service Provider Interface, SPI通过对模块之间基于接口编程, 不对实现类进行硬编码, 
模块装配的时候不在程序中指明, 而是通过一种**服务发现机制**, 通过为某个接口寻找服务实现的机制, 将装配的控制权移到程序之外, 类似IOC的思想。

#### 第一步: 定义接口 (制定服务的标准)
```java
public interface PaymentService {
    void pay(double amount);
}
```

#### 第二步: 创建实现类 (提供具体的服务)
```java
public class AlipayService implements PaymentService {
    public void pay(double amount) {
        System.out.println("使用支付宝支付：" + amount);
    }
}

public class WechatPayService implements PaymentService {
    public void pay(double amount) {
        System.out.println("使用微信支付：" + amount);
    }
}
```

#### 第三步: 配置文件 (也就是服务发现的提供者)
在META-INF/services目录下创建文件, 文件名就是接口的全限定名
```plain
# 文件名：META-INF/services/com.example.PaymentService
com.example.AlipayService
com.example.WechatPayService
```

#### 第四步: 使用ServiceLoader加载
```java
ServiceLoader<PaymentService> loader = ServiceLoader.load(PaymentService.class);
for (PatmentService service : loader) {
    service.pay(100.0);
}
```

### Spring Boot中的SPI机制
Spring Boot也实现了类似的机制, 通过一个Loader加载所有jar包中的META-INF/spring.factories文件
而这个文件中就写有需要装配的类的**全限定名**。
```properties
# META-INF/spring.factories
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.example.MyAutoConfiguration,\
com.example.AnotherAutoConfiguration
```
Spring Boot通过spring-core中的SpringFactoriesLoader类, 检索这个文件, 并解析获取类名列表, 从而加载这些配置类中的Bean
```java
public final class SpringFactoriesLoader {
    public static final String FACTORIES_RESOURCE_LOCATION = "META-INF/spring.factories";
    private static final Log logger = LogFactory.getLog(SpringFactoriesLoader.class);
    private static final Map<ClassLoader, MultiValueMap<String, String>> cache = new ConcurrentReferenceHashMap();
    private SpringFactoriesLoader() {}
    public static <T> List<T> loadFactories(Class<T> factoryClass, @Nullable ClassLoader classLoader) {
        Assert.notNull(factoryClass, "'factoryClass' must not be null");
        ClassLoader classLoaderToUse = classLoader;
        if (classLoader == null) {
            classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
        }
        List<String> factoryNames = loadFactoryNames(factoryClass, classLoaderToUse);
        if (logger.isTraceEnabled()) {
            logger.trace("Loaded [" + factoryClass.getName() + "] names: " + factoryNames);
        }
        List<T> result = new ArrayList(factoryNames.size());
        Iterator var5 = factoryNames.iterator();
        while(var5.hasNext()) {
            String factoryName = (String)var5.next();
            result.add(instantiateFactory(factoryName, factoryClass, classLoaderToUse));
        }
        AnnotationAwareOrderComparator.sort(result);
        return result;
    }
    public static List<String> loadFactoryNames(Class<?> factoryClass, @Nullable ClassLoader classLoader) {
        String factoryClassName = factoryClass.getName();
        return (List)loadSpringFactories(classLoader).getOrDefault(factoryClassName, Collections.emptyList());
    }
    private static Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) {
        MultiValueMap<String, String> result = (MultiValueMap)cache.get(classLoader);
        if (result != null) {
            return result;
        } else {
            try {
                Enumeration<URL> urls = classLoader != null ? classLoader.getResources("META-INF/spring.factories") : ClassLoader.getSystemResources("META-INF/spring.factories");
                LinkedMultiValueMap result = new LinkedMultiValueMap();
                while(urls.hasMoreElements()) {
                    URL url = (URL)urls.nextElement();
                    UrlResource resource = new UrlResource(url);
                    Properties properties = PropertiesLoaderUtils.loadProperties(resource);
                    Iterator var6 = properties.entrySet().iterator();
                    while(var6.hasNext()) {
                        Entry<?, ?> entry = (Entry)var6.next();
                        String factoryClassName = ((String)entry.getKey()).trim();
                        String[] var9 = StringUtils.commaDelimitedListToStringArray((String)entry.getValue());
                        int var10 = var9.length;
                        for(int var11 = 0; var11 < var10; ++var11) {
                            String factoryName = var9[var11];
                            result.add(factoryClassName, factoryName.trim());
                        }
                    }
                }
                cache.put(classLoader, result);
                return result;
            } catch (IOException var13) {
                throw new IllegalArgumentException("Unable to load factories from location [META-INF/spring.factories]", var13);
            }
        }
    }
    private static <T> T instantiateFactory(String instanceClassName, Class<T> factoryClass, ClassLoader classLoader) {
        try {
            Class<?> instanceClass = ClassUtils.forName(instanceClassName, classLoader);
            if (!factoryClass.isAssignableFrom(instanceClass)) {
                throw new IllegalArgumentException("Class [" + instanceClassName + "] is not assignable to [" + factoryClass.getName() + "]");
            } else {
                return ReflectionUtils.accessibleConstructor(instanceClass, new Class[0]).newInstance();
            }
        } catch (Throwable var4) {
            throw new IllegalArgumentException("Unable to instantiate factory class: " + factoryClass.getName(), var4);
        }
    }
}
```

### 2.x和3.x factories文件之间的区别
在2.x版本中
```plaint
# META-INF/spring.factories
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.example.MyAutoConfiguration,\
com.example.AnotherAutoConfiguration
```

3.x版本后换成了imports文件
```java
# META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports
com.example.MyAutoConfiguration
com.example.AnotherAutoConfiguration
```

## 总结
`spring.factories`用键值对的方式记录了所有需要加入容器的类、`EnableAutoConfigurationImportSelector`的`selectImports`方法返回的类名、来自`spring.factories`文件内的配置信息，
这些配置信息的key等于`EnableAutoConfiguration`，因为spring boot应用启动时使用了`EnableAutoConfiguration`注解，
所以`EnableAutoConfiguration`注解通过import注解将`EnableAutoConfigurationImportSelector`类实例化，并且将其`selectImports`方法返回的类名实例化后注册到spring容器。

以上内容是`springboot`获得这些类的方式，如果你想要实现自己的自动配置，就将你的类通过键值对的方式写在你的`spring.factories`即可。
注意，值是你的自动配置类，键必须是`org.springframework.boot.autoconfigure.EnableAutoConfiguration`


import{_ as a,c as t,a as i,b as n,d as s,e as r,w as d,r as c,o as p}from"./app-NPlhaZmH.js";const u={};function o(v,e){const l=c("scope");return p(),t("div",null,[e[6]||(e[6]=i('<h2 id="思考" tabindex="-1"><a class="header-anchor" href="#思考"><span>思考</span></a></h2><h3 id="为什么使用redis作为注册中心而不是-nacos-consul-zookeeper" tabindex="-1"><a class="header-anchor" href="#为什么使用redis作为注册中心而不是-nacos-consul-zookeeper"><span>为什么使用Redis作为注册中心而不是 Nacos/Consul/Zookeeper？</span></a></h3><p>本项目使用轻量级的动态配置中心组件（Dynamic Config Center），主要用于管理应用配置、功能开关等简单配置项。 从代码实现来看，项目使用了Redisson客户端与Redis进行交互，实现了配置的动态获取、注入和更新功能。</p><p>相比Nacos/Consul/Zookeeper，Redis部署和维护更加简单，资源占用更少，特别适合小型项目或对配置中心功能需求相对简单的场景。 作为轻量级的组件，引入Nacos/Consul/Zookeeper会引入额外的复杂度，在微服务应用中引入该组件时可以考虑根据实际需求景使用其他的方式作为注册中心</p><p>项目利用Redis的发布/订阅功能实现了配置变更的实时通知机制，当配置更新时，可以立即通知到所有相关服务。</p><h3 id="基于-spi-机制的组件框架中-如何定义组件接口和实现类-业务系统如何-按需引入-组件-如只引入限流组件-不引入动态配置-组件版本冲突如何解决" tabindex="-1"><a class="header-anchor" href="#基于-spi-机制的组件框架中-如何定义组件接口和实现类-业务系统如何-按需引入-组件-如只引入限流组件-不引入动态配置-组件版本冲突如何解决"><span>基于 SPI 机制的组件框架中，如何定义组件接口和实现类？业务系统如何 “按需引入” 组件（如只引入限流组件，不引入动态配置）？组件版本冲突如何解决？</span></a></h3><p>在项目中，组件接口和实现类采用了清晰的分层设计模式</p><ul><li>使用Java标准接口定义组件能力边界，如 <code>StrategyHandler&lt;T, D, R&gt;</code> 和 <code>IDynamicConfigCenterService</code> 广泛使用泛型（T、D、R）提高接口灵活性和复用性；接口方法设计简洁明确，聚焦核心功能。</li><li>实现类实现对应接口，并通过 @Component 、 @Service 等Spring注解注册为Bean； 例如 <code>DynamicConfigCenterService</code> 实现了 <code>IDynamicConfigCenterService</code> 接口；采用继承抽象类（如 AbstractXxxSupport ）的方式复用通用逻辑。</li><li>利用Spring Boot的 spring.factories 机制实现组件的自动装配，如限流组件在 spring.factories 中配置了 RateLimiterAutoConfig。</li></ul><p>项目采用Maven模块化结构和Spring Boot自动配置机制实现按需引入;</p>',9)),n("ul",null,[e[3]||(e[3]=n("li",null,"每个功能组件独立成模块，如 orbisz-wrench-starter-rate-limiter （限流）、 orbisz-wrench-starter-dynamic-config-center （动态配置中心）;各模块间通过Maven依赖关系管理。",-1)),e[4]||(e[4]=n("li",null,"业务系统（如测试项目 orbisz-wrench-test ）在其pom.xml中只引入所需组件依赖；例如如需限流功能，只需添加限流组件的依赖，不需要引入动态配置中心。",-1)),e[5]||(e[5]=n("li",null,"利用 @ConditionalOnMissingBean 等注解实现条件装配，组件通过 spring.factories 声明自动配置类，但只有在被引入时才会激活。",-1)),n("li",null,[e[1]||(e[1]=s("组件间依赖通过 ")),r(l,null,{default:d(()=>e[0]||(e[0]=[s("provided")])),_:1,__:[0]}),e[2]||(e[2]=s(" 设置为可选；如限流组件中对动态配置中心的依赖。"))])]),e[7]||(e[7]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">&lt;dependency&gt;</span>
<span class="line">    &lt;groupId&gt;cn.bugstack.wrench&lt;/groupId&gt;</span>
<span class="line">    &lt;artifactId&gt;xfg-wrench-starter-dynamic-config-center&lt;/artifactId&gt;</span>
<span class="line">    &lt;version&gt;1.0&lt;/version&gt;</span>
<span class="line">    &lt;scope&gt;provided&lt;/scope&gt;</span>
<span class="line">&lt;/dependency&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目采用BOM（Bill of Materials）机制和统一版本管理策略解决版本冲突：</p><ul><li>项目创建了 orbisz-wrench-bom 模块 <code>pom.xml</code> ，集中管理所有组件版本,BOM中使用 <code>&lt;dependencyManagement&gt;</code> 标签统一定义各组件版本.</li><li>使用Maven的依赖排除机制处理冲突，通过 <code>&lt;exclusions&gt;</code> 标签排除不需要的传递依赖。</li><li>所有组件在引入第三方库时明确指定版本号,如限流组件中对Guava的依赖</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">&lt;dependency&gt;</span>
<span class="line">    &lt;groupId&gt;com.google.guava&lt;/groupId&gt;</span>
<span class="line">    &lt;artifactId&gt;guava&lt;/artifactId&gt;</span>
<span class="line">    &lt;version&gt;32.1.3-jre&lt;/version&gt;</span>
<span class="line">&lt;/dependency&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>利用Spring Boot的依赖管理能力，继承Spring Boot的父POM,享受Spring Boot提供的依赖版本仲裁功能</li></ul><h3 id="自定义-dccvalue注解以及beanpostprocessor-拦截机制的实现。beanpostprocessor-的拦截时机是什么-你实现的-dccvalue-注解热更新机制里-如何保证配置更新的原子性和可见性" tabindex="-1"><a class="header-anchor" href="#自定义-dccvalue注解以及beanpostprocessor-拦截机制的实现。beanpostprocessor-的拦截时机是什么-你实现的-dccvalue-注解热更新机制里-如何保证配置更新的原子性和可见性"><span>自定义@DCCValue注解以及BeanPostProcessor 拦截机制的实现。BeanPostProcessor 的拦截时机是什么？你实现的 @DCCValue 注解热更新机制里，如何保证配置更新的原子性和可见性？</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Retention(RetentionPolicy.RUNTIME)</span>
<span class="line">@Target({ElementType.FIELD, ElementType.METHOD})</span>
<span class="line">@Documented</span>
<span class="line">public @interface DCCValue {</span>
<span class="line">    String value() default &quot;&quot;;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>@Retention(RetentionPolicy.RUNTIME) ：确保注解在运行时可被反射获取</li><li>@Target({ElementType.FIELD, ElementType.METHOD}) ：可用于字段和方法</li><li>value() 属性：配置格式为 属性名:默认值 ，例如 @DCCValue(&quot;downgradeSwitch:0&quot;)</li></ul><p>项目通过 DynamicConfigCenterAutoConfig 实现了 BeanPostProcessor 接口</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Configuration</span>
<span class="line">public class DynamicConfigCenterAutoConfig implements BeanPostProcessor {</span>
<span class="line">    </span>
<span class="line">    private final IDynamicConfigCenterService dynamicConfigCenterService;</span>
<span class="line"></span>
<span class="line">    public DynamicConfigCenterAutoConfig(IDynamicConfigCenterService dynamicConfigCenterService) {</span>
<span class="line">        this.dynamicConfigCenterService = dynamicConfigCenterService;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    @Override</span>
<span class="line">    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {</span>
<span class="line">        return dynamicConfigCenterService.proxyObject(bean);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拦截机制工作流程 ：</p><ol><li>实现了 BeanPostProcessor 接口的 postProcessAfterInitialization 方法</li><li>在Bean初始化后，调用 dynamicConfigCenterService.proxyObject(bean) 方法处理Bean</li><li>核心逻辑在 DynamicConfigCenterService 类中实现</li></ol><p>BeanPostProcessor的拦截时机:</p><ul><li>Bean初始化前后拦截 ： <ul><li>postProcessBeforeInitialization ：在Bean初始化方法（如 InitializingBean.afterPropertiesSet 、自定义 init-method ）执行前被调用</li><li>postProcessAfterInitialization ：在Bean初始化方法执行后被调用</li></ul></li><li>拦截的具体作用 ： <ul><li>扫描Bean中的 @DCCValue 注解</li><li>从Redis中获取配置值（不存在则使用默认值）</li><li>通过反射将配置值注入到Bean的字段中</li><li>注册Bean到 dccBeanGroup 中，用于后续热更新</li></ul></li></ul><h3 id="dccvalue注解热更新机制中的原子性和可见性保证" tabindex="-1"><a class="header-anchor" href="#dccvalue注解热更新机制中的原子性和可见性保证"><span>@DCCValue注解热更新机制中的原子性和可见性保证</span></a></h3><p>原子性：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Override</span>
<span class="line">public void adjustAttributeValue(AttributeVO attributeVO) {</span>
<span class="line">    // 属性信息</span>
<span class="line">    String key = properties.getKey(attributeVO.getAttribute());</span>
<span class="line">    String value = attributeVO.getValue();</span>
<span class="line">    </span>
<span class="line">    // 设置值</span>
<span class="line">    RBucket&lt;String&gt; bucket = redissonClient.getBucket(key);</span>
<span class="line">    boolean exists = bucket.isExists();</span>
<span class="line">    if (!exists) return;</span>
<span class="line">    bucket.set(attributeVO.getValue()); // Redis单命令操作保证原子性</span>
<span class="line">    </span>
<span class="line">    // 后续代码...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Redis的 set 操作是单命令原子操作</li><li>利用Redis的单线程特性保证配置更新的原子性</li><li>避免了分布式环境下的竞态条件</li></ul><p>可见性:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">private final Map&lt;String, Object&gt; dccBeanGroup = new ConcurrentHashMap&lt;&gt;();</span>
<span class="line"></span>
<span class="line">// 在proxyObject方法中注册Bean</span>
<span class="line">dccBeanGroup.put(key, targetBeanObject);</span>
<span class="line"></span>
<span class="line">// 在adjustAttributeValue方法中更新Bean</span>
<span class="line">Object objBean = dccBeanGroup.get(key);</span>
<span class="line">if (null == objBean) return;</span>
<span class="line"></span>
<span class="line">// 反射更新字段值</span>
<span class="line">Field field = objBeanClass.getDeclaredField(attributeVO.getAttribute());</span>
<span class="line">field.setAccessible(true);</span>
<span class="line">field.set(objBean, value);</span>
<span class="line">field.setAccessible(false);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用 ConcurrentHashMap 存储Bean引用，保证多线程环境下的可见性</li><li>通过Redis的发布/订阅机制，确保配置变更能实时通知到所有实例</li><li>反射直接修改Bean的字段值，确保更新后立即可见</li></ul><h3 id="完整的-dccvalue注解处理和热更新流程如下" tabindex="-1"><a class="header-anchor" href="#完整的-dccvalue注解处理和热更新流程如下"><span>完整的@DCCValue注解处理和热更新流程如下：</span></a></h3><ol><li>初始化阶段 ：</li></ol><ul><li>Spring容器启动时， DynamicConfigCenterAutoConfig 作为BeanPostProcessor被注册</li><li>每个Bean初始化后， postProcessAfterInitialization 方法被调用</li><li>扫描Bean中的 @DCCValue 注解，注入配置值并注册到 dccBeanGroup</li></ul><ol start="2"><li>热更新阶段 ：</li></ol><ul><li>外部系统通过Redis发布配置变更消息</li><li>DynamicConfigCenterAdjustListener 接收消息</li><li>调用 adjustAttributeValue 方法更新Redis中的配置</li><li>通过反射更新Bean中的字段值</li><li>保证配置变更实时生效</li></ul><h3 id="redis-pub-sub-的推送在网络分区下会丢消息吗-如何保证一致性-redis-pub-sub消息丢失如何处理" tabindex="-1"><a class="header-anchor" href="#redis-pub-sub-的推送在网络分区下会丢消息吗-如何保证一致性-redis-pub-sub消息丢失如何处理"><span>Redis Pub/Sub 的推送在网络分区下会丢消息吗？如何保证一致性？Redis Pub/Sub消息丢失如何处理？</span></a></h3><p>Redis Pub/Sub 在网络分区情况下可能会丢失消息。</p><ul><li>无状态设计 ：Redis Pub/Sub 是基于推送模式的无状态消息系统，不维护消息队列或消息历史</li><li>临时订阅关系 ：客户端与 Redis 服务器的连接断开后，订阅关系会丢失</li><li>不持久化消息 ：Redis Pub/Sub 不会持久化消息，发布的消息仅发送给当时在线的订阅者</li></ul><p>当前项目中保证配置一致性的机制主要包括：</p><ul><li>配置同时存储在 Redis 和本地 ConcurrentHashMap 中，<code>private final Map&lt;String, Object&gt; dccBeanGroup = new ConcurrentHashMap&lt;&gt;();</code></li><li>使用 Redis 的单命令操作保证配置更新的原子性:在 adjustAttributeValue 方法中使用 bucket.set() 原子更新 Redis 中的配置值</li><li>在 Redis 连接配置中设置了重试机制,在 <code>DynamicConfigCenterRegisterAutoProperties</code> 中配置了重试次数和间隔</li><li>系统在初始化时会主动从 Redis 拉取配置，不完全依赖推送机制</li></ul><p>Redis Pub/Sub 消息丢失如何处理？</p><ul><li>在消息监听器中捕获处理异常，但没有实现重试逻辑</li><li>定时从 Redis 拉取最新配置来补充推送机制的不足</li></ul><p>为了提升 Redis Pub/Sub 在网络分区下的可靠性，可以考虑以下优化:</p><ul><li>增加消息确认机制 ：实现消息处理确认，对于未确认的消息进行重试</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// 伪代码示例：增加消息确认机制</span>
<span class="line">public void onMessage(CharSequence charSequence, AttributeVO attributeVO) {</span>
<span class="line">    try {</span>
<span class="line">        // 记录消息处理开始</span>
<span class="line">        recordMessageProcessingStart(attributeVO);</span>
<span class="line">        dynamicConfigCenterService.adjustAttributeValue(attributeVO);</span>
<span class="line">        // 记录消息处理完成</span>
<span class="line">        recordMessageProcessingComplete(attributeVO);</span>
<span class="line">    } catch (Exception e) {</span>
<span class="line">        // 记录失败并重试</span>
<span class="line">        scheduleRetry(attributeVO);</span>
<span class="line">        log.error(&quot;处理消息失败: {}&quot;, e.getMessage(), e);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用 Redis Stream 替代 Pub/Sub ：Redis Stream 提供了持久化和消费确认机制</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// 伪代码示例：使用Redis Stream</span>
<span class="line">public void setupStreamListener() {</span>
<span class="line">    RStream&lt;String, AttributeVO&gt; stream = redissonClient.getStream(&quot;config_stream&quot;);</span>
<span class="line">    stream.createGroup(&quot;config_group&quot;);</span>
<span class="line">    stream.readGroupAsync(&quot;config_group&quot;, &quot;consumer_1&quot;, </span>
<span class="line">                         StreamReadGroupParams.count(10).block(1000));</span>
<span class="line">}  </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>实现配置比对和补偿机制 ：定时比对本地配置与 Redis 配置，发现不一致时进行补偿更新</li><li>增加消息持久化存储 ：重要配置变更可以记录到数据库或日志文件中，便于追溯和恢复</li></ul><h3 id="配置变更时-如动态调整限流阈值-如何保证业务逻辑的无缝切换" tabindex="-1"><a class="header-anchor" href="#配置变更时-如动态调整限流阈值-如何保证业务逻辑的无缝切换"><span>配置变更时（如动态调整限流阈值），如何保证业务逻辑的无缝切换？</span></a></h3><p>系统使用 @DCCValue 注解标记需要动态更新的配置字段;</p><p>DynamicConfigCenterService 中的 adjustAttributeValue 方法负责动态更新内存中的配置值, 当线上修改某个配置值时</p><ol><li>发布消息: 外部系统（或其他服务）向 Redis 的⼀个特定 Topic (主题) 发布⼀条消息。这 条消息包含了要修改的配置名和新的值 (例如 new AttributeVO(&quot;downgradeSwitch&quot;, &quot;100&quot;))。</li><li>监听消息: DynamicConfigCenterAdjustListener ⼀直在监听这个 Topic，它接收到消息 后，会⽴即响应。</li><li>调⽤服务: 监听器会调⽤ DynamicConfigCenterService 的 adjustAttributeValue ⽅法更新配置</li></ol><ul><li>该方法首先会更新Redis中存储的值</li><li>然后，它会从<code>proxyObject</code>(处理Bean对象并进行动态配置注入)存入的dccBeanGroup(存储配置与Bean的映射关系)中读取出来需要的注入的Bean实例.dccBeanGroup使用ConcurrentHashMap确保在多线程环境下的并发安全性，避免配置更新过程中的线程安全问题</li><li>最后，再次通过反射直接修改那个在线的、正在运⾏的 Bean 实例的字段值，从⽽实现动态更新。</li></ul><p>在 RateLimiterAOP 中，通过开关控制是否执行限流逻辑，实现了限流功能的灵活开启和关闭;</p><p>使用 Guava Cache 存储限流实例，设置了过期时间，使得配置变更可以通过缓存过期自然生成</p><h3 id="如何解决的aop注解识别问题" tabindex="-1"><a class="header-anchor" href="#如何解决的aop注解识别问题"><span>如何解决的AOP注解识别问题</span></a></h3><p>在 Spring AOP 环境下，当 Bean 被代理后，直接通过 bean.getClass() 无法获取到原始类的注解信息，这会导致自定义注解（如 <code>DCCValue</code> ）识别失败。</p><p>在 <code>DynamicConfigCenterService</code> 的 proxyObject 方法中，</p><ul><li>使用 AopUtils.isAopProxy(bean) 检测是否为代理对象</li><li>使用 AopUtils.getTargetClass(bean) 获取真实的目标类</li><li>使用 AopProxyUtils.getSingletonTarget(bean) 获取目标实例</li></ul><h3 id="规则树组合模式是怎么序列化存储到数据库的-如果规则过多-如何避免执行性能下降-单例链和多例链的差别是什么-在多线程环境下如何保障线程安全" tabindex="-1"><a class="header-anchor" href="#规则树组合模式是怎么序列化存储到数据库的-如果规则过多-如何避免执行性能下降-单例链和多例链的差别是什么-在多线程环境下如何保障线程安全"><span>规则树组合模式是怎么序列化存储到数据库的？如果规则过多，如何避免执行性能下降？单例链和多例链的差别是什么？在多线程环境下如何保障线程安全？</span></a></h3><p><code>AbstractStrategyRouter.java</code> 和 <code>StrategyHandler</code> 定义了规则树的抽象行为和接口。这是一个典型的组合模式 + 策略模式的实现，它规定了“如何执行”，但不关心“规则从哪来”。</p><p>系统中规则树组合模式主要采用以下序列化存储方式</p><ol><li>基于JSON的序列化机制 ：在 MemberLevel1Node 和 MemberLevel2Node 等规则节点实现中，可以看到使用 com.alibaba.fastjson.JSON 库进行对象序列化，如 JSON.toJSONString(dynamicContext) 将上下文对象转换为JSON字符串。</li><li>DynamicContext 类使用 HashMap&lt;String, Object&gt; 作为底层存储结构，支持灵活存储各种类型的数据对象，并提供了泛型方法 setValue 和 getValue 进行数据存取，这为序列化提供了基础。</li><li>通过 Rule01TradeRuleFactory 和 Rule02TradeRuleFactory 等工厂类，系统采用了声明式的规则装配方式，便于将规则结构定义转换为可存储的配置信息。</li><li>所有规则节点（如 RootNode 、 AccountNode 等）都被注册为Spring Bean，通过依赖注入方式构建规则树，这种方式便于规则组件的管理和配置化。</li></ol><p>系统采用了多层次的性能优化策略来应对规则过多的场景</p><ol><li>异步并行处理机制 ：在 AbstractMultiThreadStrategyRouter 类中实现了异步资源加载策略，通过 multiThread 抽象方法允许各个规则节点并行加载所需资源。所有异步任务完成后，再调用 doApply 方法执行核心的业务逻辑。</li><li>CompletableFuture并行计算 ：在 AccountNode 类中，使用 CompletableFuture.supplyAsync 实现多任务并行执行，如同时查询账户标签和授信数据，显著提升了多规则并行处理能力。</li><li>线程池优化配置 ：通过 ThreadPoolConfig 类配置了线程池参数，包括核心线程数、最大线程数、队列大小和拒绝策略，确保系统在高并发场景下的稳定运行。</li><li>异步日志处理 ：日志系统配置了异步输出（ ASYNC_FILE_INFO 、 ASYNC_FILE_ERROR ），使用大队列（ queueSize: 8192 ）和非阻塞模式（ neverBlock: true ），避免日志记录影响主业务流程。</li><li>规则动态路由 ：通过 router 方法实现规则的动态选择，避免不必要的规则执行，只执行符合条件的规则链。</li></ol><p>单例链：整个应用中，责任链的所有处理器（Link）实例只有一份。无需频繁创建和销毁对象，节省了内存和 GC 开销。</p><ul><li>实现于 AbstractLogicLink 类，通过 appendNext 方法构建单向链表</li><li>每个规则处理器（如 RuleLogic101 、 RuleLogic102 ）作为链中的一个节点</li><li>通过 next() 方法手动调用下一个处理器，控制流程更灵活</li><li>适用于无状态、纯逻辑处理的场景。</li></ul><p>多例链：每次请求（或每次调用）都会创建一套 全新的 责任链处理器实例。每个请求都有自己的处理器对象，互不干扰。</p><ul><li>实现于 BusinessLinkedList 类，基于双向链表数据结构</li><li>通过 LinkArmory 工厂一次性装配多个逻辑处理器</li><li>内部通过迭代器模式自动执行链中的所有处理器</li><li>通过 dynamicContext.isProceed() 控制是否继续执行下一个处理器</li><li>适用于处理逻辑复杂，需要在多个处理器之间传递和修改大量状态的场景。</li></ul><p>线程安全主要通过无状态设计和线程安全的数据容器来保障。</p><ul><li>无论是策略树的 <code>StrategyHandler</code> 还是责任链的处理器，框架本身的设计鼓励您将它们实现为无状态的。</li><li>所有的动态数据、业务参数都应该封装在 requestParameter (T) 和 dynamicContext (D) 这两个参数对象中进行传递，而不是作为处理器的成员变量。</li><li>当使用 <code>AbstractMultiThreadStrategyRouter.java</code> 进行并发处理时，多个线程可能会同时读写 dynamicContext 对象。 在这种情况下， dynamicContext 对象自身的设计必须是线程安全的。例如，其内部可以使用 ConcurrentHashMap 来存储数据，或者使用 ThreadLocal 来保证每个线程有自己的数据副本，避免数据竞争。</li><li>如果处理器需要持有状态，必须将其作用域定义为 prototype （多例），从根本上避免共享状态引发的线程安全问题。如果定义为 singleton （单例），则必须保证其无状态。</li></ul><h3 id="标准化责任链-支持单例-多例链-与规则树-组合模式-的串行实现" tabindex="-1"><a class="header-anchor" href="#标准化责任链-支持单例-多例链-与规则树-组合模式-的串行实现"><span>标准化责任链（支持单例/多例链）与规则树（组合模式）的串行实现</span></a></h3><h4 id="核心架构设计" tabindex="-1"><a class="header-anchor" href="#核心架构设计"><span>核心架构设计</span></a></h4><ol><li>标准化管理层 <ul><li><code>StandardChainTreeManager</code> ：核心管理类，负责责任链和规则树的注册、管理和执行</li><li><code>StandardChainTreeConfig</code> ：配置类，在 Spring 启动时自动注册现有的责任链和规则树</li><li><code>StandardChainTreeService</code> ：服务接口，定义标准化操作规范</li></ul></li><li>责任链模式实现 <ul><li>Model1 单例责任链:<code>ILogicLink</code> ：责任链节点接口;<code>AbstractLogicLink</code> ：抽象责任链节点，提供链式调用能力;<code>ILogicChainArmory</code> ：责任链装配接口.</li><li>Model2 多例责任链:<code>ILogicHandler</code> ：逻辑处理器接口，支持 next() 和 stop() 控制; <code>BusinessLinkedList</code> ：业务链路实现 ;<code>LinkArmory</code> ：链路装配器;<code>DynamicContext</code> ：动态上下文，支持数据传递和流程控制。</li></ul></li><li>规则树模式实现（组合模式）：<code>StrategyHandler</code> ：策略处理接口；<code>StrategyMapper</code> ：策略映射器接口；<code>AbstractStrategyRouter</code> ：策略路由抽象类；<code>AbstractMultiThreadStrategyRouter</code> ：多线程异步策略路由</li></ol><p>链式执行流程</p><ol><li>单例链执行 ：直接调用预构建的链实例</li><li>多例链执行 ：动态构建 BusinessLinkedList ，通过 DynamicContext.isProceed() 控制流程</li><li>规则树执行 ：通过 AbstractStrategyRouter.router() 进行策略路由</li></ol><h3 id="项目中guava-ratelimiter-的令牌桶算法原理是什么-优缺点-为什么不用滑动窗口-如何在分布式环境下实现全局-qps-限流-可不可以通过redis或者其他方式实现限流" tabindex="-1"><a class="header-anchor" href="#项目中guava-ratelimiter-的令牌桶算法原理是什么-优缺点-为什么不用滑动窗口-如何在分布式环境下实现全局-qps-限流-可不可以通过redis或者其他方式实现限流"><span>项目中Guava RateLimiter 的令牌桶算法原理是什么？优缺点？为什么不用滑动窗口？，如何在分布式环境下实现全局 QPS 限流，可不可以通过Redis或者其他方式实现限流？</span></a></h3><p>令牌桶算法原理</p><ul><li>系统以固定速率（permitsPerSecond）向桶中投放令牌</li><li>每个请求需要获取一个令牌才能通过，获取不到则被限流</li><li>桶有最大容量限制，多余令牌会被丢弃；当桶中没有令牌时，请求将被限流（等待或拒绝）</li><li>令牌桶可以累积一定数量的令牌，允许短时间内的流量突发</li></ul><p>RateLimiter 通过 RateLimiter.create(rateLimiterAccessInterceptor.permitsPerSecond()) 来创建限流器，其中 permitsPerSecond 就是每秒生成的令牌数量。</p><p>桶中预存令牌可以处理短时间的流量突发；平滑限流可以避免流量的剧烈波动，提供更好的用户体验；算法实现简单，性能开销小；只需维护令牌桶状态，内存占用少； 但是无法直接支持分布式环境下的全局限流；可能允许超过平均速率的突发请求；需要合理设置令牌生成速率和桶容量</p><blockquote><p>不用滑动窗口</p><p>滑动窗口实现相对复杂，需要维护时间窗口内的请求记录；流量控制不如令牌桶平滑 令牌桶算法在内存和计算开销上通常低于滑动窗口；项目已集成 Guava，可以直接利用其现成的限流器实现</p></blockquote><h3 id="分布式环境下实现全局-qps-限流" tabindex="-1"><a class="header-anchor" href="#分布式环境下实现全局-qps-限流"><span>分布式环境下实现全局 QPS 限流</span></a></h3><p>基于 Redis + Lua 脚本的令牌桶</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">-- Redis Lua 脚本实现分布式令牌桶</span>
<span class="line">local key = KEYS[1]</span>
<span class="line">local capacity = tonumber(ARGV[1])  -- 桶容量</span>
<span class="line">local tokens = tonumber(ARGV[2])   -- 请求令牌数</span>
<span class="line">local interval = tonumber(ARGV[3]) -- 补充间隔</span>
<span class="line">local now = tonumber(ARGV[4])      -- 当前时间</span>
<span class="line"></span>
<span class="line">local bucket = redis.call(&#39;HMGET&#39;, key, &#39;tokens&#39;, &#39;last_refill&#39;)</span>
<span class="line">local current_tokens = tonumber(bucket[1]) or capacity</span>
<span class="line">local last_refill = tonumber(bucket[2]) or now</span>
<span class="line"></span>
<span class="line">-- 计算需要补充的令牌数</span>
<span class="line">local elapsed = now - last_refill</span>
<span class="line">local tokens_to_add = math.floor(elapsed / interval)</span>
<span class="line">current_tokens = math.min(capacity, current_tokens + tokens_to_add)</span>
<span class="line"></span>
<span class="line">if current_tokens &gt;= tokens then</span>
<span class="line">    current_tokens = current_tokens - tokens</span>
<span class="line">    redis.call(&#39;HMSET&#39;, key, &#39;tokens&#39;, current_tokens, &#39;last_refill&#39;, now)</span>
<span class="line">    redis.call(&#39;EXPIRE&#39;, key, 3600)</span>
<span class="line">    return 1  -- 获取成功</span>
<span class="line">else</span>
<span class="line">    redis.call(&#39;HMSET&#39;, key, &#39;tokens&#39;, current_tokens, &#39;last_refill&#39;, now)</span>
<span class="line">    redis.call(&#39;EXPIRE&#39;, key, 3600)</span>
<span class="line">    return 0  -- 获取失败</span>
<span class="line">end</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于 Redis 滑动窗口</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// 使用 Redis Sorted Set 实现滑动窗口</span>
<span class="line">public boolean isAllowed(String key, int limit, int windowSize) {</span>
<span class="line">    long now = System.currentTimeMillis();</span>
<span class="line">    long windowStart = now - windowSize * 1000;</span>
<span class="line">    </span>
<span class="line">    // 清理过期数据</span>
<span class="line">    jedis.zremrangeByScore(key, 0, windowStart);</span>
<span class="line">    </span>
<span class="line">    // 获取当前窗口内的请求数</span>
<span class="line">    long currentCount = jedis.zcard(key);</span>
<span class="line">    </span>
<span class="line">    if (currentCount &lt; limit) {</span>
<span class="line">        // 添加当前请求</span>
<span class="line">        jedis.zadd(key, now, UUID.randomUUID().toString());</span>
<span class="line">        jedis.expire(key, windowSize);</span>
<span class="line">        return true;</span>
<span class="line">    }</span>
<span class="line">    return false;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>基于数据库的计数器： <ul><li>使用数据库行锁实现原子计数</li><li>适合低并发场景，性能较差</li></ul></li><li>基于消息队列： <ul><li>使用 RabbitMQ、Kafka 等消息队列控制流量</li><li>天然支持削峰填谷</li></ul></li><li>基于分布式锁： <ul><li>使用 Zookeeper、etcd 等实现分布式锁</li><li>保证全局唯一性，但性能开销大</li></ul></li><li>网关层限流： <ul><li>在 API 网关（如 Kong、Zuul、Gateway）层实现</li><li>统一管理，配置灵活</li></ul></li></ol><h3 id="动态黑名单的失效策略-定时扫库-vs-redis过期" tabindex="-1"><a class="header-anchor" href="#动态黑名单的失效策略-定时扫库-vs-redis过期"><span>动态黑名单的失效策略（定时扫库 vs Redis过期）？</span></a></h3><p><strong>项目使用 Guava Cache 实现黑名单管理</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// 个人限频黑名单24h - 分布式业务场景，可以记录到 Redis 中</span>
<span class="line">private final Cache&lt;String, Long&gt; blacklist = CacheBuilder.newBuilder()</span>
<span class="line">        .expireAfterWrite(24, TimeUnit.HOURS)</span>
<span class="line">        .build();</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>黑名单条目在写入后24小时自动过期失效，不需要额外的定时扫库任务。</p><p><strong>Redis 过期机制</strong></p><div class="language-// line-numbers-mode" data-highlighter="prismjs" data-ext="//" data-title="//"><pre><code><span class="line">public void addToBlacklist(String key, long duration) {</span>
<span class="line">    jedis.setex(&quot;blacklist:&quot; + key, (int)(duration/1000), &quot;1&quot;);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">public boolean isInBlacklist(String key) {</span>
<span class="line">    return jedis.exists(&quot;blacklist:&quot; + key);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多实例间共享黑名单状态；利用Redis的TTL机制实现自动失效；支持 RDB/AOF 持久化</p><p><strong>定时扫库策略</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Scheduled(fixedRate = 300000) // 5分钟扫描一次</span>
<span class="line">public void cleanExpiredBlacklist() {</span>
<span class="line">    long now = System.currentTimeMillis();</span>
<span class="line">    blacklistRepository.deleteByExpireTimeBefore(now);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以自定义清理逻辑；一次性清理大量过期数据；可以记录清理日志；支持复杂的过期规则；性能更好，无需全表扫描。</p><p><strong>Redis + 本地缓存双层架构</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Component</span>
<span class="line">public class HybridBlacklistManager {</span>
<span class="line">    private final Cache&lt;String, Boolean&gt; localCache = CacheBuilder.newBuilder()</span>
<span class="line">            .expireAfterWrite(5, TimeUnit.MINUTES) // 本地缓存5分钟</span>
<span class="line">            .maximumSize(10000)</span>
<span class="line">            .build();</span>
<span class="line">    </span>
<span class="line">    private final RedisTemplate&lt;String, String&gt; redisTemplate;</span>
<span class="line">    </span>
<span class="line">    public boolean isInBlacklist(String key) {</span>
<span class="line">        // 先查本地缓存</span>
<span class="line">        Boolean cached = localCache.getIfPresent(key);</span>
<span class="line">        if (cached != null) {</span>
<span class="line">            return cached;</span>
<span class="line">        }</span>
<span class="line">        </span>
<span class="line">        // 再查 Redis</span>
<span class="line">        Boolean inRedis = redisTemplate.hasKey(&quot;blacklist:&quot; + key);</span>
<span class="line">        localCache.put(key, inRedis);</span>
<span class="line">        return inRedis;</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    public void addToBlacklist(String key, Duration duration) {</span>
<span class="line">        // 同时更新 Redis 和本地缓存</span>
<span class="line">        redisTemplate.opsForValue().set(&quot;blacklist:&quot; + key, &quot;1&quot;, duration);</span>
<span class="line">        localCache.put(key, true);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="黑名单拦截的实现和降级回调-降级回调如何设计才能避免雪崩效应" tabindex="-1"><a class="header-anchor" href="#黑名单拦截的实现和降级回调-降级回调如何设计才能避免雪崩效应"><span>黑名单拦截的实现和降级回调，降级回调如何设计才能避免雪崩效应？</span></a></h3><p>黑名单拦截</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// 黑名单缓存，24小时过期</span>
<span class="line">private final Cache&lt;String, Long&gt; blacklist = CacheBuilder.newBuilder()</span>
<span class="line">.expireAfterWrite(24, TimeUnit.HOURS)</span>
<span class="line">.build();</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拦截逻辑</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// 黑名单拦截检查</span>
<span class="line">if (!&quot;all&quot;.equals(keyAttr) &amp;&amp; rateLimiterAccessInterceptor.blacklistCount() != 0 </span>
<span class="line">    &amp;&amp; null != blacklist.getIfPresent(keyAttr) </span>
<span class="line">    &amp;&amp; blacklist.getIfPresent(keyAttr) &gt; rateLimiterAccessInterceptor.blacklistCount()) {</span>
<span class="line">    log.info(&quot;限流-黑名单拦截(24h)：{}&quot;, keyAttr);</span>
<span class="line">    return fallbackMethodResult(jp, rateLimiterAccessInterceptor.fallbackMethod());</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>黑名单更新机制</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// 限流失败时累积违规次数</span>
<span class="line">if (!rateLimiter.tryAcquire()) {</span>
<span class="line">    if (rateLimiterAccessInterceptor.blacklistCount() != 0) {</span>
<span class="line">        if (null == blacklist.getIfPresent(keyAttr)) {</span>
<span class="line">            blacklist.put(keyAttr, 1L);  // 首次违规</span>
<span class="line">        } else {</span>
<span class="line">            blacklist.put(keyAttr, blacklist.getIfPresent(keyAttr) + 1L);  // 累积计数</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return fallbackMethodResult(jp, rateLimiterAccessInterceptor.fallbackMethod());</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注解配置</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@RateLimiterAccessInterceptor(</span>
<span class="line">    key = &quot;userId&quot;,                    // 拦截标识字段</span>
<span class="line">    permitsPerSecond = 1.0,           // 每秒允许请求数</span>
<span class="line">    blacklistCount = 5,               // 黑名单阈值</span>
<span class="line">    fallbackMethod = &quot;fallbackMethod&quot; // 降级方法名</span>
<span class="line">)</span>
<span class="line">public String businessMethod(String userId) {</span>
<span class="line">    // 业务逻辑</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>降级方法执行，通过反射动态调用用户自定义的降级方法，实现了灵活、可扩展的限流降级策略。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">private Object fallbackMethodResult(JoinPoint jp, String fallbackMethod) </span>
<span class="line">    throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {</span>
<span class="line">    Signature sig = jp.getSignature();</span>
<span class="line">    MethodSignature methodSignature = (MethodSignature) sig;</span>
<span class="line">    // 通过反射调用同类中的降级方法</span>
<span class="line">    Method method = jp.getTarget().getClass().getMethod(fallbackMethod, methodSignature.getParameterTypes());</span>
<span class="line">    return method.invoke(jp.getThis(), jp.getArgs());</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拦截流程</p><ul><li>检查限流开关是否开启</li><li>从方法参数中提取拦截标识</li><li>优先检查是否在黑名单中</li><li>使用 Guava RateLimiter 进行令牌桶限流</li><li>限流失败时更新黑名单计数</li><li>触发拦截时调用降级方法</li></ul>`,104))])}const m=a(u,[["render",o]]),g=JSON.parse('{"path":"/blogs/Project/wrench/4.html","title":"通用技术组件-问题梳理","lang":"en-US","frontmatter":{"title":"通用技术组件-问题梳理","date":"2025/8/10","tags":["动态配置","组件开发"],"categories":["后端开发"]},"headers":[{"level":2,"title":"思考","slug":"思考","link":"#思考","children":[{"level":3,"title":"为什么使用Redis作为注册中心而不是 Nacos/Consul/Zookeeper？","slug":"为什么使用redis作为注册中心而不是-nacos-consul-zookeeper","link":"#为什么使用redis作为注册中心而不是-nacos-consul-zookeeper","children":[]},{"level":3,"title":"基于 SPI 机制的组件框架中，如何定义组件接口和实现类？业务系统如何 “按需引入” 组件（如只引入限流组件，不引入动态配置）？组件版本冲突如何解决？","slug":"基于-spi-机制的组件框架中-如何定义组件接口和实现类-业务系统如何-按需引入-组件-如只引入限流组件-不引入动态配置-组件版本冲突如何解决","link":"#基于-spi-机制的组件框架中-如何定义组件接口和实现类-业务系统如何-按需引入-组件-如只引入限流组件-不引入动态配置-组件版本冲突如何解决","children":[]},{"level":3,"title":"自定义@DCCValue注解以及BeanPostProcessor 拦截机制的实现。BeanPostProcessor 的拦截时机是什么？你实现的 @DCCValue 注解热更新机制里，如何保证配置更新的原子性和可见性？","slug":"自定义-dccvalue注解以及beanpostprocessor-拦截机制的实现。beanpostprocessor-的拦截时机是什么-你实现的-dccvalue-注解热更新机制里-如何保证配置更新的原子性和可见性","link":"#自定义-dccvalue注解以及beanpostprocessor-拦截机制的实现。beanpostprocessor-的拦截时机是什么-你实现的-dccvalue-注解热更新机制里-如何保证配置更新的原子性和可见性","children":[]},{"level":3,"title":"@DCCValue注解热更新机制中的原子性和可见性保证","slug":"dccvalue注解热更新机制中的原子性和可见性保证","link":"#dccvalue注解热更新机制中的原子性和可见性保证","children":[]},{"level":3,"title":"完整的@DCCValue注解处理和热更新流程如下：","slug":"完整的-dccvalue注解处理和热更新流程如下","link":"#完整的-dccvalue注解处理和热更新流程如下","children":[]},{"level":3,"title":"Redis Pub/Sub 的推送在网络分区下会丢消息吗？如何保证一致性？Redis Pub/Sub消息丢失如何处理？","slug":"redis-pub-sub-的推送在网络分区下会丢消息吗-如何保证一致性-redis-pub-sub消息丢失如何处理","link":"#redis-pub-sub-的推送在网络分区下会丢消息吗-如何保证一致性-redis-pub-sub消息丢失如何处理","children":[]},{"level":3,"title":"配置变更时（如动态调整限流阈值），如何保证业务逻辑的无缝切换？","slug":"配置变更时-如动态调整限流阈值-如何保证业务逻辑的无缝切换","link":"#配置变更时-如动态调整限流阈值-如何保证业务逻辑的无缝切换","children":[]},{"level":3,"title":"如何解决的AOP注解识别问题","slug":"如何解决的aop注解识别问题","link":"#如何解决的aop注解识别问题","children":[]},{"level":3,"title":"规则树组合模式是怎么序列化存储到数据库的？如果规则过多，如何避免执行性能下降？单例链和多例链的差别是什么？在多线程环境下如何保障线程安全？","slug":"规则树组合模式是怎么序列化存储到数据库的-如果规则过多-如何避免执行性能下降-单例链和多例链的差别是什么-在多线程环境下如何保障线程安全","link":"#规则树组合模式是怎么序列化存储到数据库的-如果规则过多-如何避免执行性能下降-单例链和多例链的差别是什么-在多线程环境下如何保障线程安全","children":[]},{"level":3,"title":"标准化责任链（支持单例/多例链）与规则树（组合模式）的串行实现","slug":"标准化责任链-支持单例-多例链-与规则树-组合模式-的串行实现","link":"#标准化责任链-支持单例-多例链-与规则树-组合模式-的串行实现","children":[]},{"level":3,"title":"项目中Guava RateLimiter 的令牌桶算法原理是什么？优缺点？为什么不用滑动窗口？，如何在分布式环境下实现全局 QPS 限流，可不可以通过Redis或者其他方式实现限流？","slug":"项目中guava-ratelimiter-的令牌桶算法原理是什么-优缺点-为什么不用滑动窗口-如何在分布式环境下实现全局-qps-限流-可不可以通过redis或者其他方式实现限流","link":"#项目中guava-ratelimiter-的令牌桶算法原理是什么-优缺点-为什么不用滑动窗口-如何在分布式环境下实现全局-qps-限流-可不可以通过redis或者其他方式实现限流","children":[]},{"level":3,"title":"分布式环境下实现全局 QPS 限流","slug":"分布式环境下实现全局-qps-限流","link":"#分布式环境下实现全局-qps-限流","children":[]},{"level":3,"title":"动态黑名单的失效策略（定时扫库 vs Redis过期）？","slug":"动态黑名单的失效策略-定时扫库-vs-redis过期","link":"#动态黑名单的失效策略-定时扫库-vs-redis过期","children":[]},{"level":3,"title":"黑名单拦截的实现和降级回调，降级回调如何设计才能避免雪崩效应？","slug":"黑名单拦截的实现和降级回调-降级回调如何设计才能避免雪崩效应","link":"#黑名单拦截的实现和降级回调-降级回调如何设计才能避免雪崩效应","children":[]}]}],"git":{"createdTime":1755092504000,"updatedTime":1755092504000,"contributors":[{"name":"zxy","email":"zxy0613zxy@outlook.com","commits":1}]},"filePathRelative":"blogs/Project/wrench/4.md"}');export{m as comp,g as data};

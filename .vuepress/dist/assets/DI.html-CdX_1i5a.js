import{_ as s,c as e,a as i,o as a}from"./app-BLst8MTc.js";const l={};function d(r,n){return a(),e("div",null,n[0]||(n[0]=[i(`<p><strong>实例化注解</strong></p><ul><li>@Component：组件注解</li><li>@Service：服务注解</li><li>@Repository：仓储注解，提供对持久化类数据的操作的服务。</li><li>@Controller/@RestController()：对外提供服务的注解。</li></ul><h3 id="构造注入-list、map" tabindex="-1"><a class="header-anchor" href="#构造注入-list、map"><span>构造注入&amp;List、Map</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">private final List&lt;IAwardService&gt; awardServices;</span>
<span class="line">private final Map&lt;String, IAwardService&gt; awardServiceMap;</span>
<span class="line"></span>
<span class="line">public AwardController(List&lt;IAwardService&gt; awardServices, Map&lt;String, IAwardService&gt; awardServiceMap) {</span>
<span class="line">    this.awardServices = awardServices;</span>
<span class="line">    this.awardServiceMap = awardServiceMap;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">public Response&lt;String&gt; distributeAward(@RequestParam String userId, @RequestParam String awardKey) {</span>
<span class="line">    try {</span>
<span class="line">        log.info(&quot;发放奖品服务 userId:{} awardKey:{}&quot;, userId, awardKey);</span>
<span class="line">        awardServiceMap.get(awardKey);</span>
<span class="line">        return Response.&lt;String&gt;builder()</span>
<span class="line">                .code(&quot;0000&quot;)</span>
<span class="line">                .info(&quot;调用成功&quot;)</span>
<span class="line">                .data(&quot;发奖完成&quot;)</span>
<span class="line">                .build();</span>
<span class="line">    } catch (Exception e) {</span>
<span class="line">        return Response.&lt;String&gt;builder()</span>
<span class="line">                .code(&quot;0001&quot;)</span>
<span class="line">                .info(&quot;调用失败&quot;)</span>
<span class="line">                .build();</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IAwardService 接口有多个实现类，可以通过 @Resource、@Autowired 注解注入，也可以通过构造函数注入。</p><p>Map 注入是一个非常好的注入手段，在抽奖项目实现奖品发奖时， 我们可以把每个 IAwardService 实现类设定好 Bean 的名称为数据库中的奖品 awardKey。在发奖的时候，可以直接根据 awardKey 从 Map 中获取到对应的 Bean 对象，这样也就省去了 if···else 大量的判断操作。</p><h3 id="空注入判断" tabindex="-1"><a class="header-anchor" href="#空注入判断"><span>空注入判断</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class NullAwardService implements IAwardService {</span>
<span class="line"></span>
<span class="line">    @Override</span>
<span class="line">    public void doDistributeAward(String userId) {</span>
<span class="line"></span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">@Autowired(required = false)</span>
<span class="line">private NullAwardService nullAwardService;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>NullAwardService 没有配置 @Service 注册，或者在程序中手动实例化的这个 Bean 对象，根据不同诉求，在没有创建的时候。可以使用 @Autowired(required = false) 进行注入。这样就不会报错 nullAwardService 空指针异常。</p><p>当我们在使用支付、openai外部接口对接测试阶段，可能有些时候是需要关闭服务的，也就是不实例化对象。那么这个时候就配置 @Autowired(required = false) 避免注入空指针。</p><h3 id="优先实例化" tabindex="-1"><a class="header-anchor" href="#优先实例化"><span>优先实例化</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Slf4j</span>
<span class="line">@Service(&quot;openai_model&quot;)</span>
<span class="line">// Primary 首选 Bean 对象标记</span>
<span class="line">@Primary</span>
<span class="line">@Order(1)</span>
<span class="line">public class OpenAIModelAwardService implements IAwardService {</span>
<span class="line"></span>
<span class="line">    @Override</span>
<span class="line">    public void doDistributeAward(String userId) {</span>
<span class="line">        log.info(&quot;发奖服务，OpenAI 模型奖励 {}&quot;, userId);</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">@Resource</span>
<span class="line">private IAwardService awardService;</span>
<span class="line"></span>
<span class="line">@Test</span>
<span class="line">public void test_awardService_primary() {</span>
<span class="line">    log.info(&quot;测试结果 {}&quot;, awardService.getClass());</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">// 测试结果 class cn.bugstack.xfg.dev.tech.domain.impl.OpenAIModelAwardService</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个 IAwardService 有多个实现类的时候，如果还想用 @Resource 注入 awardService 的时候是会报错,显示 NoUniqueBeanDefinitionException 异常了。 这个时候使用 @Primary 就会标记为首选对象，注入的时候会注入这个对象。另外这里的 @Order(1) 是对象的加载顺序。</p><p>当我们为一组接口提供实现类，并需要提供默认的注入的时候，就可以使用 @Primary 注解来限定首选注入项。</p><h3 id="检测创建-避免重复" tabindex="-1"><a class="header-anchor" href="#检测创建-避免重复"><span>检测创建，避免重复</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Bean(&quot;redisson01&quot;)</span>
<span class="line">// 当 Spring 应用上下文中不存在某个特定类型的 Bean 时，才会创建和配置标注了 @ConditionalOnMissingBean 的 Bean 对象</span>
<span class="line">@ConditionalOnMissingBean</span>
<span class="line">public String redisson01() {</span>
<span class="line">return &quot;模拟的 Redis 客户端 01&quot;;</span>
<span class="line">}</span>
<span class="line">@Bean(&quot;redisson02&quot;)</span>
<span class="line">// 当 Spring 应用上下文中不存在某个特定类型的 Bean 时，才会创建和配置标注了 @ConditionalOnMissingBean 的 Bean 对象</span>
<span class="line">@ConditionalOnMissingBean</span>
<span class="line">public String redisson02() {</span>
<span class="line">return &quot;模拟的 Redis 客户端 02&quot;;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@Bean 可以用于在方法，创建出对象。这有点类似于使用 Spring 的 FactoryBean 接口创建对象一样，这里可以直接使用方法创建。 之后 @ConditionalOnMissingBean 注解的目的是为了避免重复创建，判断应用上下文中存在这个对象，则不会重复创建。</p><p>通常我们在做一些组件的时候，会加入这样一个注解，避免在业务工程中引入同类的组件的时候，会导致创建出相同对象而报错。</p><h3 id="配置是否创建对象" tabindex="-1"><a class="header-anchor" href="#配置是否创建对象"><span>配置是否创建对象</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Data</span>
<span class="line">@ConfigurationProperties(prefix = &quot;sdk.config&quot;, ignoreInvalidFields = true)</span>
<span class="line">public class AutoConfigProperties {</span>
<span class="line"></span>
<span class="line">    /** 状态：open = 开启、close 关闭 */</span>
<span class="line">    private boolean enable;</span>
<span class="line">    /** 转发地址 */</span>
<span class="line">    private String apiHost;</span>
<span class="line">    /** 可以申请 sk-*** */</span>
<span class="line">    private String apiSecretKey;</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">@Bean</span>
<span class="line">@ConditionalOnProperty(value = &quot;sdk.config.enabled&quot;, havingValue = &quot;true&quot;, matchIfMissing = false)</span>
<span class="line">public String createTopic(@Qualifier(&quot;redisson01&quot;) String redisson, AutoConfigProperties properties) {</span>
<span class="line">    log.info(&quot;redisson {} {} {}&quot;, redisson, properties.getApiHost(), properties.getApiSecretKey());</span>
<span class="line">    return redisson;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">sdk:</span>
<span class="line">  config:</span>
<span class="line">    enabled: false</span>
<span class="line">    apiHost: https://open.bigmodel.cn/</span>
<span class="line">    apiSecretKey: d570f7c5d289cdac2abdfdc562e39f3f.trqz1dH8ZK6ED7Pg</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模拟创建 createTopic，入参的对象为注入的操作，@Qualifier 注解可以指定要注入哪个名字的对象。 之后 @ConditionalOnProperty 注解可以通过配置的 enabled 值，来确定是否实例化对象。</p><p>比如你做了一个组件，或者业务中要增加一些配置。启动或关闭某些服务，就可以使用了。而不需要把 pom 中引入的组件注释掉。</p><h3 id="自定义condition-判断是否实例化对象" tabindex="-1"><a class="header-anchor" href="#自定义condition-判断是否实例化对象"><span>自定义Condition，判断是否实例化对象</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class BeanCreateCondition implements Condition {</span>
<span class="line"></span>
<span class="line">    @Override</span>
<span class="line">    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {</span>
<span class="line">        String active = System.getProperty(&quot;isOpenWhitelistedUsers&quot;);</span>
<span class="line">        return null != active &amp;&amp; active.equals(&quot;true&quot;);</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">@Bean</span>
<span class="line">@Conditional(BeanCreateCondition.class)</span>
<span class="line">public List&lt;String&gt; whitelistedUsers() {</span>
<span class="line">    return new ArrayList&lt;String&gt;() {{</span>
<span class="line">        add(&quot;user001&quot;);</span>
<span class="line">        add(&quot;user002&quot;);</span>
<span class="line">        add(&quot;user003&quot;);</span>
<span class="line">    }};</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">static {</span>
<span class="line">    // BeanCreateCondition 会检测这个值，确定是否创建对象</span>
<span class="line">    System.setProperty(&quot;isOpenWhitelistedUsers&quot;, &quot;false&quot;);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">@Autowired(required = false)</span>
<span class="line">@Qualifier(&quot;whitelistedUsers&quot;)</span>
<span class="line">private List&lt;String&gt; whitelistedUsers;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以自定义一个 Conditional 的实现类，之后把这个实现类配置到需要实例化的对象上面，通过 matches 匹配条件方法的实现，决定是否实例化。</p><p>用途和 @ConditionalOnProperty 是一样的，只不过我们可以更好的自定义控制。</p><h3 id="根据环境配置实例化对象" tabindex="-1"><a class="header-anchor" href="#根据环境配置实例化对象"><span>根据环境配置实例化对象</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Slf4j</span>
<span class="line">@Service</span>
<span class="line">// 用于根据配置环境实例化 Bean 对象</span>
<span class="line">@Profile({&quot;prod&quot;, &quot;test&quot;})</span>
<span class="line">@Lazy</span>
<span class="line">public class AliPayAwardService implements IAwardService {</span>
<span class="line"></span>
<span class="line">    public AliPayAwardService() {</span>
<span class="line">        log.info(&quot;如一些支付场景，必须指定上线后才能实例化&quot;);</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    @Override</span>
<span class="line">    public void doDistributeAward(String userId) {</span>
<span class="line">        log.info(&quot;红包奖励 {}&quot;, userId);</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">spring:</span>
<span class="line">  config:</span>
<span class="line">    name: xfg-dev-tech-spring-dependency-injection</span>
<span class="line">  profiles:</span>
<span class="line">    active: dev</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@Profile({&quot;prod&quot;, &quot;test&quot;}) 注解可以配置你是在什么时候实例化这个对象，我们可以指定 application.yml 中配置的 active: dev/prod/test 来确定是在开发、测试还是上线才实例化这个对象。</p><p>一些只有到线上才能实例化对象的时候，就可以配置 @Profile({&quot;prod&quot;, &quot;test&quot;}) 注解，注意这个需要配合 @Autowired(required = false) 进行注入，否则会出现注入为空指针的异常。</p><h3 id="引入-spring-配置" tabindex="-1"><a class="header-anchor" href="#引入-spring-配置"><span>引入 Spring 配置</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Slf4j</span>
<span class="line">@SpringBootApplication</span>
<span class="line">@Configurable</span>
<span class="line">@PropertySource(&quot;classpath:properties/application.properties&quot;)</span>
<span class="line">@ImportResource(&quot;classpath:spring/spring.xml&quot;)</span>
<span class="line">@EnableScheduling</span>
<span class="line">public class Application {</span>
<span class="line"></span>
<span class="line">    public static void main(String[] args) {</span>
<span class="line">        SpringApplication.run(Application.class);</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
<span class="line">&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span>
<span class="line">       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span>
<span class="line">       xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans</span>
<span class="line">                           http://www.springframework.org/schema/beans/spring-beans.xsd&quot;&gt;</span>
<span class="line"></span>
<span class="line">    &lt;bean id=&quot;exampleBean&quot; class=&quot;cn.bugstack.xfg.dev.tech.domain.SpringBeanTest&quot;/&gt;</span>
<span class="line"></span>
<span class="line">&lt;/beans&gt;</span>
<span class="line"></span>
<span class="line">@Slf4j</span>
<span class="line">public class SpringBeanTest {</span>
<span class="line"></span>
<span class="line">    public SpringBeanTest() {</span>
<span class="line">        log.info(&quot;我是通过 Spring 配置文件实例化的 Bean 对象&quot;);</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 SpringBoot 工程中，可以通过 @ImportResource、@PropertySource 引入对应的配置文件，完成对象的初始化。</p><p>在实际的开发中，虽然使用 SpringBoot 工程，但为了兼容一些老的项目或者一些还没有升级到 SpringBoot Starter 的组件，则需要单独引入 Spring 配置文件来创建对象。</p><h3 id="原型对象" tabindex="-1"><a class="header-anchor" href="#原型对象"><span>原型对象</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Component</span>
<span class="line">@Scope(&quot;prototype&quot;)</span>
<span class="line">public class LogicChain {</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">@Resource</span>
<span class="line">private ApplicationContext applicationContext;</span>
<span class="line"></span>
<span class="line">@Test</span>
<span class="line">public void test_prototype() {</span>
<span class="line">    log.info(&quot;测试结果: {}&quot;, applicationContext.getBean(LogicChain.class).hashCode());</span>
<span class="line">    log.info(&quot;测试结果: {}&quot;, applicationContext.getBean(LogicChain.class).hashCode());</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@Scope(&quot;prototype&quot;) 可以设定对象类型为原型对象，每次获得的对象都是一个新的实例化对象。</p><p>对于动态，不同责任链创建，可以使用这个配置，确保每个对象都是自己的。</p><h3 id="其他注解" tabindex="-1"><a class="header-anchor" href="#其他注解"><span>其他注解</span></a></h3><ul><li>@EnableScheduling：允许启动任务的注解，放到 Application 上，确保任务启动执行。</li><li>@DependsOn({&quot;openai_model&quot;, &quot;openai_use_count&quot;, &quot;user_credit_random&quot;}) Bean 对象实例化中，依赖于哪些对象。</li><li>@Autowired private Environment env; 环境配置注入，可以获取到 application.yml 中的配置数据 env.getProperty(&quot;app.name&quot;), env.getProperty(&quot;app.version&quot;)</li><li>@Async 异步方法注解，可以用于调用某个方法后，让下面的具体逻辑方法为异步执行，主方法直接返回结果。可以用于一些申请导出数据到文件的场景</li></ul><h3 id="构造函数注入的流程" tabindex="-1"><a class="header-anchor" href="#构造函数注入的流程"><span>构造函数注入的流程</span></a></h3><ol><li>解析 BeanDefinition： Spring 解析配置文件或注解，生成 AwardController 的 BeanDefinition 对象。</li><li>选择构造函数： AutowiredAnnotationBeanPostProcessor 会扫描 AwardController 的构造函数，发现它有一个 Map&lt;String, IAwardService&gt; 类型的参数。</li><li>查找依赖： ConstructorResolver 会根据构造函数参数的类型，查找 Spring 容器中所有 IAwardService 类型的 Bean，并将它们放入一个 Map 中。这个 Map 的键是 Bean 的名称，值是对应的 IAwardService 实例。</li><li>实例化 Bean： ConstructorResolver 使用找到的依赖，调用 AwardController 的构造函数，创建 AwardController 实例。</li><li>注入依赖： DefaultListableBeanFactory 将创建好的 Map&lt;String, IAwardService&gt; 注入到 AwardController 的构造函数中。</li></ol>`,42)]))}const c=s(l,[["render",d]]),t=JSON.parse('{"path":"/blogs/backend/DI.html","title":"Spring Dependency Injection - 依赖注入使用技巧","lang":"en-US","frontmatter":{"title":"Spring Dependency Injection - 依赖注入使用技巧","date":"2025/08/13","tags":["DI","Spring"],"categories":["后端开发"]},"headers":[{"level":3,"title":"构造注入&List、Map","slug":"构造注入-list、map","link":"#构造注入-list、map","children":[]},{"level":3,"title":"空注入判断","slug":"空注入判断","link":"#空注入判断","children":[]},{"level":3,"title":"优先实例化","slug":"优先实例化","link":"#优先实例化","children":[]},{"level":3,"title":"检测创建，避免重复","slug":"检测创建-避免重复","link":"#检测创建-避免重复","children":[]},{"level":3,"title":"配置是否创建对象","slug":"配置是否创建对象","link":"#配置是否创建对象","children":[]},{"level":3,"title":"自定义Condition，判断是否实例化对象","slug":"自定义condition-判断是否实例化对象","link":"#自定义condition-判断是否实例化对象","children":[]},{"level":3,"title":"根据环境配置实例化对象","slug":"根据环境配置实例化对象","link":"#根据环境配置实例化对象","children":[]},{"level":3,"title":"引入 Spring 配置","slug":"引入-spring-配置","link":"#引入-spring-配置","children":[]},{"level":3,"title":"原型对象","slug":"原型对象","link":"#原型对象","children":[]},{"level":3,"title":"其他注解","slug":"其他注解","link":"#其他注解","children":[]},{"level":3,"title":"构造函数注入的流程","slug":"构造函数注入的流程","link":"#构造函数注入的流程","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"filePathRelative":"blogs/backend/DI.md"}');export{c as comp,t as data};

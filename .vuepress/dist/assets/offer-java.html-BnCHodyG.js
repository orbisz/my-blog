import{_ as s,c as e,a as i,o as a}from"./app-DTmojwEs.js";const l={};function d(r,n){return a(),e("div",null,n[0]||(n[0]=[i(`<p>《剑指offer》题目及Java题解(标 * 表示为热门面试题)</p><h3 id="_1-赋值运算函数" tabindex="-1"><a class="header-anchor" href="#_1-赋值运算函数"><span>1. 赋值运算函数</span></a></h3><p>思路：</p><ul><li>将返回值类型声明为该类型的引用</li><li>把传入的参数类型声明为常量引用</li><li>释放实例自身已有的内存</li><li>判断传入的参数和当前的实例是不是同一个实例</li></ul><h3 id="_2-单例设计模式" tabindex="-1"><a class="header-anchor" href="#_2-单例设计模式"><span>2. 单例设计模式 *</span></a></h3><h4 id="饿汉式" tabindex="-1"><a class="header-anchor" href="#饿汉式"><span>饿汉式</span></a></h4><p>在类加载时就创建并初始化唯一实例，确保实例在使用前已存在。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Singleton{</span>
<span class="line">    private static final Singtelon instance = new Singleton();</span>
<span class="line">    public static Singleton getInstance(){</span>
<span class="line">        return instance;</span>
<span class="line">    }</span>
<span class="line">    private SIngleton(){}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>线程安全，实现简单；资源浪费；灵活性低</p><h4 id="懒汉式" tabindex="-1"><a class="header-anchor" href="#懒汉式"><span>懒汉式</span></a></h4><p>仅在第一次调用<code>getInstance()</code>方法时才创建实例，实现延迟初始化。延迟初始化，灵活性高；多线程情况下存在线程安全问题，性能开销比较大。</p><p>非线程安全</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public clas Singleton{</span>
<span class="line">    private static Singleton instance;</span>
<span class="line">    public static Singleton getInstance(){</span>
<span class="line">        if(instance==null){</span>
<span class="line">            instance = new Singleton();</span>
<span class="line">        }</span>
<span class="line">    } </span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>线程安全：给方法加锁</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public clas Singleton{</span>
<span class="line">    private static Singleton instance;</span>
<span class="line">    public synchronized static Singleton getInstance(){</span>
<span class="line">        if(instance==null){</span>
<span class="line">            instance = new Singleton();</span>
<span class="line">        }</span>
<span class="line">    } </span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>线程安全：双重校验</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public clas Singleton{</span>
<span class="line"></span>
<span class="line">    private Singleton(){}</span>
<span class="line">    public static Singleton getInstance(){</span>
<span class="line">        if(instance==null){</span>
<span class="line">            synchronized(Singleton.class){</span>
<span class="line">                if(instance==null){</span>
<span class="line">                    instance = new Singleton();</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        return instance;</span>
<span class="line">    } </span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-二维数组中查找目标值" tabindex="-1"><a class="header-anchor" href="#_3-二维数组中查找目标值"><span>3. 二维数组中查找目标值 *</span></a></h3><p>在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public static boolean findTarget(int[][] array,int target){</span>
<span class="line">    if(array==null||array.length==0){</span>
<span class="line">        return false;</span>
<span class="line">    }</span>
<span class="line">    int l=0,r=array[0].length-1;</span>
<span class="line">    while(l&lt;array.length&amp;&amp;人&gt;=0){</span>
<span class="line">        if(array[l][r]==target){</span>
<span class="line">            return true;</span>
<span class="line">        }else if(array[l][r]&gt;target){</span>
<span class="line">            r--;</span>
<span class="line">        }else{</span>
<span class="line">            l++;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return false;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-替换字符串中的空格" tabindex="-1"><a class="header-anchor" href="#_4-替换字符串中的空格"><span>4. 替换字符串中的空格 *</span></a></h3><p>将一个字符串中的空格替换成“%20”。 例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public static String replaceSpace(String s){</span>
<span class="line">    if(s==null||s.length==0){</span>
<span class="line">        return s;</span>
<span class="line">    }</span>
<span class="line">    StringBuilder res = new StringBuilder();</span>
<span class="line">    for(char c:s.toCharArray()){</span>
<span class="line">        if(c==&#39; &#39;){</span>
<span class="line">            res.append(&quot;%20&quot;);</span>
<span class="line">        }else{</span>
<span class="line">            res.append(c);</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return res.toString();</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-从尾到头打印链表" tabindex="-1"><a class="header-anchor" href="#_5-从尾到头打印链表"><span>5. 从尾到头打印链表 *</span></a></h3><p>输入一个链表，从尾到头打印链表每个节点的值。</p><p>思路：借助栈实现，或使用递归的方法。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">private static List&lt;Integer&gt; res = new ArrayLisr&lt;&gt;();</span>
<span class="line">//栈</span>
<span class="line">public static void printReversely(ListNode head){</span>
<span class="line">    if (head == null) return;</span>
<span class="line">    Stack&lt;Integer&gt; stack = new Stack&lt;&gt;();</span>
<span class="line">    while (head != null) {</span>
<span class="line">        stack.push(haed.val);</span>
<span class="line">        head = head.next;</span>
<span class="line">    }</span>
<span class="line">    while (!stack.isEmpty()) {</span>
<span class="line">        list.add(stack.pop());</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">//递归</span>
<span class="line">public static void printReversely(ListNode head){</span>
<span class="line">    if(head==null){</span>
<span class="line">        return;</span>
<span class="line">    }</span>
<span class="line">    printReversely(head.next);</span>
<span class="line">    res.add(head.val);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-由前序和中序遍历重建二叉树" tabindex="-1"><a class="header-anchor" href="#_6-由前序和中序遍历重建二叉树"><span>6. 由前序和中序遍历重建二叉树 *</span></a></h3><p>输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。</p><p>思路：先找出根节点，然后利用递归方法构造二叉树</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public static TreeNode{</span>
<span class="line">    int vsl;</span>
<span class="line">    TreeNode left;</span>
<span class="line">    TreeNode right;</span>
<span class="line">    TreeNode(int val){this.val=val;}</span>
<span class="line">}</span>
<span class="line">public TreeNode reConstructBinaryTree(int[] preorder, int[] inorder){</span>
<span class="line">    if(preorder==null||inorder==null||preorder.length==0||inorder.length==0||preorder.length!=inorder.length){</span>
<span class="line">        return null;</span>
<span class="line">    }</span>
<span class="line">    TreeNode root = new TreeNode(pre[0]);</span>
<span class="line">    for(int i=0;i&lt;preorder.length;i++){</span>
<span class="line">        if(preorder[0]==inorder[i]){</span>
<span class="line">            root.left = reConstructBinaryTree(Arrays.copyOfRange(preorder,1,i+1),Arrays.copyOfRange(inorder,0,i));</span>
<span class="line">            root.right = reConstructBinaryTree(Arrays.copyOfRange(preorder,i+1,pre.length),Arrays.copyOfRange(inorder,i+1,inorder.length));</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return root;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-用两个栈实现队列" tabindex="-1"><a class="header-anchor" href="#_7-用两个栈实现队列"><span>7. 用两个栈实现队列 *</span></a></h3><p>用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。</p><p>思路：一个栈压入元素，而另一个栈作为缓冲，将栈1的元素出栈后压入栈2中。也可以将栈1中的最后一个元素直接出栈，而不用压入栈2中再出栈。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">class Queue{</span>
<span class="line">    Stack&lt;Integer&gt; a,b;</span>
<span class="line">    public MyQueue(){</span>
<span class="line">        a = new Stack();</span>
<span class="line">        b = new Stack();</span>
<span class="line">    }</span>
<span class="line">    public void push(int x){</span>
<span class="line">        a.push(x);</span>
<span class="line">    }</span>
<span class="line">    public int pop(){</span>
<span class="line">        int peek = peek();</span>
<span class="line">        b.pop();</span>
<span class="line">        return peek;</span>
<span class="line">    }</span>
<span class="line">    public int peek(){</span>
<span class="line">        if(!b.isEmpty()) return b.peek();</span>
<span class="line">        if(a.isEmpty()) return a.peek();</span>
<span class="line">        while(!a.isEmpty()){</span>
<span class="line">            b.push(a.pop());</span>
<span class="line">        }</span>
<span class="line">        return b.peek();</span>
<span class="line">    }</span>
<span class="line">    public boolean empty() {</span>
<span class="line">        return a.isEmpty()&amp;&amp;b.isEmpty();</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-把一个数组最开始的若干个元素搬到数组的末尾-我们称之为数组的旋转。-输入一个非递减排序的数组的一个旋转-输出旋转数组的最小元素。" tabindex="-1"><a class="header-anchor" href="#_8-把一个数组最开始的若干个元素搬到数组的末尾-我们称之为数组的旋转。-输入一个非递减排序的数组的一个旋转-输出旋转数组的最小元素。"><span>8. 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。</span></a></h3><p>例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0</p><p>利用二分法，找到中间的数，然后和最左边的值进行比较，若大于最左边的数，则最左边从mid开始，若小于最右边值，则最右边从mid开始。若左中右三值相等，则取mid前后值中较小的数。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public int minNum(int[] nums){</span>
<span class="line">    if(nums==null||nums.length==0){</span>
<span class="line">        return 0;</span>
<span class="line">    }</span>
<span class="line">    int l=0,r=nums.length;</span>
<span class="line">    while(l&lt;=r){</span>
<span class="line">        int mid = l+(r-l)/2;</span>
<span class="line">        if(nums[mid]&lt;nums[r]){</span>
<span class="line">            r=mid;</span>
<span class="line">        }else{</span>
<span class="line">            l=mid+1;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return nums[r];</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-斐波那契数列的第n项-青蛙跳台阶" tabindex="-1"><a class="header-anchor" href="#_9-斐波那契数列的第n项-青蛙跳台阶"><span>9. 斐波那契数列的第n项（青蛙跳台阶） *</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public long fibonacci(int n){</span>
<span class="line">    long f0=0;</span>
<span class="line">    long f1=1;</span>
<span class="line">    long f2=0;</span>
<span class="line">    if(n==0) return f0;</span>
<span class="line">    if(n==1) return f1;</span>
<span class="line">    for(int i=2;i&lt;=n;i++){</span>
<span class="line">        f2 = f1+f0;</span>
<span class="line">        f0 = f1;</span>
<span class="line">        f1 = f2;</span>
<span class="line">    }</span>
<span class="line">    return f2;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以用21的小矩形横着或者竖着去覆盖更大的矩形。请问用n个21的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public int Fibonaccik(int n){</span>
<span class="line">    int number=1;</span>
<span class="line">    int sum=1;</span>
<span class="line">    if(n&lt;=0) return 0;</span>
<span class="line">    if(n==1) return 1;</span>
<span class="line">    while(n--&gt;=2){</span>
<span class="line">        sum += number;</span>
<span class="line">        number = sum - number;</span>
<span class="line">    }</span>
<span class="line">    return sum;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-二进制中1的个数" tabindex="-1"><a class="header-anchor" href="#_10-二进制中1的个数"><span>10. 二进制中1的个数 *</span></a></h3><p>输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。</p><p>思路：a&amp;(a-1)的结果会将a最右边的1变为0，直到a = 0，还可以先将a&amp;1 != 0，然后右移1位，但不能计算负数的值.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public int numberOf1(int n){</span>
<span class="line">    count = 0;</span>
<span class="line">    while(n!=0){</span>
<span class="line">        count++;</span>
<span class="line">        n=(n-1)&amp;n;</span>
<span class="line">    }</span>
<span class="line">    return count;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-数值的整数次方" tabindex="-1"><a class="header-anchor" href="#_11-数值的整数次方"><span>11. 数值的整数次方</span></a></h3><p>给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。不得使用库函数，不需要考虑大数问题</p><p>思路：可以使用快速幂计算，采用分而治之的思想。先处理次方数为负数的情况，将底数化为分数解决；使用快速幂计算次方：将已乘出来的部分求次方，可以每次缩小一半要求的次方数。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public double Power(double base, int exponent){</span>
<span class="line">        if(exponet&lt;0){</span>
<span class="line">            base=1/base;</span>
<span class="line">            exponet=-exponet;</span>
<span class="line">        }</span>
<span class="line">        return Pow(base,exponent);</span>
<span class="line">    }</span>
<span class="line">    public double Pow(double x,int y){</span>
<span class="line">        double res=1;</span>
<span class="line">        while(y!=0){</span>
<span class="line">            if((y&amp;1)!=0) res *= x;</span>
<span class="line">            </span>
<span class="line">            x *=x;</span>
<span class="line">            y = y&gt;&gt;1;</span>
<span class="line">        }</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_12-打印1到最大的n位数" tabindex="-1"><a class="header-anchor" href="#_12-打印1到最大的n位数"><span>12. 打印1到最大的n位数</span></a></h3><p>输入数字n，按顺序打印出从1到最大的n位进制数。比如输入3，则打印出1、2、3一直到999.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public int[] printNumbers (int n) {</span>
<span class="line">        int count=1;</span>
<span class="line">        for(int i=0;i&lt;n;i++){</span>
<span class="line">            count *= 10;</span>
<span class="line">        }</span>
<span class="line">        int[] res = new int[count-1];</span>
<span class="line">        for(int i=1;i&lt;count;i++){</span>
<span class="line">            res[i-1]=i;</span>
<span class="line">        }</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_13-删除链表节点" tabindex="-1"><a class="header-anchor" href="#_13-删除链表节点"><span>13. 删除链表节点 *</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public ListNode deleteNode (ListNode head, int val) {</span>
<span class="line">        ListNode dummy = new ListNode(0);</span>
<span class="line">        dummy.next = head;</span>
<span class="line">        ListNode curr = dummy.next;</span>
<span class="line">        ListNode prev = dummy;</span>
<span class="line">        while(curr!=null){</span>
<span class="line">            if(curr.val==val){</span>
<span class="line">                prev.next = curr.next;</span>
<span class="line">            }</span>
<span class="line">            prev = prev.next;</span>
<span class="line">            curr = curr.next;</span>
<span class="line">        }</span>
<span class="line">        return dummy.next;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_14-使数组中的奇数位于偶数前面" tabindex="-1"><a class="header-anchor" href="#_14-使数组中的奇数位于偶数前面"><span>14. 使数组中的奇数位于偶数前面 *</span></a></h3><p>输入一个整数数组，实现一个函数来调整该函数数组中数字的顺序，使得所有奇数位于数组的前半部分，所有的数组位于数组的后半部分。</p><p>思路：采用类似插入排序的思路，用一个指针标记当前奇数区域的末尾位置；遍历数组，当遇到奇数时，将其移动到奇数区域的末尾；移动过程中保持中间的偶数依次后移，从而保证相对顺序不变</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public int[] reOrderArray(int[] array) {</span>
<span class="line">        if (array == null || array.length &lt;= 1) {</span>
<span class="line">            return array;</span>
<span class="line">        }</span>
<span class="line">        int n = array.length;</span>
<span class="line">        int oddIndex = 0; </span>
<span class="line">        for (int i = 0; i &lt; n; i++) {</span>
<span class="line">            if (array[i] % 2 != 0) {</span>
<span class="line">                int temp = array[i]; </span>
<span class="line">                for (int j = i; j &gt; oddIndex; j--) {</span>
<span class="line">                    array[j] = array[j - 1];</span>
<span class="line">                }</span>
<span class="line">                array[oddIndex] = temp;</span>
<span class="line">                oddIndex++; </span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        return array;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_15-找链表中倒数第k个节点" tabindex="-1"><a class="header-anchor" href="#_15-找链表中倒数第k个节点"><span>15. 找链表中倒数第K个节点 *</span></a></h3><p>输入一个链表，输出该链表中倒数第k个结点。</p><p>思路：用两个指针：第一个先向前走k-1步，然后再和第二个指针一起向前运动 当第一个指针的下一个值为null时，第二个指针所在的位置就是要找的节点。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">public ListNode FindKthToTail(ListNode head,int k) {</span>
<span class="line">        if(head == null || k == 0){</span>
<span class="line">            return null;</span>
<span class="line">        }</span>
<span class="line">        ListNode h1 = head;</span>
<span class="line">        ListNode h2 = head;</span>
<span class="line">        for(int i = 0; i &lt; k-1; i++){</span>
<span class="line">             h1 = h1.next;</span>
<span class="line">            if(h1 == null){</span>
<span class="line">               return null;</span>
<span class="line">            }</span>
<span class="line">        }      </span>
<span class="line">        while(null != h1.next){</span>
<span class="line">            h1 = h1.next;</span>
<span class="line">            h2 = h2.next;</span>
<span class="line">        }       </span>
<span class="line">        return h2;     </span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_16-输出反转后的链表" tabindex="-1"><a class="header-anchor" href="#_16-输出反转后的链表"><span>16. 输出反转后的链表 *</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public ListNode ReverseList (ListNode head) {</span>
<span class="line">        ListNode prev = null;</span>
<span class="line">        ListNode curr = head;</span>
<span class="line">        while(curr!=null){</span>
<span class="line">            ListNode next = curr.next;</span>
<span class="line">            curr.next = prev;</span>
<span class="line">            prev = curr;</span>
<span class="line">            curr = next;</span>
<span class="line">        }</span>
<span class="line">        return prev;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_17-合并两个有序链表" tabindex="-1"><a class="header-anchor" href="#_17-合并两个有序链表"><span>17. 合并两个有序链表 *</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public ListNode Merge (ListNode pHead1, ListNode pHead2) {</span>
<span class="line">        ListNode dummy = new ListNode(0);</span>
<span class="line">        ListNode curr = dummy;</span>
<span class="line">        while(pHead1!=null&amp;&amp;pHead2!=null){</span>
<span class="line">            if(pHead1.val&lt;pHead2.val){</span>
<span class="line">                curr.next = pHead1;</span>
<span class="line">                pHead1 = pHead1.next;</span>
<span class="line">            }else{</span>
<span class="line">                curr.next = pHead2;</span>
<span class="line">                pHead2 = pHead2.next;</span>
<span class="line">            }</span>
<span class="line">            curr = curr.next;</span>
<span class="line">        }</span>
<span class="line">        curr.next = pHead1==null?pHead2:pHead1;</span>
<span class="line">        return dummy.next;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_18-判断二叉树a中是否包含子树b" tabindex="-1"><a class="header-anchor" href="#_18-判断二叉树a中是否包含子树b"><span>18. 判断二叉树A中是否包含子树B *</span></a></h3><p>输入两棵二叉树A，B，判断B是不是A的子结构。</p><p>思路：先判断根节点是否相同，如果都为null，那么就是子树，如果一个为null，一个不为null，那么就不是子树，然后判断是不是A的左右子树的子树。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public boolean siSame(TreeNode root1,TreeNode root2){</span>
<span class="line">        if(root2==null) return true;</span>
<span class="line">        if(root1==null) return false;</span>
<span class="line">        return root1.val==root2.val&amp;&amp;siSame(root1.left,root2.left)&amp;&amp;siSame(root1.right,root2.right);</span>
<span class="line">    }</span>
<span class="line">    public boolean HasSubtree(TreeNode root1,TreeNode root2) {</span>
<span class="line">        if(root1==null||root2==null) return false;</span>
<span class="line">        return siSame(root1,root2)||siSame(root1.left,root2)||siSame(root1.right,root2);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_19-二叉树的镜像" tabindex="-1"><a class="header-anchor" href="#_19-二叉树的镜像"><span>19. 二叉树的镜像 *</span></a></h3><p>操作给定的二叉树，将其变换为源二叉树的镜像。</p><p>思路：因为我们需要将二叉树镜像，意味着每个左右子树都会交换位置，如果我们从上到下对遍历到的节点交换位置，但是它们后面的节点无法跟着他们一起被交换， 因此我们可以考虑自底向上对每两个相对位置的节点交换位置， 这样往上各个子树也会被交换位置。 自底向上的遍历方式，我们可以采用后序递归的方法。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public TreeNode Mirror (TreeNode pRoot) {</span>
<span class="line">        if(pRoot==null) return null;</span>
<span class="line">        TreeNode left = Mirror(pRoot.left);</span>
<span class="line">        TreeNode right = Mirror(pRoot.right);</span>
<span class="line">        pRoot.left = right;</span>
<span class="line">        pRoot.right=left;</span>
<span class="line">        return pRoot;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_20-顺时针打印矩阵" tabindex="-1"><a class="header-anchor" href="#_20-顺时针打印矩阵"><span>20. 顺时针打印矩阵 *</span></a></h3><p>输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。</p><p>思路：定义四个变量代表范围，up、down、left、right</p><ul><li>向右走存入整行的值，当存入后，该行再也不会被遍历，代表上边界的 up 加一，同时判断是否和代表下边界的 down 交错</li><li>向下走存入整列的值，当存入后，该列再也不会被遍历，代表右边界的 right 减一，同时判断是否和代表左边界的 left 交错</li><li>向左走存入整行的值，当存入后，该行再也不会被遍历，代表下边界的 down 减一，同时判断是否和代表上边界的 up 交错</li><li>向上走存入整列的值，当存入后，该列再也不会被遍历，代表左边界的 left 加一，同时判断是否和代表右边界的 right 交错</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public ArrayList&lt;Integer&gt; printMatrix(int [][] matrix) {</span>
<span class="line">        ArrayList&lt;Integer&gt; res = new ArrayList&lt;&gt;();</span>
<span class="line">        if(matrix==null||matrix.length==0||matrix[0].length==0){</span>
<span class="line">            return res;</span>
<span class="line">        }</span>
<span class="line">        int up=0;</span>
<span class="line">        int down=matrix.length-1;</span>
<span class="line">        int left=0;</span>
<span class="line">        int right=matrix[0].length-1;</span>
<span class="line">        while(true){</span>
<span class="line">            for(int col=left;col&lt;=right;col++){</span>
<span class="line">                res.add(matrix[up][col]);</span>
<span class="line">            }</span>
<span class="line">            up++;</span>
<span class="line">            if(up&gt;down) break;</span>
<span class="line">            for(int row=up;row&lt;=down;row++){</span>
<span class="line">                res.add(matrix[row][right]);</span>
<span class="line">            }</span>
<span class="line">            right--;</span>
<span class="line">            if(left&gt;right) break;</span>
<span class="line">            for(int col=right;col&gt;=left;col--){</span>
<span class="line">                res.add(matrix[down][col]);</span>
<span class="line">            }</span>
<span class="line">            down--;</span>
<span class="line">            if(up&gt;down) break;</span>
<span class="line">            for(int row=down;row&gt;=up;row--){</span>
<span class="line">                res.add(matrix[row][left]);</span>
<span class="line">            }</span>
<span class="line">            left++;</span>
<span class="line">            if(left&gt;right) break;</span>
<span class="line">        }</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,81)]))}const c=s(l,[["render",d]]),t=JSON.parse('{"path":"/blogs/algorithm/offer-java.html","title":"剑指offer-Java版 1-20","lang":"en-US","frontmatter":{"title":"剑指offer-Java版 1-20","date":"2025/09/10","tags":["Java"],"categories":["算法"]},"headers":[{"level":3,"title":"1. 赋值运算函数","slug":"_1-赋值运算函数","link":"#_1-赋值运算函数","children":[]},{"level":3,"title":"2. 单例设计模式 *","slug":"_2-单例设计模式","link":"#_2-单例设计模式","children":[]},{"level":3,"title":"3. 二维数组中查找目标值 *","slug":"_3-二维数组中查找目标值","link":"#_3-二维数组中查找目标值","children":[]},{"level":3,"title":"4. 替换字符串中的空格 *","slug":"_4-替换字符串中的空格","link":"#_4-替换字符串中的空格","children":[]},{"level":3,"title":"5. 从尾到头打印链表 *","slug":"_5-从尾到头打印链表","link":"#_5-从尾到头打印链表","children":[]},{"level":3,"title":"6. 由前序和中序遍历重建二叉树 *","slug":"_6-由前序和中序遍历重建二叉树","link":"#_6-由前序和中序遍历重建二叉树","children":[]},{"level":3,"title":"7. 用两个栈实现队列 *","slug":"_7-用两个栈实现队列","link":"#_7-用两个栈实现队列","children":[]},{"level":3,"title":"8. 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。","slug":"_8-把一个数组最开始的若干个元素搬到数组的末尾-我们称之为数组的旋转。-输入一个非递减排序的数组的一个旋转-输出旋转数组的最小元素。","link":"#_8-把一个数组最开始的若干个元素搬到数组的末尾-我们称之为数组的旋转。-输入一个非递减排序的数组的一个旋转-输出旋转数组的最小元素。","children":[]},{"level":3,"title":"9. 斐波那契数列的第n项（青蛙跳台阶） *","slug":"_9-斐波那契数列的第n项-青蛙跳台阶","link":"#_9-斐波那契数列的第n项-青蛙跳台阶","children":[]},{"level":3,"title":"10. 二进制中1的个数 *","slug":"_10-二进制中1的个数","link":"#_10-二进制中1的个数","children":[]},{"level":3,"title":"11. 数值的整数次方","slug":"_11-数值的整数次方","link":"#_11-数值的整数次方","children":[]},{"level":3,"title":"12. 打印1到最大的n位数","slug":"_12-打印1到最大的n位数","link":"#_12-打印1到最大的n位数","children":[]},{"level":3,"title":"13. 删除链表节点 *","slug":"_13-删除链表节点","link":"#_13-删除链表节点","children":[]},{"level":3,"title":"14. 使数组中的奇数位于偶数前面 *","slug":"_14-使数组中的奇数位于偶数前面","link":"#_14-使数组中的奇数位于偶数前面","children":[]},{"level":3,"title":"15. 找链表中倒数第K个节点 *","slug":"_15-找链表中倒数第k个节点","link":"#_15-找链表中倒数第k个节点","children":[]},{"level":3,"title":"16. 输出反转后的链表 *","slug":"_16-输出反转后的链表","link":"#_16-输出反转后的链表","children":[]},{"level":3,"title":"17. 合并两个有序链表 *","slug":"_17-合并两个有序链表","link":"#_17-合并两个有序链表","children":[]},{"level":3,"title":"18. 判断二叉树A中是否包含子树B *","slug":"_18-判断二叉树a中是否包含子树b","link":"#_18-判断二叉树a中是否包含子树b","children":[]},{"level":3,"title":"19. 二叉树的镜像 *","slug":"_19-二叉树的镜像","link":"#_19-二叉树的镜像","children":[]},{"level":3,"title":"20. 顺时针打印矩阵 *","slug":"_20-顺时针打印矩阵","link":"#_20-顺时针打印矩阵","children":[]}],"git":{"createdTime":1755092504000,"updatedTime":1755092504000,"contributors":[{"name":"zxy","email":"zxy0613zxy@outlook.com","commits":1}]},"filePathRelative":"blogs/algorithm/offer-java.md"}');export{c as comp,t as data};

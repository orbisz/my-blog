import{_ as s,c as i,a as e,o as l}from"./app-BLst8MTc.js";const a={};function d(p,n){return l(),i("div",null,n[0]||(n[0]=[e(`<h3 id="_21-包含min函数的栈" tabindex="-1"><a class="header-anchor" href="#_21-包含min函数的栈"><span>21. 包含min函数的栈</span></a></h3><p>定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的 min 函数，输入操作时保证 pop、top 和 min 函数操作时，栈中一定有元素。 此栈包含的方法有： push(value):将value压入栈中 pop():弹出栈顶元素 top():获取栈顶元素 min():获取栈中最小元素</p><p>思路：一个用来存所有的元素“stackTotal”,另一个用来存加入新的元素后当前stackTotal中对应的最小值。 两个栈中的元素数量始终保持一致，当新的元素小于“stackLittle”栈顶元素时，“stackLittle”像栈顶push新来的元素，否则，“stackLittle”向栈顶加入原栈顶元素。 执行“pop”方法时，两个栈同时弹出各自的栈顶元素。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    Stack&lt;Integer&gt; stackTotal = new Stack&lt;&gt;();</span>
<span class="line">    Stack&lt;Integer&gt; stackLittle = new Stack&lt;&gt;();</span>
<span class="line">    public void push(int node) {</span>
<span class="line">        stackTotal.push(node);</span>
<span class="line">        if(stackLittle.isEmpty()){</span>
<span class="line">            stackLittle.push(node);</span>
<span class="line">        }else{</span>
<span class="line">            if(node&lt;=stackLittle.peek()){</span>
<span class="line">                stackLittle.push(node);</span>
<span class="line">            }else{</span>
<span class="line">                stackLittle.push(stackLittle.peek());</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    public void pop() {</span>
<span class="line">        stackTotal.pop();</span>
<span class="line">        stackLittle.pop();</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    public int top() {</span>
<span class="line">        return stackTotal.peek();</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    public int min() {</span>
<span class="line">        return stackLittle.peek();</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_22-判断一个栈是否是另一个栈的弹出序列" tabindex="-1"><a class="header-anchor" href="#_22-判断一个栈是否是另一个栈的弹出序列"><span>22. 判断一个栈是否是另一个栈的弹出序列</span></a></h3><p>输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。 例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。</p><p>思路：用栈来模拟，对于入栈序列，只要栈为空，序列就要依次入栈，当元素等于当前的出栈序列，就放弃入栈。</p><ul><li>准备一个辅助栈，两个下标分别访问两个序列。</li><li>辅助栈为空或者栈顶不等于出栈数组当前元素，就持续将入栈数组加入栈中。</li><li>栈顶等于出栈数组当前元素就出栈。</li><li>当入栈数组访问完，出栈数组无法依次弹出，就是不匹配的，否则两个序列都访问完就是匹配的。</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public boolean IsPopOrder (int[] pushV, int[] popV) {</span>
<span class="line">        int n=pushV.length;</span>
<span class="line">        Stack&lt;Integer&gt; s = new Stack&lt;&gt;();</span>
<span class="line">        int j=0;</span>
<span class="line">        for(int i=0;i&lt;n;i++){</span>
<span class="line">            while(j&lt;n&amp;&amp;(s.isEmpty()||s.peek()!=popV[i])){</span>
<span class="line">                s.push(pushV[j]);</span>
<span class="line">                j++;</span>
<span class="line">            }</span>
<span class="line">            if(s.peek()==popV[i]){</span>
<span class="line">                s.pop();</span>
<span class="line">            }else{</span>
<span class="line">                return false;</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        return true;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_23-层序遍历二叉树" tabindex="-1"><a class="header-anchor" href="#_23-层序遍历二叉树"><span>23. 层序遍历二叉树</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public ArrayList&lt;Integer&gt; PrintFromTopToBottom(TreeNode root) {</span>
<span class="line">        ArrayList&lt;Integer&gt; res = new ArrayList&lt;&gt;();</span>
<span class="line">        if(root==null) return res;</span>
<span class="line">        Queue&lt;TreeNode&gt; q = new LinkedList&lt;&gt;();</span>
<span class="line">        q.offer(root);</span>
<span class="line">        while(!q.isEmpty()){</span>
<span class="line">            int size = q.size();</span>
<span class="line">            for(int i=0;i&lt;size;i++){</span>
<span class="line">                TreeNode node = q.poll();</span>
<span class="line">                res.add(node.val);</span>
<span class="line">                if(node.left!=null) q.offer(node.left);</span>
<span class="line">                if(node.right!=null) q.offer(node.right);</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_24-二叉搜索树的后序遍历序列" tabindex="-1"><a class="header-anchor" href="#_24-二叉搜索树的后序遍历序列"><span>24. 二叉搜索树的后序遍历序列</span></a></h3><p>输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则返回 true ,否则返回 false 。假设输入的数组的任意两个数字都互不相同。</p><p>思路：倒序输出的时候是：根→右→左，其中左子节点的值恒小于根和右，于是便有遍历满足条件：①递增时候无任何问题，②递减时候要求必须小于以前所有数。依次为条件，先遍历入栈，再在递减时出栈对比即可。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public boolean VerifySquenceOfBST(int [] sequence) {</span>
<span class="line">        if(sequence==null||sequence.length==0) return false;</span>
<span class="line">        Stack&lt;Integer&gt; s = new Stack&lt;&gt;();</span>
<span class="line">        int root = Integer.MAX_VALUE;</span>
<span class="line">        for(int i=sequence.length-1;i&gt;=0;i--){</span>
<span class="line">            if(sequence[i]&gt;root) return false;</span>
<span class="line">            while(!s.isEmpty()&amp;&amp;s.peek()&gt;sequence[i]){</span>
<span class="line">                root = s.pop();</span>
<span class="line">            }</span>
<span class="line">            s.add(sequence[i]);</span>
<span class="line">        }</span>
<span class="line">        return true;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_25-二叉树中和为某值的路径" tabindex="-1"><a class="header-anchor" href="#_25-二叉树中和为某值的路径"><span>25. 二叉树中和为某值的路径</span></a></h3><p>输入一颗二叉树的根节点root和一个整数expectNumber，找出二叉树中结点值的和为expectNumber的所有路径。</p><ul><li>该题路径定义为从树的根结点开始往下一直到叶子结点所经过的结点</li><li>叶子节点是指没有子节点的节点</li><li>路径只能从父节点到子节点，不能从子节点到父节点</li><li>总节点数目为n</li></ul><p>思路：我们从根节点开始向左右子树进行递归，递归函数中需要处理的是：</p><ul><li>当前的路径path要更新</li><li>当前的目标值expectNumber要迭代，减去当前节点的值</li><li>若当前节点是叶子节点，考虑是否满足路径的期待值，并考虑是否将路径添加到返回列表中</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    private ArrayList&lt;ArrayList&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();</span>
<span class="line">    private ArrayList&lt;Integer&gt; path = new ArrayList&lt;&gt;();</span>
<span class="line">    public ArrayList&lt;ArrayList&lt;Integer&gt;&gt; FindPath (TreeNode root, int target) {</span>
<span class="line">        dfs(root,target);</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line">    private void dfs(TreeNode node,int target){</span>
<span class="line">        if(node==null) return;</span>
<span class="line">        path.add(node.val);</span>
<span class="line">        target -= node.val;</span>
<span class="line">        if(node.left==null&amp;&amp;node.right==null&amp;&amp;target==0){</span>
<span class="line">            res.add(new ArrayList&lt;&gt;(path));</span>
<span class="line">        }</span>
<span class="line">        dfs(node.left,target);</span>
<span class="line">        dfs(node.right,target);</span>
<span class="line">        path.remove(path.size()-1);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_26-复杂链表的复制" tabindex="-1"><a class="header-anchor" href="#_26-复杂链表的复制"><span>26. 复杂链表的复制</span></a></h3><p>请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。</p><p>思路：创建一个Map集合，存储key为原链表节点，value为复制链表节点。如果Map中存在原链表节点，就直接返回复制链表节点。否则就创建原链表节点的复制链表节点，放入Map中。 迭代查找、设置复制链表节点的next指针和random指针。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    Map&lt;Node,Node&gt; map = new HashMap&lt;&gt;();</span>
<span class="line">    public Node copyRandomList(Node head) {</span>
<span class="line">        if(head == null) return null;</span>
<span class="line">        if(map.containsKey(head)) return map.get(head);</span>
<span class="line">        Node clonenode = new Node(head.val);</span>
<span class="line">        map.put(head,clonenode);</span>
<span class="line">        clonenode.next = copyRandomList(head.next);</span>
<span class="line">        clonenode.random = copyRandomList(head.random);</span>
<span class="line">        return clonenode;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_27-二叉搜索树转换为双向链表" tabindex="-1"><a class="header-anchor" href="#_27-二叉搜索树转换为双向链表"><span>27. 二叉搜索树转换为双向链表</span></a></h3><p>输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表</p><p>思路：二叉搜索树的中序遍历为递增序列。使用中序遍历访问树的各节点 cur ；并在访问每个节点时构建 cur 和前驱节点 pre 的引用指向；中序遍历完成后，最后构建头节点和尾节点的引用指向即可。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    Node pre, head;</span>
<span class="line">    public Node treeToDoublyList(Node root) {</span>
<span class="line">        if(root == null) return null;</span>
<span class="line">        dfs(root);</span>
<span class="line">        head.left = pre;</span>
<span class="line">        pre.right = head;</span>
<span class="line">        return head;</span>
<span class="line">    }</span>
<span class="line">    void dfs(Node cur) {</span>
<span class="line">        if(cur == null) return;</span>
<span class="line">        dfs(cur.left);</span>
<span class="line">        if(pre != null) pre.right = cur;</span>
<span class="line">        else head = cur;</span>
<span class="line">        cur.left = pre;</span>
<span class="line">        pre = cur;</span>
<span class="line">        dfs(cur.right);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_28-打印字符串中所有字符的排列" tabindex="-1"><a class="header-anchor" href="#_28-打印字符串中所有字符的排列"><span>28. 打印字符串中所有字符的排列</span></a></h3><p>输入一个长度为 n 字符串，打印出该字符串中字符的所有排列，你可以以任意顺序返回这个字符串数组。</p><p>思路：回溯思想实现，Set去重</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    Set&lt;String&gt; res = new HashSet&lt;&gt;();</span>
<span class="line">    public ArrayList&lt;String&gt; Permutation(String str) {</span>
<span class="line">         boolean[] visited = new boolean[str.length()];</span>
<span class="line">         recursion(str,&quot;&quot;,visited);</span>
<span class="line">         ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;(res);</span>
<span class="line">         Collections.sort(list);</span>
<span class="line">        return list;</span>
<span class="line">    }</span>
<span class="line">    public void recursion(String str,String current,boolean[] visited){</span>
<span class="line">        if(str.length()==current.length()){</span>
<span class="line">            res.add(current);</span>
<span class="line">            return;</span>
<span class="line">        }</span>
<span class="line">        for(int i = 0;i&lt;str.length();i++)</span>
<span class="line">        {</span>
<span class="line">          if(!visited[i]){</span>
<span class="line">              current+=str.charAt(i);</span>
<span class="line">              visited[i] = true;</span>
<span class="line">              recursion(str,current,visited);</span>
<span class="line">              current = current.substring(0,current.length()-1);</span>
<span class="line">              visited[i] = false;</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_29-数组中出现次数超过一半的数字" tabindex="-1"><a class="header-anchor" href="#_29-数组中出现次数超过一半的数字"><span>29. 数组中出现次数超过一半的数字</span></a></h3><p>给一个长度为 n 的数组，数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。</p><p>思路：摩尔投票，每次将两个不同的元素进行「抵消」，如果最后有元素剩余，则「可能」为元素个数大于总数一半的那个。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public int MoreThanHalfNum_Solution (int[] numbers) {</span>
<span class="line">        int n=numbers.length;</span>
<span class="line">        int x=-1,cnt=0;</span>
<span class="line">        for(int i:numbers){</span>
<span class="line">            if(cnt==0){</span>
<span class="line">                x=i;</span>
<span class="line">                cnt=1;</span>
<span class="line">            }else{</span>
<span class="line">                cnt += x==i ? 1:-1;</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        cnt=0;</span>
<span class="line">        for(int i:numbers) if(x==i) cnt++;</span>
<span class="line">        return cnt&gt;n/2?x:-1;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_30-找出最小的k个数" tabindex="-1"><a class="header-anchor" href="#_30-找出最小的k个数"><span>30. 找出最小的K个数</span></a></h3><p>给定一个长度为 n 的可能有重复值的数组，找出其中不去重的最小的 k 个数。例如数组元素是4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4(任意顺序皆可)。</p><p>思路：优先队列（大根堆）</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public int[] smallestK(int[] arr, int k) {</span>
<span class="line">        PriorityQueue&lt;Integer&gt; q = new PriorityQueue&lt;&gt;((a,b)-&gt;b-a);</span>
<span class="line">        int[] res = new int[k];</span>
<span class="line">        if(k==0) return res;</span>
<span class="line">        for(int i:arr){</span>
<span class="line">            if(q.size()==k&amp;&amp;q.peek()&lt;=i) continue;</span>
<span class="line">            if(q.size()==k) q.poll();</span>
<span class="line">            q.add(i);</span>
<span class="line">        }</span>
<span class="line">        for(int i=0;i&lt;k;i++) res[i]=q.poll();</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_31-连续子数组的最大和" tabindex="-1"><a class="header-anchor" href="#_31-连续子数组的最大和"><span>31. 连续子数组的最大和</span></a></h3><p>思路：维护一个最小前缀和，和当前前缀和，相减就是最大和的连续子数组。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public int FindGreatestSumOfSubArray (int[] array) {</span>
<span class="line">        if(array==null||array.length==0) return 0;</span>
<span class="line">        int precurr=0;</span>
<span class="line">        int premin=0;</span>
<span class="line">        int maxsum=array[0];</span>
<span class="line">        for(int i:array){</span>
<span class="line">            precurr += i;</span>
<span class="line">            maxsum = Math.max(maxsum,precurr-premin);</span>
<span class="line">            premin=Math.min(precurr,premin);</span>
<span class="line">        }</span>
<span class="line">        return maxsum;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_32-从1到整数n中1出现的次数" tabindex="-1"><a class="header-anchor" href="#_32-从1到整数n中1出现的次数"><span>32. 从1到整数n中1出现的次数</span></a></h3><p>输入一个整数 n ，求 1～n 这 n 个整数的十进制表示中 1 出现的次数 例如， 1~13 中包含 1 的数字有 1 、 10 、 11 、 12 、 13 因此共出现 6 次</p><p>思路：数字都是由位数构成的，某一位上1的个数都是固定的，以百位上的1为例，对于100-199，百位上一共出现100个，1100-1199也出现100个. 因此，每过1000个数就会出现100个百位上的1，于是就是<code>⌊n/1000⌋∗100</code>，细分一下</p><ul><li>对于<code>n%1000&lt;100</code>,百位上不会出现1</li><li>当<code>100&lt;=n%1000&lt;200</code>，百位上出现<code>n%1000-100+1</code>个1</li><li>当<code>n%1000&gt;=200</code>,百位上出现100个1</li></ul><p>因此可以得出结论 $\\left\\lfloor \\frac{n}{10^{i+1}} \\right\\rfloor \\times 10^i + \\min\\left( \\max\\left( n % 10^{i+1} - 10^i \\right) \\right)$,公式中$10^i$表示第i位，前半部分表示完整在循环中的，后半部分表示需要讨论的。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public int NumberOf1Between1AndN_Solution(int n) {</span>
<span class="line">        int res=0;</span>
<span class="line">        long mulbase=1;</span>
<span class="line">        for(int i=0;mulbase&lt;=n;i++){</span>
<span class="line">            res += Math.floor(n/(mulbase*10))*mulbase+Math.min(Math.max(n%(mulbase*10)-mulbase+1,(long)0),mulbase);</span>
<span class="line">            mulbase *= 10;</span>
<span class="line">        }</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_33-把数组中的数排成一个最小的数" tabindex="-1"><a class="header-anchor" href="#_33-把数组中的数排成一个最小的数"><span>33. 把数组中的数排成一个最小的数</span></a></h3><p>输入一个非负整数数组numbers，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。</p><p>思路：考虑组装数字的顺序使其最小，只考虑首字符的大小不可靠，但是如果字符串a拼接b的得到的数字大于b拼接a，那么肯定b应该排在a的前面，因此重载排序的方法即可。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public String PrintMinNumber (int[] numbers) {</span>
<span class="line">        if(numbers==null||numbers.length==0) return &quot;&quot;;</span>
<span class="line">        String[] nums = new String[numbers.length];</span>
<span class="line">        for(int i=0;i&lt;numbers.length;i++){</span>
<span class="line">            nums[i] = numbers[i]+&quot;&quot;;</span>
<span class="line">        }</span>
<span class="line">        Arrays.sort(nums,new Comparator&lt;String&gt;(){</span>
<span class="line">            public int compare(String s1,String s2){</span>
<span class="line">                return (s1+s2).compareTo(s2+s1);</span>
<span class="line">            }</span>
<span class="line">        });</span>
<span class="line">        StringBuilder sb = new StringBuilder();</span>
<span class="line">        for(int i=0;i&lt;nums.length;i++){</span>
<span class="line">            sb.append(nums[i]);</span>
<span class="line">        }</span>
<span class="line">        return sb.toString();</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_34-求第n个丑数" tabindex="-1"><a class="header-anchor" href="#_34-求第n个丑数"><span>34. 求第N个丑数</span></a></h3><p>思路：应维护三个指针i2、i3、i5（初始均为 0），指向已生成的丑数数组dp的索引，每次取dp[i2]*2、dp[i3]*3、dp[i5]*5的最小值作为新丑数，并移动对应指针。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public int GetUglyNumber_Solution (int n) {</span>
<span class="line">        if(n==0) return 0;</span>
<span class="line">        int[] dp = new int[n];</span>
<span class="line">        dp[0]=1;</span>
<span class="line">        int a=0,b=0,c=0;</span>
<span class="line">        for(int i=1;i&lt;n;i++){</span>
<span class="line">            int p2 =dp[a]*2;</span>
<span class="line">            int p3 =dp[b]*3;</span>
<span class="line">            int p5 =dp[c]*5;</span>
<span class="line">            dp[i] = Math.min(p2,Math.min(p3,p5));</span>
<span class="line">            if(dp[i]==p2) a++;</span>
<span class="line">            if(dp[i]==p3) b++;</span>
<span class="line">            if(dp[i]==p5) c++;</span>
<span class="line">        }</span>
<span class="line">        return dp[n-1];</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_35-第一个出现一次的字符" tabindex="-1"><a class="header-anchor" href="#_35-第一个出现一次的字符"><span>35. 第一个出现一次的字符</span></a></h3><p>思路：哈希表存储每个字符出现的次数，遍历每个字符，返回哈希表中第一个字符出现次数为1的字符索引。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public int FirstNotRepeatingChar (String str) {</span>
<span class="line">        if(str==null||str.length()==0) return -1;</span>
<span class="line">        HashMap&lt;Character,Integer&gt; map = new HashMap&lt;&gt;();</span>
<span class="line">        for(char c:str.toCharArray()){</span>
<span class="line">            map.put(c,map.getOrDefault(c,0)+1);</span>
<span class="line">        }</span>
<span class="line">        for(int i=0;i&lt;str.length();i++){</span>
<span class="line">            if(map.get(str.charAt(i))==1){</span>
<span class="line">                return i;</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        return -1;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_36-数组中逆序对的个数" tabindex="-1"><a class="header-anchor" href="#_36-数组中逆序对的个数"><span>36. 数组中逆序对的个数</span></a></h3><p>在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。并将P对1000000007取模的结果输出。 即输出P mod 1000000007</p><p>思路：归并排序，首先将数组分成两个子数组，在递归继续划分，知道数组中元素个数为1，当我们从下从上合并时，就可以通过比较左右 两个数的大小来统计逆序对。对于已经排好序的两组，如果右边的元素小于左边第一个元素，那么逆序对的个数就增加左边数组的元素个数。 如果右边的元素大于左边最后一个元素，就没有逆序对。可以减少运算次数。将排序好的序列合并，累计逆序对。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    private int mod = 1000000007;</span>
<span class="line">    public int InversePairs (int[] nums) {</span>
<span class="line">        int n = nums.length;</span>
<span class="line">        int[] temp = new int[n];</span>
<span class="line">        return mergeSort(0,n-1,nums,temp);</span>
<span class="line">    }</span>
<span class="line">    public int mergeSort(int left,int right,int[] nums,int[] temp){</span>
<span class="line">        if(left&gt;=right) return 0;</span>
<span class="line">        int mid = left + (right-left)/2;</span>
<span class="line">        int res = mergeSort(left,mid,nums,temp)+mergeSort(mid+1,right,nums,temp);</span>
<span class="line">        res %= mod;</span>
<span class="line">        int i=left;</span>
<span class="line">        int j=mid+1;</span>
<span class="line">        for(int k=left;k&lt;=right;k++){</span>
<span class="line">            temp[k]=nums[k];</span>
<span class="line">        }</span>
<span class="line">        for(int k=left;k&lt;=right;k++){</span>
<span class="line">            if(i==mid+1){</span>
<span class="line">                nums[k]=temp[j++];</span>
<span class="line">            }else if(j==right+1||temp[i]&lt;=temp[j]){</span>
<span class="line">                nums[k] = temp[i++];</span>
<span class="line">            }else{</span>
<span class="line">                nums[k] = temp[j++];</span>
<span class="line">                res += mid-i+1;</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        return res%mod;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_37-两个链表的第一个公共节点" tabindex="-1"><a class="header-anchor" href="#_37-两个链表的第一个公共节点"><span>37. 两个链表的第一个公共节点</span></a></h3><p>输入两个无环的单向链表，找出它们的第一个公共结点，如果没有公共节点则返回空。（注意因为传入数据是链表，所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的）</p><p>思路：两个指针，同样的速度，走完同样长度（链表1+链表2），不管两条链表有无相同节点，都能够到达相同的节点或者同时到达终点。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public ListNode FindFirstCommonNode(ListNode pHead1, ListNode pHead2) {</span>
<span class="line">        ListNode l1 = pHead1, l2 = pHead2;</span>
<span class="line">        while(l1 != l2){</span>
<span class="line">            l1 = (l1==null)?pHead2:l1.next;</span>
<span class="line">            l2 = (l2==null)?pHead1:l2.next;</span>
<span class="line">        }</span>
<span class="line">        return l1;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_38-数字在排序数组中出现的次数" tabindex="-1"><a class="header-anchor" href="#_38-数字在排序数组中出现的次数"><span>38. 数字在排序数组中出现的次数</span></a></h3><p>给定一个长度为 n 的非降序数组和一个非负数整数 k ，要求统计 k 在数组中出现的次数</p><p>思路：通过二分法找到k出现的左边界和右边界，相减即可</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public int GetNumberOfK (int[] nums, int k) {</span>
<span class="line">        if(nums==null||nums.length==0) return 0;</span>
<span class="line">        return (rightnumber(nums,k)==-1)||(leftnumber(nums,k)==-1)?0:rightnumber(nums,k)-leftnumber(nums,k)+1;</span>
<span class="line">    }</span>
<span class="line">    public int leftnumber(int[] nums,int k){</span>
<span class="line">        int l=0,r=nums.length-1;</span>
<span class="line">        int res=-1;</span>
<span class="line">        while(l&lt;=r){</span>
<span class="line">            int mid=l+(r-l)/2;</span>
<span class="line">            if(nums[mid]&gt;=k){</span>
<span class="line">                r=mid-1;</span>
<span class="line">            }else{</span>
<span class="line">                l=mid+1;</span>
<span class="line">            }</span>
<span class="line">            if(nums[mid]==k) res=mid;</span>
<span class="line">        }</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line">    public int rightnumber(int[] nums,int k){</span>
<span class="line">        int l=0,r=nums.length-1;</span>
<span class="line">        int res=-1;</span>
<span class="line">        while(l&lt;=r){</span>
<span class="line">            int mid=l+(r-l)/2;</span>
<span class="line">            if(nums[mid]&lt;=k){</span>
<span class="line">                l=mid+1;</span>
<span class="line">            }else{</span>
<span class="line">                r=mid-1;</span>
<span class="line">            }</span>
<span class="line">            if(nums[mid]==k) res=mid;</span>
<span class="line">        }</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_39-二叉树的深度" tabindex="-1"><a class="header-anchor" href="#_39-二叉树的深度"><span>39. 二叉树的深度</span></a></h3><p>思路:DFS（深度优先搜索）</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public int TreeDepth(TreeNode root) {</span>
<span class="line">        if(root==null) return 0;</span>
<span class="line">        int left = TreeDepth(root.left);</span>
<span class="line">        int right = TreeDepth(root.right);</span>
<span class="line">        return Math.max(left,right)+1;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_40-数组中只出现一次的两个数-而其他数都出现两次。" tabindex="-1"><a class="header-anchor" href="#_40-数组中只出现一次的两个数-而其他数都出现两次。"><span>40. 数组中只出现一次的两个数，而其他数都出现两次。</span></a></h3><p>一个整型数组里除了两个数字只出现一次，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。</p><p>思路：异或运算，相同的数字会抵消掉，因此数组中的所有数字做异或操作就可以得到只出现一次的两个数的异或和。 对于两个异或的数的结果，可以根据第一个为1的二进制位来分辨两个不同的数，找到这个二进制位。 因此当求出所有数字的异或值后，遍历数组，根据每个数与该位的值与运算来将两个数分成两堆，对每一堆的数做异或，就可以分别得到这两个数。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class Solution{</span>
<span class="line">    public int[] FindNumsAppearOnce (int[] nums) {</span>
<span class="line">        int res1=0;</span>
<span class="line">        int res2=0;</span>
<span class="line">        int temp=0;</span>
<span class="line">        for(int num:nums){</span>
<span class="line">            temp ^= num;</span>
<span class="line">        }</span>
<span class="line">        int k=1;</span>
<span class="line">        while((k&amp;temp)==0){</span>
<span class="line">            k&lt;&lt;=1;</span>
<span class="line">        }</span>
<span class="line">        for(int num:nums){</span>
<span class="line">            if((k&amp;num)==0) res1 ^= num;</span>
<span class="line">            else res2 ^= num;</span>
<span class="line">        }</span>
<span class="line">        return res1&lt;res2?new int[]{res1,res2}:new int[]{res2,res1};</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,79)]))}const c=s(a,[["render",d]]),t=JSON.parse('{"path":"/blogs/algorithm/offer-java2.html","title":"剑指offer-Java版 21-40","lang":"en-US","frontmatter":{"title":"剑指offer-Java版 21-40","date":"2025/09/12","tags":["Java"],"categories":["算法"]},"headers":[{"level":3,"title":"21. 包含min函数的栈","slug":"_21-包含min函数的栈","link":"#_21-包含min函数的栈","children":[]},{"level":3,"title":"22. 判断一个栈是否是另一个栈的弹出序列","slug":"_22-判断一个栈是否是另一个栈的弹出序列","link":"#_22-判断一个栈是否是另一个栈的弹出序列","children":[]},{"level":3,"title":"23. 层序遍历二叉树","slug":"_23-层序遍历二叉树","link":"#_23-层序遍历二叉树","children":[]},{"level":3,"title":"24. 二叉搜索树的后序遍历序列","slug":"_24-二叉搜索树的后序遍历序列","link":"#_24-二叉搜索树的后序遍历序列","children":[]},{"level":3,"title":"25. 二叉树中和为某值的路径","slug":"_25-二叉树中和为某值的路径","link":"#_25-二叉树中和为某值的路径","children":[]},{"level":3,"title":"26. 复杂链表的复制","slug":"_26-复杂链表的复制","link":"#_26-复杂链表的复制","children":[]},{"level":3,"title":"27. 二叉搜索树转换为双向链表","slug":"_27-二叉搜索树转换为双向链表","link":"#_27-二叉搜索树转换为双向链表","children":[]},{"level":3,"title":"28. 打印字符串中所有字符的排列","slug":"_28-打印字符串中所有字符的排列","link":"#_28-打印字符串中所有字符的排列","children":[]},{"level":3,"title":"29. 数组中出现次数超过一半的数字","slug":"_29-数组中出现次数超过一半的数字","link":"#_29-数组中出现次数超过一半的数字","children":[]},{"level":3,"title":"30. 找出最小的K个数","slug":"_30-找出最小的k个数","link":"#_30-找出最小的k个数","children":[]},{"level":3,"title":"31. 连续子数组的最大和","slug":"_31-连续子数组的最大和","link":"#_31-连续子数组的最大和","children":[]},{"level":3,"title":"32. 从1到整数n中1出现的次数","slug":"_32-从1到整数n中1出现的次数","link":"#_32-从1到整数n中1出现的次数","children":[]},{"level":3,"title":"33. 把数组中的数排成一个最小的数","slug":"_33-把数组中的数排成一个最小的数","link":"#_33-把数组中的数排成一个最小的数","children":[]},{"level":3,"title":"34. 求第N个丑数","slug":"_34-求第n个丑数","link":"#_34-求第n个丑数","children":[]},{"level":3,"title":"35. 第一个出现一次的字符","slug":"_35-第一个出现一次的字符","link":"#_35-第一个出现一次的字符","children":[]},{"level":3,"title":"36. 数组中逆序对的个数","slug":"_36-数组中逆序对的个数","link":"#_36-数组中逆序对的个数","children":[]},{"level":3,"title":"37. 两个链表的第一个公共节点","slug":"_37-两个链表的第一个公共节点","link":"#_37-两个链表的第一个公共节点","children":[]},{"level":3,"title":"38. 数字在排序数组中出现的次数","slug":"_38-数字在排序数组中出现的次数","link":"#_38-数字在排序数组中出现的次数","children":[]},{"level":3,"title":"39. 二叉树的深度","slug":"_39-二叉树的深度","link":"#_39-二叉树的深度","children":[]},{"level":3,"title":"40. 数组中只出现一次的两个数，而其他数都出现两次。","slug":"_40-数组中只出现一次的两个数-而其他数都出现两次。","link":"#_40-数组中只出现一次的两个数-而其他数都出现两次。","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"filePathRelative":"blogs/algorithm/offer-java2.md"}');export{c as comp,t as data};

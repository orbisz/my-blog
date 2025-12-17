import{_ as s,c as i,a,o as e}from"./app-BLst8MTc.js";const l={};function d(p,n){return e(),i("div",null,n[0]||(n[0]=[a(`<p>并查集主要用于解决一些元素分组的问题，他管理一系列不相交的集合，支持两种操作：</p><ul><li>合并（Union）：把两个不相交的集合合并为一个集合。</li><li>查询（Find）：查询两个元素是否在同一个集合中。</li></ul><p>并查集的重要思想在于，用集合中的一个元素代表集合。我曾看过一个有趣的比喻，把集合比喻成帮派，而代表元素则是帮主。相当于一个树状结构，要寻找集合的代表元素，只需要一层层往上访问父节点， 直达树的根节点。</p><h3 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化"><span>初始化</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// 相当于C++中的fa[MAXN]，用于存储每个元素的父节点</span>
<span class="line">private int[] parent;</span>
<span class="line"></span>
<span class="line">// 初始化方法，参数n为元素的数量</span>
<span class="line">public void init(int n) {</span>
<span class="line">    // 初始化数组，大小为n+1是为了保持与C++代码中1-based索引一致</span>
<span class="line">    parent = new int[n + 1];</span>
<span class="line">    // 每个元素的父节点初始化为自身</span>
<span class="line">    for (int i = 1; i &lt;= n; i++) {</span>
<span class="line">        parent[i] = i;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于n个元素，用数组parent[]来存储每个元素的父节点。初始时，父节点设为自己。</p><h3 id="查询" tabindex="-1"><a class="header-anchor" href="#查询"><span>查询</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public int find(int x) {</span>
<span class="line">    // 如果x的父节点是自身，说明x是根节点</span>
<span class="line">    if (parent[x] == x) {</span>
<span class="line">        return x;</span>
<span class="line">    } else {</span>
<span class="line">        // 否则递归查找父节点的根节点</span>
<span class="line">        return find(parent[x]);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用递归的写法实现对代表元素的查询：一层一层访问父节点，直至根节点（根节点的标志就是父节点是本身）。要判断两个元素是否属于同一个集合，只需要看它们的根节点是否相同即可。</p><h3 id="合并" tabindex="-1"><a class="header-anchor" href="#合并"><span>合并</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public void merge(int i, int j) {</span>
<span class="line">    // 找到i的根节点，并将其 parent 指向j的根节点</span>
<span class="line">    parent[find(i)] = find(j);</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>合并操作即先找到两个集合的代表元素，然后将前者的父节点设为后者即可。当然也可以将后者的父节点设为前者。</p><h2 id="路径压缩" tabindex="-1"><a class="header-anchor" href="#路径压缩"><span>路径压缩</span></a></h2><p>既然我们只关心一个元素对应的根节点，那我们希望每个元素到根节点的路径尽可能短，最好只需要一步。 只要我们在查询的过程中，把沿途的每个节点的父节点都设为根节点即可。下一次再查询时，我们就省事很多。</p><h3 id="合并-路径压缩" tabindex="-1"><a class="header-anchor" href="#合并-路径压缩"><span>合并（路径压缩）</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public int find(int x) {</span>
<span class="line">    return x == parent[x] ? x : (parent[x] = find(parent[x]));</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="按秩合并" tabindex="-1"><a class="header-anchor" href="#按秩合并"><span>按秩合并</span></a></h3><p>我们可以把简单的树往复杂的树上合并，而不是相反。因为这样合并后，到根节点距离变长的节点个数比较少。</p><p>我们用一个数组rank[]记录每个根节点对应的树的深度（如果不是根节点，其rank相当于以它作为根节点的子树的深度）。一开始，把所有元素的rank（秩）设为1。合并时比较两个根节点，把rank较小者往较大者上合并。</p><p>路径压缩和按秩合并如果一起使用，时间复杂度接近 ，但是很可能会破坏rank的准确性。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public class UnionFind {</span>
<span class="line">    private int[] parent; // 对应C++中的fa数组，存储父节点</span>
<span class="line">    private int[] rank;   // 存储每个节点的秩（用于按秩合并）</span>
<span class="line">    </span>
<span class="line">    /**</span>
<span class="line">     * 初始化并查集</span>
<span class="line">     * @param n 元素数量</span>
<span class="line">     */</span>
<span class="line">    public void init(int n) {</span>
<span class="line">        parent = new int[n + 1];</span>
<span class="line">        rank = new int[n + 1];</span>
<span class="line">        for (int i = 1; i &lt;= n; i++) {</span>
<span class="line">            parent[i] = i;  // 每个元素的父节点初始化为自身</span>
<span class="line">            rank[i] = 1;    // 每个元素的初始秩为1</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    /**</span>
<span class="line">     * 查找元素的根节点（递归实现）</span>
<span class="line">     * @param x 要查找的元素</span>
<span class="line">     * @return 元素所在集合的根节点</span>
<span class="line">     */</span>
<span class="line">    public int find(int x) {</span>
<span class="line">        if (parent[x] == x) {</span>
<span class="line">            return x;</span>
<span class="line">        } else {</span>
<span class="line">            return find(parent[x]);</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    /**</span>
<span class="line">     * 合并两个元素所在的集合（按秩合并优化）</span>
<span class="line">     * @param i 第一个元素</span>
<span class="line">     * @param j 第二个元素</span>
<span class="line">     */</span>
<span class="line">    public void merge(int i, int j) {</span>
<span class="line">        int x = find(i);  // 找到i的根节点</span>
<span class="line">        int y = find(j);  // 找到j的根节点</span>
<span class="line">        </span>
<span class="line">        // 按秩合并：秩小的树合并到秩大的树下面</span>
<span class="line">        if (rank[x] &lt;= rank[y]) {</span>
<span class="line">            parent[x] = y;</span>
<span class="line">        } else {</span>
<span class="line">            parent[y] = x;</span>
<span class="line">        }</span>
<span class="line">        </span>
<span class="line">        // 如果两个树的秩相同且根节点不同，合并后新根的秩加1</span>
<span class="line">        if (rank[x] == rank[y] &amp;&amp; x != y) {</span>
<span class="line">            rank[y]++;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="例题" tabindex="-1"><a class="header-anchor" href="#例题"><span>例题</span></a></h2><p><img src="https://leetcode.cn/problems/number-of-provinces/description/" alt="省份数量"></p>`,23)]))}const c=s(l,[["render",d]]),t=JSON.parse('{"path":"/blogs/algorithm/union.html","title":"并查集详解","lang":"en-US","frontmatter":{"title":"并查集详解","date":"2024/04/10","tags":["Java"],"categories":["算法"]},"headers":[{"level":3,"title":"初始化","slug":"初始化","link":"#初始化","children":[]},{"level":3,"title":"查询","slug":"查询","link":"#查询","children":[]},{"level":3,"title":"合并","slug":"合并","link":"#合并","children":[]},{"level":2,"title":"路径压缩","slug":"路径压缩","link":"#路径压缩","children":[{"level":3,"title":"合并（路径压缩）","slug":"合并-路径压缩","link":"#合并-路径压缩","children":[]},{"level":3,"title":"按秩合并","slug":"按秩合并","link":"#按秩合并","children":[]}]},{"level":2,"title":"例题","slug":"例题","link":"#例题","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"filePathRelative":"blogs/algorithm/union.md"}');export{c as comp,t as data};

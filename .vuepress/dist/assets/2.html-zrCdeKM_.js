import{_ as r,c as d,b as s,a as i,e as l,d as a,r as t,o as p}from"./app-BLZsyjpf.js";const v={},c={href:"https://leetcode.cn/problems/linked-list-cycle/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},u={href:"https://leetcode.cn/problems/c32eOV/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},o={href:"https://leetcode.cn/problems/kth-node-from-end-of-list-lcci/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},m={href:"https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},b={href:"https://leetcode.cn/problems/reverse-linked-list/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},g={href:"https://leetcode.cn/problems/reverse-linked-list-ii/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},x={href:"https://leetcode.cn/problems/merge-two-sorted-lists/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},h={href:"https://leetcode.cn/problems/sort-list/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},f={href:"https://leetcode.cn/problems/palindrome-linked-list/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},L={href:"https://leetcode.cn/problems/valid-palindrome/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},N={href:"https://leetcode.cn/problems/longest-common-subsequence/submissions/641521374/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},y={href:"https://leetcode.cn/problems/longest-substring-without-repeating-characters/submissions/641529140/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},w={href:"https://leetcode.cn/problems/binary-tree-preorder-traversal/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},k={href:"https://leetcode.cn/problems/binary-tree-postorder-traversal/description/?envType=problem-list-v2&envId=7gG9b6260",target:"_blank",rel:"noopener noreferrer"},T={href:"https://leetcode.cn/problems/binary-tree-inorder-traversal/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},I={href:"https://leetcode.cn/problems/binary-tree-level-order-traversal/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},j={href:"https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/submissions/641538665/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},q={href:"https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},G={href:"https://leetcode.cn/problems/convert-sorted-list-to-binary-search-tree/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},S={href:"https://leetcode.cn/problems/binary-search/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},A={href:"https://leetcode.cn/problems/implement-queue-using-stacks/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},E={href:"https://leetcode.cn/problems/implement-stack-using-queues/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},M={href:"https://leetcode.cn/problems/climbing-stairs/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},C={href:"https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/description/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"},B={href:"https://leetcode.cn/problems/sort-an-array/?envType=problem-list-v2&envId=7gG9b626",target:"_blank",rel:"noopener noreferrer"};function z(V,n){const e=t("ExternalLinkIcon");return p(),d("div",null,[n[28]||(n[28]=s("h3",{id:"链表",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#链表"},[s("span",null,"链表")])],-1)),s("p",null,[s("a",c,[n[0]||(n[0]=s("strong",null,"链表是否有环",-1)),l(e)])]),n[29]||(n[29]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public boolean hasCycle(ListNode head) {</span>
<span class="line">        ListNode fast = head;</span>
<span class="line">        ListNode slow = head;</span>
<span class="line">        while(fast!=null&amp;&amp;fast.next!=null){</span>
<span class="line">            fast = fast.next.next;</span>
<span class="line">            slow = slow.next;</span>
<span class="line">            if(fast==slow){</span>
<span class="line">                return true;</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        return false;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",u,[n[1]||(n[1]=s("em",null,"返回有环链表的环入口处",-1)),n[2]||(n[2]=a("*")),l(e)])]),n[30]||(n[30]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public ListNode detectCycle(ListNode head) {</span>
<span class="line">        ListNode fast = head;</span>
<span class="line">        ListNode slow = head;</span>
<span class="line">        while(fast!=null&amp;&amp;fast.next!=null){</span>
<span class="line">            fast = fast.next.next;</span>
<span class="line">            slow = slow.next;</span>
<span class="line">            if(fast==slow){</span>
<span class="line">                ListNode cur = head;</span>
<span class="line">                while(cur!=slow){</span>
<span class="line">                    cur = cur.next;</span>
<span class="line">                    slow = slow.next;</span>
<span class="line">                }</span>
<span class="line">                return cur;</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        return null;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",o,[n[3]||(n[3]=s("strong",null,"返回链表倒数第k个节点",-1)),l(e)])]),n[31]||(n[31]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public int kthToLast(ListNode head, int k) {</span>
<span class="line">        ListNode fast = head;</span>
<span class="line">        ListNode slow = head;</span>
<span class="line">        for(int i=0;i&lt;k;i++){</span>
<span class="line">            fast = fast.next;</span>
<span class="line">        }</span>
<span class="line">        while(fast!=null){</span>
<span class="line">            fast = fast.next;</span>
<span class="line">            slow = slow.next;</span>
<span class="line">        }</span>
<span class="line">        return slow.val;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",m,[n[4]||(n[4]=s("strong",null,"删除链表倒数第n个节点",-1)),l(e)])]),n[32]||(n[32]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public ListNode removeNthFromEnd(ListNode head, int n) {</span>
<span class="line">        ListNode dummy = new ListNode(0);</span>
<span class="line">        dummy.next = head;</span>
<span class="line">        ListNode fast = dummy;</span>
<span class="line">        ListNode slow = dummy;</span>
<span class="line">        for(int i=0;i&lt;=n;i++){</span>
<span class="line">            fast = fast.next;</span>
<span class="line">        }</span>
<span class="line">        while(fast!=null){</span>
<span class="line">            fast = fast.next;</span>
<span class="line">            slow = slow.next;</span>
<span class="line">        }</span>
<span class="line">        slow.next = slow.next.next;</span>
<span class="line">        return dummy.next;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",b,[n[5]||(n[5]=s("strong",null,"反转链表",-1)),l(e)])]),n[33]||(n[33]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public ListNode reverseList(ListNode head) {</span>
<span class="line">        ListNode curr = head;</span>
<span class="line">        ListNode prev = null;</span>
<span class="line">        while(curr!=null){</span>
<span class="line">            ListNode next = curr.next;</span>
<span class="line">            curr.next = prev;</span>
<span class="line">            prev = curr;</span>
<span class="line">            curr = next;</span>
<span class="line">        }</span>
<span class="line">        return prev;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",g,[n[6]||(n[6]=s("strong",null,"反转链表Ⅱ",-1)),l(e)])]),n[34]||(n[34]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public ListNode reverseBetween(ListNode head, int left, int right) {</span>
<span class="line">    if(head==null||head.next==null) return head;</span>
<span class="line">pre = pre.next;</span>
<span class="line">    ListNode dummy = new ListNode(0);</span>
<span class="line">    dummy.next = head;</span>
<span class="line">    for(int i=1;i&lt;left;i++){</span>
<span class="line">    ListNode pre = dummy;</span>
<span class="line">    }</span>
<span class="line">    ListNode curr = pre.next;</span>
<span class="line">    for(int i=0;i&lt;right-left;i++){</span>
<span class="line">        ListNode next = curr.next;</span>
<span class="line">        curr.next = next.next;</span>
<span class="line">        next.next = pre.next;</span>
<span class="line">        pre.next = next;</span>
<span class="line">    }</span>
<span class="line">    return dummy.next;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先找到left的前一个节点作为pre，反转的更新步骤为</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">next = curr.next</span>
<span class="line">curr.next = next.next;</span>
<span class="line">next.next = pre.next;</span>
<span class="line">pre.next = next;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),s("p",null,[s("a",x,[n[7]||(n[7]=s("strong",null,"合并两个有序链表",-1)),l(e)])]),n[35]||(n[35]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public ListNode mergeTwoLists(ListNode list1, ListNode list2) {</span>
<span class="line">    ListNode dummy = new ListNode(0);</span>
<span class="line">    ListNode curr = dummy;</span>
<span class="line">    while(list1!=null&amp;&amp;list2!=null){</span>
<span class="line">        if(list1.val&lt;list2.val){</span>
<span class="line">            curr.next = list1;</span>
<span class="line">            list1 = list1.next;</span>
<span class="line">        }else{</span>
<span class="line">            curr.next = list2;</span>
<span class="line">            list2 = list2.next;</span>
<span class="line">        }</span>
<span class="line">        curr = curr.next;</span>
<span class="line">    }</span>
<span class="line">    curr.next = list1!=null?list1:list2;</span>
<span class="line">    return dummy.next;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",h,[n[8]||(n[8]=s("strong",null,"排序链表",-1)),l(e)])]),n[36]||(n[36]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public ListNode sortList(ListNode head){</span>
<span class="line">        if(head==null||head.next==null) return head;</span>
<span class="line">        ListNode mid = getMid(head);</span>
<span class="line">        ListNode  l = sortList(head);</span>
<span class="line">        ListNode r = sortList(mid);</span>
<span class="line">        return merge(l,r);</span>
<span class="line"></span>
<span class="line">    }</span>
<span class="line">    public ListNode getMid(ListNode head){</span>
<span class="line">        ListNode fast = head.next;</span>
<span class="line">        ListNode slow = head;</span>
<span class="line">        while(fast!=null&amp;&amp;fast.next!=null){</span>
<span class="line">            fast = fast.next.next;</span>
<span class="line">            slow = slow.next;</span>
<span class="line">        }</span>
<span class="line">        ListNode mid = slow.next;</span>
<span class="line">        slow.next = null;</span>
<span class="line">        return mid;</span>
<span class="line">    }</span>
<span class="line">    public ListNode merge(ListNode l1,ListNode l2){</span>
<span class="line">        ListNode dummy = new ListNode(0);</span>
<span class="line">        ListNode curr = dummy;</span>
<span class="line">        while(l1!=null&amp;&amp;l2!=null){</span>
<span class="line">            if(l1.val&lt;l2.val){</span>
<span class="line">                curr.next = l1;</span>
<span class="line">                l1 = l1.next;</span>
<span class="line">            }else{</span>
<span class="line">                curr.next = l2;</span>
<span class="line">                l2 = l2.next;</span>
<span class="line">            }</span>
<span class="line">            curr = curr.next;</span>
<span class="line">        }</span>
<span class="line">        curr.next = l1!=null?l1:l2;</span>
<span class="line">        return dummy.next;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>采用归并排序算法的思想，先找出中点，再递归，最后组合。</p>`,2)),s("p",null,[s("a",f,[n[9]||(n[9]=s("strong",null,"验证回文链表",-1)),l(e)]),n[10]||(n[10]=a(" 先找中点，反转后一部分，验证是否相等。"))]),n[37]||(n[37]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public boolean isPalindrome(ListNode head) {</span>
<span class="line">        if(head==null||head.next==null) return true;</span>
<span class="line">        ListNode res= getMid(head);</span>
<span class="line">        ListNode mid = reverse(res);</span>
<span class="line">        ListNode curr = head;</span>
<span class="line">        while(mid!=null){</span>
<span class="line">            if(mid.val!=curr.val){</span>
<span class="line">                return false;</span>
<span class="line">            }</span>
<span class="line">            mid = mid.next;</span>
<span class="line">            curr = curr.next;</span>
<span class="line">        }</span>
<span class="line">        return true;</span>
<span class="line">    }</span>
<span class="line">    public ListNode getMid(ListNode head){</span>
<span class="line">        ListNode fast = head.next;</span>
<span class="line">        ListNode slow = head;</span>
<span class="line">        while(fast!=null&amp;&amp;fast.next!=null){</span>
<span class="line">            fast = fast.next.next;</span>
<span class="line">            slow = slow.next;</span>
<span class="line">        }</span>
<span class="line">        ListNode mid = slow.next;</span>
<span class="line">        return mid;</span>
<span class="line">    }</span>
<span class="line">    private ListNode reverse(ListNode head){</span>
<span class="line">        ListNode pre=null;</span>
<span class="line">        ListNode cur=head;</span>
<span class="line">        while(cur!=null){</span>
<span class="line">            ListNode next=cur.next;</span>
<span class="line">            cur.next=pre;</span>
<span class="line">            pre=cur;</span>
<span class="line">            cur=next;</span>
<span class="line">        }</span>
<span class="line">        return pre;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串"><span>字符串</span></a></h3>`,2)),s("p",null,[s("a",L,[n[11]||(n[11]=s("strong",null,"验证回文串",-1)),l(e)])]),n[38]||(n[38]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public boolean isPalindrome(String s) {</span>
<span class="line">    s = s.toLowerCase().replaceAll(&quot;[^a-z0-9]&quot;,&quot;&quot;);</span>
<span class="line">    int l=0,r=s.length()-1;</span>
<span class="line">    while(l&lt;=r){</span>
<span class="line">        if(s.charAt(l)!=(s.charAt(r))){</span>
<span class="line">            return false;</span>
<span class="line">        }</span>
<span class="line">        l++;</span>
<span class="line">        r--;</span>
<span class="line">    }</span>
<span class="line">    return true;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">s = s.toLowerCase().replaceAll(&quot;[^a-z0-9]&quot;,&quot;&quot;);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><code>toLowerCase()</code>将字符转换成小写，<code>replaceAll(&quot;[^a-z0-9]&quot;,&quot;&quot;)</code>表示移除字符串中所有非字母数字字符（即只保留小写字母和数字）</p>`,3)),s("p",null,[s("a",N,[n[12]||(n[12]=a("最长公共子序列")),l(e)])]),n[39]||(n[39]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public int longestCommonSubsequence(String text1, String text2) {</span>
<span class="line">    int m = text1.length();</span>
<span class="line">    int n = text2.length();</span>
<span class="line">    int[][] dp = new int[m+1][n+1];</span>
<span class="line">    for(int i=0;i&lt;=m;i++){</span>
<span class="line">        for(int j=0;j&lt;=n;j++){</span>
<span class="line">            if(i==0||j==0){</span>
<span class="line">                dp[i][j]=0;</span>
<span class="line">            }</span>
<span class="line">            else if(text1.charAt(i-1)==text2.charAt(j-1)){</span>
<span class="line">                dp[i][j] = dp[i-1][j-1]+1;</span>
<span class="line">            }else{</span>
<span class="line">                dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1]);</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return dp[m][n];</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",y,[n[13]||(n[13]=a("无重复字符的最长字串")),l(e)])]),n[40]||(n[40]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public int lengthOfLongestSubstring(String s) {</span>
<span class="line">        Set&lt;Character&gt; set = new HashSet&lt;&gt;();</span>
<span class="line">        int left=0,ans=0;</span>
<span class="line">        for(int i=0;i&lt;s.length();i++){</span>
<span class="line">            while(set.contains(s.charAt(i))){</span>
<span class="line">                set.remove(s.charAt(left));</span>
<span class="line">                left++;</span>
<span class="line">            }</span>
<span class="line">            set.add(s.charAt(i));</span>
<span class="line">            ans = Math.max(ans,i-left+1);</span>
<span class="line">        }</span>
<span class="line">        return ans;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二叉树" tabindex="-1"><a class="header-anchor" href="#二叉树"><span>二叉树</span></a></h3>`,2)),s("p",null,[s("a",w,[n[14]||(n[14]=a("二叉树前序遍历")),l(e)])]),n[41]||(n[41]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">List&lt;Integer&gt; result;</span>
<span class="line">    public List&lt;Integer&gt; preorderTraversal(TreeNode root) {</span>
<span class="line">        result = new ArrayList&lt;&gt;();</span>
<span class="line">        preorder(root);</span>
<span class="line">        return result;</span>
<span class="line">    }</span>
<span class="line">    public void preorder(TreeNode root){</span>
<span class="line">        if(root==null) return;</span>
<span class="line">        result.add(root.val);</span>
<span class="line">        preorder(root.left);</span>
<span class="line">        preorder(root.right);</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",k,[n[15]||(n[15]=a("二叉树后序遍历")),l(e)])]),n[42]||(n[42]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    List&lt;Integer&gt; res;</span>
<span class="line">    public List&lt;Integer&gt; postorderTraversal(TreeNode root) {</span>
<span class="line">        res = new ArrayList&lt;&gt;();</span>
<span class="line">        postorder(root);</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line">    public void postorder(TreeNode root){</span>
<span class="line">        if(root==null) return;</span>
<span class="line">        postorder(root.left);</span>
<span class="line">        postorder(root.right);</span>
<span class="line">        res.add(root.val);</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",T,[n[16]||(n[16]=a("二叉树中序遍历")),l(e)])]),n[43]||(n[43]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    List&lt;Integer&gt; res;</span>
<span class="line">    public List&lt;Integer&gt; inorderTraversal(TreeNode root) {</span>
<span class="line">        res = new ArrayList&lt;&gt;();</span>
<span class="line">        inorder(root);</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line">    public void inorder(TreeNode root){</span>
<span class="line">        if(root==null) return;</span>
<span class="line">        inorder(root.left);</span>
<span class="line">        res.add(root.val);</span>
<span class="line">        inorder(root.right);</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",I,[n[17]||(n[17]=a("二叉树层序遍历")),l(e)])]),n[44]||(n[44]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public List&lt;List&lt;Integer&gt;&gt; levelOrder(TreeNode root) {</span>
<span class="line">        List&lt;List&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();</span>
<span class="line">        if(root == null) return res;</span>
<span class="line">        Queue&lt;TreeNode&gt; q = new LinkedList&lt;&gt;();</span>
<span class="line">        q.offer(root);</span>
<span class="line">        while(!q.isEmpty()){</span>
<span class="line">            int s = q.size();</span>
<span class="line">            List&lt;Integer&gt; ans = new ArrayList&lt;&gt;();</span>
<span class="line">            for(int i=0;i&lt;s;i++){</span>
<span class="line">                TreeNode node = q.poll();</span>
<span class="line">                ans.add(node.val);</span>
<span class="line">                if(node.left!=null) q.offer(node.left);</span>
<span class="line">                if(node.right!=null) q.offer(node.right);</span>
<span class="line">            }</span>
<span class="line">            res.add(ans);</span>
<span class="line">        }</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",j,[n[18]||(n[18]=a("二叉树的最近公共祖先")),l(e)])]),n[45]||(n[45]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {</span>
<span class="line">        if(root==null||p==root||q==root){</span>
<span class="line">            return root;</span>
<span class="line">        }</span>
<span class="line">        TreeNode left = lowestCommonAncestor(root.left,p,q);</span>
<span class="line">        TreeNode right = lowestCommonAncestor(root.right,p,q);</span>
<span class="line">        if(left!=null&amp;&amp;right!=null) return root;</span>
<span class="line">        return left!=null?left:right;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",q,[n[19]||(n[19]=a("二叉树得最大深度")),l(e)])]),n[46]||(n[46]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public int maxDepth(TreeNode root) {</span>
<span class="line">        if(root == null) return 0;</span>
<span class="line">        int left = maxDepth(root.left);</span>
<span class="line">        int right = maxDepth(root.right);</span>
<span class="line">        return Math.max(left,right)+1;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",G,[n[20]||(n[20]=a("有序链表转换成二叉树")),l(e)])]),n[47]||(n[47]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public TreeNode sortedListToBST(ListNode head) {</span>
<span class="line">        if(head == null) return null;</span>
<span class="line">        return buildBST(head,null);</span>
<span class="line">    }</span>
<span class="line">    private TreeNode buildBST(ListNode left, ListNode right) {</span>
<span class="line">        if (left == right) return null;</span>
<span class="line">        </span>
<span class="line">        ListNode mid = getMid(left, right);</span>
<span class="line">        TreeNode root = new TreeNode(mid.val);</span>
<span class="line">        </span>
<span class="line">        root.left = buildBST(left, mid);</span>
<span class="line">        root.right = buildBST(mid.next, right);</span>
<span class="line">        </span>
<span class="line">        return root;</span>
<span class="line">    }</span>
<span class="line">    public ListNode getMid(ListNode head,ListNode right){</span>
<span class="line">        ListNode fast = head;</span>
<span class="line">        ListNode slow = head;</span>
<span class="line">        while(fast!=right&amp;&amp;fast.next!=right){</span>
<span class="line">            fast = fast.next.next;</span>
<span class="line">            slow = slow.next;</span>
<span class="line">        }</span>
<span class="line">        return slow;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",S,[n[21]||(n[21]=a("二分查找")),l(e)])]),n[48]||(n[48]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public int search(int[] nums, int target) {</span>
<span class="line">        int l=0,r=nums.length-1;</span>
<span class="line">        while(l&lt;=r){</span>
<span class="line">            int mid = l+(r-l)/2;</span>
<span class="line">            if(target==nums[mid]) return mid;</span>
<span class="line">            else if(target&lt;nums[mid]) r=mid-1;</span>
<span class="line">            else l=mid+1;</span>
<span class="line">        }</span>
<span class="line">        return -1;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",A,[n[22]||(n[22]=a("用栈实现队列")),l(e)])]),n[49]||(n[49]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Stack&lt;Integer&gt; a,b;</span>
<span class="line">    public MyQueue() {</span>
<span class="line">        a = new Stack&lt;&gt;();</span>
<span class="line">        b = new Stack&lt;&gt;();</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    public void push(int x) {</span>
<span class="line">        a.push(x);</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    public int pop() {</span>
<span class="line">        int peek = peek();</span>
<span class="line">        b.pop();</span>
<span class="line">        return peek;</span>
<span class="line">    } </span>
<span class="line">    public int peek() {</span>
<span class="line">        if(!b.isEmpty()) return b.peek();</span>
<span class="line">        if(a.isEmpty()) return a.peek();</span>
<span class="line">        while(!a.isEmpty()){</span>
<span class="line">            b.push(a.pop());</span>
<span class="line">        }</span>
<span class="line">        return b.peek();</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    public boolean empty() {</span>
<span class="line">        return a.isEmpty()&amp;&amp;b.isEmpty();</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",E,[n[23]||(n[23]=a("用队列实现栈")),l(e)])]),n[50]||(n[50]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    Queue&lt;Integer&gt; a,b;</span>
<span class="line">    public MyStack() {</span>
<span class="line">        a = new LinkedList&lt;&gt;();</span>
<span class="line">        b = new LinkedList&lt;&gt;();</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    public void push(int x) {</span>
<span class="line">        b.offer(x);</span>
<span class="line">        while(!a.isEmpty()){</span>
<span class="line">            b.offer(a.poll());</span>
<span class="line">        }</span>
<span class="line">        Queue&lt;Integer&gt; tmp = a;</span>
<span class="line">        a=b;</span>
<span class="line">        b=tmp;</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    public int pop() {</span>
<span class="line">        return a.poll();</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    public int top() {</span>
<span class="line">        return a.peek();</span>
<span class="line">    }</span>
<span class="line">    </span>
<span class="line">    public boolean empty() {</span>
<span class="line">        return a.isEmpty();</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",M,[n[24]||(n[24]=a("爬楼梯")),l(e)])]),n[51]||(n[51]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public int climbStairs(int n) {</span>
<span class="line">        if(n&lt;3) return n;</span>
<span class="line">        int dp1=1;</span>
<span class="line">        int dp2=2;</span>
<span class="line">        for(int i=3;i&lt;=n;i++){</span>
<span class="line">            int dp3 = dp1+dp2;</span>
<span class="line">            dp1 = dp2;</span>
<span class="line">            dp2 = dp3;</span>
<span class="line">        }</span>
<span class="line">        return dp2;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",C,[n[25]||(n[25]=a("用最少数量的箭打爆气球")),l(e)])]),n[52]||(n[52]=i(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public int findMinArrowShots(int[][] points) {</span>
<span class="line">       if(points == null||points.length==0){</span>
<span class="line">            return 0;</span>
<span class="line">        }</span>
<span class="line">        Arrays.sort(points,(a,b)-&gt;Integer.compare(a[1],b[1]));</span>
<span class="line">        int arrows=1;</span>
<span class="line">        int arrowend=points[0][1];</span>
<span class="line">        for(int i=1;i&lt;points.length;i++){</span>
<span class="line">            if(points[i][0]&gt;arrowend){</span>
<span class="line">                arrows++;</span>
<span class="line">                arrowend = points[i][1];</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        return arrows;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)),s("p",null,[s("a",B,[n[26]||(n[26]=a("排序数组")),l(e)]),n[27]||(n[27]=a(" 快速排序、选择排序、归并排序等"))])])}const Q=r(v,[["render",z]]),D=JSON.parse('{"path":"/blogs/algorithm/2.html","title":"常见的手撕算法题","lang":"en-US","frontmatter":{"title":"常见的手撕算法题","date":"2024/06/02","tags":["Java"],"categories":["算法"]},"headers":[{"level":3,"title":"链表","slug":"链表","link":"#链表","children":[]},{"level":3,"title":"字符串","slug":"字符串","link":"#字符串","children":[]},{"level":3,"title":"二叉树","slug":"二叉树","link":"#二叉树","children":[]}],"git":{"createdTime":1751721781000,"updatedTime":1751809433000,"contributors":[{"name":"zxy","email":"zxy0613zxy@outlook.com","commits":2}]},"filePathRelative":"blogs/algorithm/2.md"}');export{Q as comp,D as data};
